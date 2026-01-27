# PLACEHOLDER - 3D Model

Untuk menggunakan fitur AR, Anda perlu menyediakan file 3D model dalam format `.glb`.

## Cara mendapatkan 3D model:

### Opsi 1: Download dari Sketchfab (Gratis)
1. Kunjungi https://sketchfab.com
2. Cari "historical figure", "monk", atau "scholar"
3. Filter: "Downloadable" dan "glTF"
4. Download dan rename menjadi `sunan-gunung-jati.glb`
5. Letakkan file di folder ini

### Opsi 2: Gunakan model sederhana dari Kenney
1. Kunjungi https://kenney.nl/assets/animated-characters
2. Download karakter yang sesuai
3. Convert ke format .glb menggunakan Blender

### Opsi 3: Buat sendiri dengan Blender
1. Download Blender (gratis): https://www.blender.org
2. Model karakter sederhana
3. Export sebagai .glb (File > Export > glTF 2.0)

### Opsi 4: Gunakan Ready Player Me
1. Kunjungi https://readyplayer.me
2. Buat avatar custom
3. Download sebagai .glb
4. Rename menjadi `sunan-gunung-jati.glb`

## Spesifikasi Recommended:
- Format: .glb (binary glTF)
- File size: < 5 MB
- Poly count: < 10,000 triangles
- Texture size: 1024x1024px atau lebih kecil

## Tips Optimasi:
- Gunakan https://gltf.report/ untuk analisis model
- Compress dengan gltf-pipeline: `gltf-pipeline -i input.glb -o output.glb -d`
- Reduce poly count di Blender dengan Decimate modifier

---

**IMPORTANT**: Letakkan file `sunan-gunung-jati.glb` di folder ini untuk mengaktifkan AR feature.
