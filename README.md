# Generator RPM (Rencana Pembelajaran Mendalam) AI

Aplikasi web berbasis React dan AI (Google Gemini) untuk membantu guru menyusun Rencana Pembelajaran Mendalam sesuai format Permendikdasmen No. 1 Tahun 2026.

## Cara Deploy Otomatis ke Netlify

Aplikasi ini sudah dikonfigurasi untuk siap deploy.

### Langkah 1: Push ke GitHub
1. Buat repository baru di GitHub.
2. Upload semua file project ini ke repository tersebut.

### Langkah 2: Hubungkan ke Netlify
1. Buka [Netlify](https://www.netlify.com/).
2. Klik **Add new site** > **Import an existing project**.
3. Pilih **GitHub** dan pilih repository yang baru Anda buat.

### Langkah 3: Konfigurasi Build (Otomatis)
Karena sudah ada file `netlify.toml`, Netlify akan otomatis mengisi:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Langkah 4: Masukkan API Key (PENTING!)
Sebelum klik "Deploy site", atau setelah deploy pertama gagal:
1. Masuk ke **Site configuration** > **Environment variables**.
2. Klik **Add a variable**.
3. Key: `API_KEY`
4. Value: `(Masukkan API Key Gemini Anda dari Google AI Studio)`
5. Simpan dan Redeploy (Trigger deploy).

## Pengembangan Lokal

1. Install dependencies:
   ```bash
   npm install
   ```
2. Buat file `.env` di root folder:
   ```env
   API_KEY=masukkan_api_key_disini
   ```
3. Jalankan server dev:
   ```bash
   npm run dev
   ```
