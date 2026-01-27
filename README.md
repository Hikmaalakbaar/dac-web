# Sunan Gunung Jati - Immersive Learning Website

Website interaktif untuk mempelajari sejarah Sunan Gunung Jati dengan teknologi Augmented Reality (AR). Dikembangkan untuk DAC Indonesia sebagai platform pembelajaran immersive untuk pelajar.

## 🎯 Fitur Utama

- **Hero Section Immersive**: Background bergambar Makam Sunan Gunung Jati dengan aesthetic Jawa
- **Informasi Sejarah Lengkap**: Biografi dan perjalanan Sunan Gunung Jati
- **Galeri Visual**: Dokumentasi makam dan peninggalan bersejarah
- **Lokasi Interaktif**: Google Maps terintegrasi dengan informasi kunjungan
- **AR Experience**: Teknologi AR untuk melihat model 3D dengan narasi audio

## 🛠️ Teknologi

- **HTML5**: Struktur semantik
- **CSS3**: Design system dengan Javanese aesthetic
- **Vanilla JavaScript**: Interaktivitas tanpa framework heavy
- **A-Frame 1.4.2**: 3D/WebXR framework
- **AR.js 3.4.5**: Augmented Reality untuk web
- **Google Fonts**: Crimson Text & Inter
- **Google Maps**: Embedded maps

## 📁 Struktur Project

```
web-dac-27-1/
├── index.html              # Halaman utama
├── ar-view.html           # Halaman AR experience
├── css/
│   ├── main.css          # Styles utama dengan design system
│   └── ar-styles.css     # Styles khusus AR view
├── js/
│   ├── main.js           # JavaScript utama
│   └── ar-controller.js  # AR controller & logic
├── assets/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── sunan-portrait.jpg
│   │   ├── history-1.jpg
│   │   └── history-2.jpg
│   ├── models/
│   │   ├── sunan-gunung-jati.glb  # 3D model (Anda perlu menyediakan)
│   │   └── marker.png              # AR marker pattern
│   └── audio/
│       └── narration.mp3           # Audio narasi (Anda perlu menyediakan)
└── README.md
```

## 🚀 Cara Menjalankan

### Opsi 1: Menggunakan Python (Recommended)

```bash
# Masuk ke folder project
cd web-dac-27-1

# Jalankan server HTTP
python -m http.server 8080
```

Buka browser: `http://localhost:8080`

### Opsi 2: Menggunakan Node.js

```bash
# Install http-server globally (hanya sekali)
npm install -g http-server

# Jalankan server
http-server -p 8080
```

Buka browser: `http://localhost:8080`

### Opsi 3: Menggunakan Live Server (VS Code)

1. Install extension "Live Server" di VS Code
2. Klik kanan `index.html`
3. Pilih "Open with Live Server"

## 📱 Testing AR Feature

### Syarat AR:
- Browser: Chrome, Edge, atau Firefox (mobile/desktop dengan kamera)
- HTTPS atau localhost (required untuk camera access)
- Kamera yang berfungsi

### Cara Test AR:

1. Buka `ar-view.html` dari halaman utama atau langsung
2. Izinkan akses kamera ketika diminta
3. **Mode Marker**: Cetak atau tampilkan AR marker (HIRO marker) di layar lain
4. **Mode Tanpa Marker**: Klik tombol "Mode Tanpa Marker" untuk melihat model tanpa marker

**Download HIRO Marker**: [AR.js HIRO Pattern](https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png)

## 🎨 Customization

### Mengganti Gambar

Ganti file di folder `assets/images/` dengan ukuran yang sesuai:
- `hero-bg.jpg`: 1920x1080px (landscape)
- `sunan-portrait.jpg`: 800x1000px (portrait)
- `history-1.jpg`, `history-2.jpg`: 1200x900px

### Mengganti 3D Model

1. Siapkan model 3D dalam format `.glb` atau `.gltf`
2. Ganti file `assets/models/sunan-gunung-jati.glb`
3. Sesuaikan scale di `ar-view.html` jika diperlukan:

```html
<a-entity
    gltf-model="url(assets/models/sunan-gunung-jati.glb)"
    scale="1 1 1"  <!-- Sesuaikan scale di sini -->
    ...>
</a-entity>
```

**Cara membuat 3D model**:
- Gunakan Blender (gratis) untuk membuat/edit model
- Export sebagai `.glb` (format binary lebih kecil)
- Optimasi model untuk web (poly count rendah ~10k triangles)

### Mengganti Audio Narasi

1. Siapkan file audio MP3 (recommended: 128kbps, mono)
2. Ganti file `assets/audio/narration.mp3`
3. Durasi recommended: 2-5 menit

**Cara membuat narasi**:
- Record menggunakan microphone
- Edit dengan Audacity (gratis)
- Export sebagai MP3 dengan bitrate 128kbps

### Mengubah Warna/Tema

Edit CSS variables di `css/main.css`:

