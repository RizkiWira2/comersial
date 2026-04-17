#!/bin/bash
set -x

# start-local.sh - Robust startup script for the project

echo "🚀 Memulai proses startup..."

# 1. Bersihkan proses Node/Vite lama yang mungkin masih menggantung
echo "🧹 Membersihkan proses lama..."
pkill -9 node > /dev/null 2>&1
pkill -9 vite > /dev/null 2>&1

# 2. Pastikan PATH menyertakan lokasi umum npm/node di Mac
export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin

# 3. Verifikasi dependensi
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules tidak ditemukan. Menjalankan npm install..."
    npm install
fi

# 4. Jalankan aplikasi
echo "✨ Menjalankan aplikasi di http://localhost:8080 ..."
npm run dev -- --port 8080 --host
