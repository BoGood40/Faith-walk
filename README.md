# ✝️ Faith Walk — Daily Christian Growth Companion

A premium, modern multi-platform application designed to help believers grow in their walk with Jesus Christ, study the Word of God, and prepare as the Bride of Christ. 

`Faith Walk` is built to run seamlessly on **Android (as a native app)**, the **Web (as a Progressive Web App)**, and the **Desktop (via Electron)**.

---

## 📱 Mobile App (Android APK)
We have included a pre-compiled, native Android APK in the repository! You can download and install it on your phone immediately:
* **📥 [Download Android APK (app-debug.apk)](https://github.com/BoGood40/Faith-walk/blob/main/app-debug.apk)**

### How to Install the APK on Your Android Device:
1. Open this repository in your phone's browser.
2. Tap on the **[app-debug.apk](https://github.com/BoGood40/Faith-walk/blob/main/app-debug.apk)** file.
3. Tap **Download** (or "View raw") to download the file to your device.
4. Open the downloaded `.apk` file.
5. If prompted, allow installations from "Unknown Sources" or your browser, and tap **Install**.

---

## ✨ Features

### 📖 Dynamic Bible Reader (Multi-Version)
* Access complete Holy Bible scriptures (KJV, ASV, and more) dynamically fetched using high-speed CDN integration (no bulky local database downloads required).
* Dynamic chapter/verse navigation and quick reading-history tracking.
* Easily save verses, select specific ranges, and write notes.

### 📝 Prayer Journal
* Pen and save your private prayers.
* Map specific Bible verses to your prayers to build your scriptures of faith.
* Easily review your prayer history and track answered prayers.

### 🔥 Daily Spiritual Temperature Quiz
* Take a 10-question daily check-in to assess your spiritual state.
* Track your standing on the Spiritual Scale: *On Fire*, *Hot*, *Warm*, *Cooling*, or *Cold*.
* Receive personalized encouragement and scriptures based on your results.
* Track your weekly trend with the responsive sidebar graph.

### 🎙️ William Marrion Branham Sermons
* Stream curated message sermons (including the landmark *Seven Seals* series) directly within the app.
* Filter by categories: *Seven Seals*, *Revelation*, *End Times*, *Signs*, and *Spiritual Growth*.
* Quick links to download and read sermon transcripts.

### 📊 Progress Dashboard
* Track key spiritual metrics: prayers logged, verses read, unique scriptures explored, and daily streak.
* Beautiful visual charts representing scripture coverage and your most-read books.

---

## 🛠️ Technology Stack
* **Core**: Semantic HTML5, Vanilla ES6 JavaScript (logic, API-based caching, service workers).
* **Styling**: Premium custom Vanilla CSS (glassmorphism, vibrant dark mode, fluid transitions, and dynamic layouts).
* **Mobile Integration**: **CapacitorJS** for compile-to-native Android.
* **Desktop Integration**: **Electron** for native Linux/macOS/Windows desktop wrappers.
* **Data Fetching**: Integrates the lightweight and fast [wldeh/bible-api](https://github.com/wldeh/bible-api) via JSDeliver CDN.

---

## 🚀 For Developers & Contributors

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/)
* [Android SDK](https://developer.android.com/studio) (only if compiling the Android app)

### Setup & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BoGood40/Faith-walk.git
   cd Faith-walk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run as a Web App locally:**
   ```bash
   npm run dev
   ```

4. **Run as a Desktop App (Electron):**
   ```bash
   npm start
   ```

### 📱 Compiling the Android APK
The Android wrapper is managed via Capacitor. To rebuild or make changes to the native Android app:

1. **Build and copy the web files:**
   ```bash
   # Sync code to the web folder and Capacitor
   cp -r src www/ && cp index.html manifest.json api-polyfill.js sw.js www/
   npx cap sync
   ```

2. **Build the APK using Gradle:**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   *The compiled APK will be output to `android/app/build/outputs/apk/debug/app-debug.apk`.*

---

## 📋 Spiritual Temperature Reference

| Temperature | Score | Meaning |
| :--- | :--- | :--- |
| **🔥 On Fire** | 85 - 100% | Burning hot for Christ |
| **☀️ Hot** | 65 - 84% | Strong spiritual fire |
| **🌱 Warm** | 45 - 64% | Good but needs feeding |
| **⚠️ Cooling** | 25 - 44% | Warning - fire dimming |
| **❄️ Cold** | 0 - 24% | Urgent - return to God! |

---

## 📄 License
This project is licensed under the MIT License.