```css
:root {
    --color-primary: #8B4513;      /* Warna utama */
    --color-secondary: #D4AF37;    /* Warna aksen */
    --color-gold: #FFD700;         /* Warna emas */
    /* ... */
}
```

### Mengubah Lokasi Maps

Edit URL Google Maps di `index.html` section `#lokasi`:

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!..." 
    ...>
</iframe>
```

**Cara mendapatkan embed URL**:
1. Buka Google Maps
2. Cari lokasi yang diinginkan
3. Klik "Share" > "Embed a map"
4. Copy kode iframe
5. Paste ke HTML

## 🌐 Browser Compatibility

| Browser | Desktop | Mobile | AR Support |
|---------|---------|--------|------------|
| Chrome  | ✅      | ✅     | ✅ Full    |
| Firefox | ✅      | ✅     | ⚠️ Limited |
| Safari  | ✅      | ✅     | ⚠️ Limited |
| Edge    | ✅      | ✅     | ✅ Full    |

**Note**: AR feature bekerja optimal di Chrome mobile.

## 📦 File yang Perlu Anda Sediakan

Karena keterbatasan, beberapa file berikut perlu Anda sediakan sendiri:

### 1. **3D Model** (`assets/models/sunan-gunung-jati.glb`)

**Opsi A**: Download model gratis
- [Sketchfab](https://sketchfab.com) - Cari "historical figure" atau "islamic scholar"
- [Free3D](https://free3d.com) - Filter by GLB format

**Opsi B**: Buat sendiri
- Gunakan Blender untuk model custom
- Atau gunakan Ready Player Me untuk character model

**Opsi C**: Gunakan placeholder sementara
- Download model sederhana: [Kenney Assets](https://kenney.nl/assets)

### 2. **Audio Narasi** (`assets/audio/narration.mp3`)

**Opsi A**: Text-to-Speech
- Gunakan [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech)
- Atau [ElevenLabs](https://elevenlabs.io) untuk suara natural

**Opsi B**: Record sendiri
- Script narasi contoh tersedia di bawah

**Opsi C**: Gunakan silence placeholder
```bash
# Generate silent audio (untuk testing)
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 60 -q:a 9 -acodec libmp3lame narration.mp3
```

### 3. **AR Marker** (`assets/models/marker.png`) - Optional

Download HIRO marker: https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png

## 📝 Script Narasi Contoh

Berikut script yang dapat digunakan untuk audio narasi:

```
Assalamualaikum warahmatullahi wabarakatuh.

Sunan Gunung Jati, atau yang bernama asli Syarif Hidayatullah, 
merupakan salah satu Wali Songo yang sangat berpengaruh dalam 
penyebaran agama Islam di Jawa Barat.

Beliau lahir pada tahun 1448 Masehi di Mesir dan merupakan 
keturunan bangsawan dari garis Rasulullah Shallallahu Alaihi Wasallam.

Kedatangan Sunan Gunung Jati ke Nusantara membawa perubahan besar 
dalam perkembangan Islam di wilayah Cirebon dan sekitarnya.

Beliau mendirikan Kesultanan Cirebon dan menjadi sultan pertama 
yang menyebarkan Islam dengan pendekatan kultural, menggabungkan 
nilai-nilai Islam dengan budaya lokal Jawa.

Sunan Gunung Jati mengajarkan ilmu agama dan pengetahuan kepada 
masyarakat dengan metode yang mudah dipahami dan diterima.

Warisan spiritual dan budaya yang ditinggalkan Sunan Gunung Jati 
masih dilestarikan hingga kini oleh masyarakat Cirebon.

Makam beliau di Gunung Jati, Cirebon, menjadi tempat ziarah yang 
dikunjungi ribuan peziarah setiap tahunnya.

Wassalamualaikum warahmatullahi wabarakatuh.
```

## 🐛 Troubleshooting

### AR tidak berfungsi di mobile

1. Pastikan menggunakan HTTPS atau localhost
2. Clear browser cache
3. Berikan izin kamera di browser settings
4. Gunakan Chrome mobile (recommended)

### 3D Model tidak muncul

1. Pastikan file `.glb` ada di folder yang benar
2. Check browser console untuk error
3. Coba model yang lebih sederhana (file size < 5MB)
4. Pastikan path file benar (case-sensitive)

### Audio tidak play

1. Pastikan file MP3 ada dan path benar
2. Check codec audio (gunakan MP3 dengan bitrate rendah)
3. Beberapa browser require user interaction sebelum play audio

### Website lambat

1. Optimasi ukuran gambar (gunakan TinyPNG)
2. Compress 3D model (gunakan gltf-pipeline)
3. Kurangi poly count model
4. Aktifkan browser caching

## 📄 License

Developed for educational purposes - DAC Indonesia

## 👨‍💻 Support

Untuk pertanyaan atau bantuan, silakan hubungi tim development DAC Indonesia.

---

**Powered by DAC Indonesia** - Immersive Learning for the Digital Generation
