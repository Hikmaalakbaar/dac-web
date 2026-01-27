# PLACEHOLDER - Audio Narasi

Untuk pengalaman AR yang lengkap, Anda perlu menyediakan file audio narasi sejarah Sunan Gunung Jati.

## Script Narasi:

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

## Cara membuat audio:

### Opsi 1: Text-to-Speech (Tercepat)

**Google Cloud Text-to-Speech:**
1. Kunjungi https://cloud.google.com/text-to-speech
2. Paste script di atas
3. Pilih bahasa: Indonesian (id-ID)
4. Pilih voice: WaveNet atau Neural2 untuk kualitas terbaik
5. Download sebagai MP3

**ElevenLabs (Gratis - Limited):**
1. Kunjungi https://elevenlabs.io
2. Sign up (free tier available)
3. Paste script
4. Generate dan download

**TTSMaker (Gratis - No Signup):**
1. Kunjungi https://ttsmaker.com
2. Paste script
3. Pilih Indonesian voice
4. Download MP3

### Opsi 2: Record sendiri

**Menggunakan Audacity (Gratis):**
1. Download Audacity: https://www.audacityteam.org
2. Setup microphone
3. Klik Record, baca script
4. Edit: Remove noise, normalize volume
5. Export sebagai MP3 (bitrate 128kbps)

**Menggunakan smartphone:**
1. Gunakan voice recorder app
2. Record script
3. Transfer ke PC
4. Convert ke MP3 jika perlu

### Opsi 3: Hire Voice Actor (Paling Professional)

- Fiverr: https://www.fiverr.com
- Upwork: https://www.upwork.com
- Projects.co.id: https://projects.co.id

## Spesifikasi Audio Recommended:
- Format: MP3
- Bitrate: 128 kbps (mono)
- Sample rate: 44.1 kHz
- Durasi: 2-5 menit
- File size: < 5 MB

## Tips Recording:
- Gunakan ruangan yang tenang
- Jarak microphone 15-20 cm dari mulut
- Bicara dengan jelas dan tidak terlalu cepat
- Recording di pagi hari ketika suara fresh
- Buat beberapa take, pilih yang terbaik

## Tools Gratis:

**Audio Editor:**
- Audacity (Windows/Mac/Linux)
- WavePad (Windows/Mac)
- Ocenaudio (Windows/Mac/Linux)

**Converter:**
- FFmpeg: `ffmpeg -i input.wav -b:a 128k output.mp3`
- Online: https://cloudconvert.com/audio-converter

---

**IMPORTANT**: Simpan file audio sebagai `narration.mp3` di folder ini untuk mengaktifkan narasi AR.

## Temporary Solution:

Jika Anda ingin test tanpa audio terlebih dahulu, buat file dummy:
```bash
# Windows PowerShell
fsutil file createnew narration.mp3 1024
```

Website tetap berfungsi tanpa audio, hanya audio player tidak akan play.
