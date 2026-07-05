#!/bin/bash
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
export GDK_BACKEND=x11
DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$DIR"

node scripts/serve.js &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null" EXIT

exec ./node_modules/.bin/electron . --no-sandbox --disable-gpu --enable-features=UseOzonePlatform --ozone-platform=x11 "$@"
