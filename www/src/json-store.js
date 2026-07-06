const fs = require('fs');
const path = require('path');

class JSONStore {
  constructor(dataDir, maxBackups = 50) {
    this.dataDir = dataDir;
    this.backupDir = path.join(dataDir, 'backups');
    this.maxBackups = maxBackups;
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(this.backupDir)) fs.mkdirSync(this.backupDir, { recursive: true });
    this.tables = {};
    this.loadAll();
  }

  filePath(table) { return path.join(this.dataDir, `${table}.json`); }

  backupPath(table) {
    const dir = path.join(this.backupDir, table);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return path.join(dir, new Date().toISOString().replace(/[:.]/g, '-') + '.json');
  }

  load(table) {
    const fp = this.filePath(table);
    if (fs.existsSync(fp)) {
      try {
        const content = fs.readFileSync(fp, 'utf8').trim();
        this.tables[table] = content ? JSON.parse(content) : [];
      } catch {
        this.tables[table] = [];
      }
    } else {
      this.tables[table] = [];
    }
  }

  save(table) {
    const fp = this.filePath(table);
    const tmp = fp + '.tmp';
    const content = JSON.stringify(this.tables[table], null, 2);
    if (fs.existsSync(fp)) {
      try {
        fs.copyFileSync(fp, this.backupPath(table));
      } catch {}
    }
    fs.writeFileSync(tmp, content);
    fs.renameSync(tmp, fp);
    this.rotateBackups(table);
  }

  rotateBackups(table) {
    const dir = path.join(this.backupDir, table);
    if (!fs.existsSync(dir)) return;
    try {
      const files = fs.readdirSync(dir)
        .filter(f => f.endsWith('.json'))
        .map(f => ({ name: f, time: fs.statSync(path.join(dir, f)).mtimeMs }))
        .sort((a, b) => b.time - a.time);
      if (files.length > this.maxBackups) {
        files.slice(this.maxBackups).forEach(f => {
          try { fs.unlinkSync(path.join(dir, f.name)); } catch {}
        });
      }
    } catch {}
  }

  loadAll() {
    ['bible', 'seen_verses', 'prayers', 'quiz_results', 'activity_log', 'notes', 'reading_history', 'user_profile', 'daily_verse_log', 'lessons', 'bookmarks', 'sermon_texts'].forEach(t => this.load(t));
  }

  insert(table, row) {
    if (!this.tables[table]) this.tables[table] = [];
    row.id = this.tables[table].length > 0 ? Math.max(...this.tables[table].map(r => r.id || 0)) + 1 : 1;
    if (!row.created_at) row.created_at = new Date().toISOString();
    this.tables[table].push(row);
    this.save(table);
    return { lastInsertRowid: row.id };
  }

  find(table, fn) { return (this.tables[table] || []).filter(fn); }
  findOne(table, fn) { return (this.tables[table] || []).find(fn); }
  all(table) { return this.tables[table] || []; }

  update(table, id, updates) {
    const idx = (this.tables[table] || []).findIndex(r => r.id === id);
    if (idx !== -1) {
      Object.assign(this.tables[table][idx], updates, { updated_at: new Date().toISOString() });
      this.save(table);
    }
  }

  delete(table, id) {
    this.tables[table] = (this.tables[table] || []).filter(r => r.id !== id);
    this.save(table);
  }

  profileGet(key) { const r = this.findOne('user_profile', r => r.key === key); return r ? r.value : null; }
  profileSet(key, value) { this.update('user_profile', -1, {}); const existing = this.findOne('user_profile', r => r.key === key); if (existing) { existing.value = value; this.save('user_profile'); } else { this.insert('user_profile', { key, value }); } }

  listBackups(table) {
    const dir = path.join(this.backupDir, table);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => ({ file: f, path: path.join(dir, f), mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime);
  }

  restoreFromBackup(table, backupFile) {
    const p = path.isAbsolute(backupFile) ? backupFile : path.join(this.backupDir, table, backupFile);
    if (!fs.existsSync(p)) return false;
    try {
      const content = fs.readFileSync(p, 'utf8').trim();
      const data = JSON.parse(content);
      this.tables[table] = data;
      this.save(table);
      return true;
    } catch { return false; }
  }
}

module.exports = JSONStore;
