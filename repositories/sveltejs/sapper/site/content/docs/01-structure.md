---
title: Struktur Aplikasi
---

Bagian ini adalah acuan hanya untuk kamu yang penasaran. Kami menyarankan kamu mencoba-coba dulu templat projek dan nanti kembali lagi ke sini saat Anda sudah memahami bagaimana berbagai hal saling terkait.

Apabila kamu melihat ke dalam repositori templat [sapper-template](https://github.com/sveltejs/sapper-template), kamu akan melihat beberapa _file_ yang dicari oleh Sapper:

```bash
├ package.json
├ src
│ ├ routes
│ │ ├ # ini adalah rute Anda
│ │ ├ _error.svelte
│ │ └ index.svelte
│ ├ client.js
│ ├ server.js
│ ├ service-worker.js
│ └ template.html
├ static
│ ├ # gambar dan berkas statik lainnya
└ rollup.config.js / webpack.config.js
```

Saat kamu pertama kali mulai meluncurkan Sapper, akan tercipta direktori tambahan `__sapper__` yang berisi file-file yang ter-_generate_.

Kamu akan melihat beberapa file tambahan dan direktori `cypress`, yang terkait dengan proses [pengujian](docs#Testing) - yang pada saat ini belum perlu kita kuatirkan.

> Kamu dapat *membuat* file-file ini dari awal (_scratch_), tetapi adalah jauh lebih baik menggunakan templat yang sudah ada. Lihat [Memulai] (docs # Nachalo_raboty) untuk instruksi tentang cara mudah menggunakan templat ke komputer Anda.

### package.json

Package.json berisi dependensi aplikasi kamu dan terdefinisikan sejumlah skrip::

* `npm run dev` — menjalankan aplikasi dalam mode pengembangan dan pantau perubahan pada file sumber
* `npm run build` — membangun aplikasi _production_
* `npm run export` — membuat versi statis aplikasi apabila memungkinkan (lihat [Ekspor](docs#Proses_Ekspor))
* `npm start` — memulai aplikasi dalam mode produksi setelah kamu membangunnya
* `npm test` — menjalankan tes (lihat [Pengujian](docs#Pengujian_Testing))

### src

Ada tiga _entry point_ aplikasi Anda — `src/client.js`, `src/server.js` dan (opsional) `src/service-worker.js` — serta file `src/template.html`.


#### src/client.js

Di sini Anda harus mengimpor dan memanggil fungsi `start` dari modul yang dihasilkan `@sapper/app`:

```js
import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});
```

Untuk sebagian besar kasus, ini semua adalah kode modul, tetapi Anda dapat menulis di sini kode apa saja untuk kebutuhan Anda. Lihat bagian [API Klien](docs#API_Klien) untuk informasi lebih lanjut tentang fungsi yang dapat Anda impor.

#### src/server.js

Ini adalah aplikasi Express reguler (Anda dapat menggunakan [Polka] (https://github.com/lukeed/polka) atau beberapa server lain), dengan tiga persyaratan wajib:

* ia harus menyajikan isi folder `static`, menggunakan, misalnya, [sirv] (https://github.com/lukeed/sirv)
* itu harus memanggil `app.use (sapper.middleware ())` di tempat di mana `sapper` diimpor dari `@sapper/server`
* seharusnya 'hang' pada port yang ditentukan dalam `process.env.PORT`

Selebihnya, Anda dapat menulis server sesuka Anda.


#### src/service-worker.js

Pekerja layanan (_service-worker_) bertindak sebagai penolong (_proxy_) yang memberi kamu kendali yang terperinci mengenai cara menanggapi permintaan jaringan. Misalnya, ketika browser meminta `/goats.jpg`, pekerja layanan dapat mengembalikan file yang sebelumnya telah di-_cache_, atau mentransfer permintaan ke server, atau bahkan dapat merespons dengan sesuatu yang sama sekali berbeda, misalnya gambar rusa.

Di antaranya, mereka memungkinkan Anda membuat aplikasi yang bekerja _offline_.

Karena setiap aplikasi memerlukan perilaku khusus pekerja layanan (yang satu perlu memberikan segalanya dari cache, sementara yang lain membutuhkan cache hanya jika tidak ada koneksi), Sapper tidak membatasi perilaku pekerja layanan dengan cara apa pun. Anda sendiri yang menulis logikanya di `service-worker.js`. Anda dapat mengimpor objek berikut dari `@sapper/service-worker`:

* `files` - larik file yang ditemukan pada direktori` static`
* `shell` - kode JavaScript untuk klien yang dihasilkan oleh kolektor (Rollup atau webpack)
* `routes` - larik obyek {{: lRPEx}}` yang dapat Anda gunakan untuk menentukan apakah halaman yang diminta terkait dengan Sapper
* `timestamp` - waktu ketika _service-worker_ terbentuk (bermanfaat untuk membuat nama _cache_ yang unik)


#### src/template.html

File ini adalah templat untuk tanggapan dari server. Selama proses pembuatan, Sapper akan mengimplementasikan konten yang menggantikan label berikut:

* `%sapper.base%` — elemen `<base>` (lihat [Base URLs](docs#Bazovye_URL))
* `%sapper.styles%` — diperlukan CSS untuk halaman yang diminta
* `%sapper.head%` — Representasi HTML dari konten elemen `<head>`, misalnya elemen `<title>`
* `%sapper.html%` — HTML presentasi konten halaman yang diberikan
* `%sapper.scripts%` — elemen `<script>` untuk bagian klien dari aplikasi


### src/routes

Inilah dasar dari aplikasi Anda - halaman server dan rute. Anda akan belajar lebih banyak di bagian [Rute](docs#Rute).


### static

Inilah tempat untuk meletakkan file yang digunakan aplikasi Anda - font, gambar, dan sebagainya. Sebagai contoh, `static/favicon.png` akan tersedia sebagai `/favicon.png`.

Sapper tidak akan menyajikan file-file ini. Biasanya Anda akan menggunakan [sirv](https://github.com/lukeed/sirv) atau [serve-static](https://github.com/expressjs/serve-static). Tetapi itu akan memindai isi folder `static` sehingga Anda dapat dengan mudah menghasilkan manifes cache untuk mendukung  luar jaringan (lihat [service-worker.js](docs#src_service-worker_js)).


### rollup.config.js/ webpack.config.js

Sapper dapat menggunakan [Rollup](https://rollupjs.org/) atau [webpack](https://webpack.js.org/) untuk membangun aplikasi Anda. Kemungkinan besar, kamu tidak perlu mengubah konfigurasinya, tetapi apabila diperlukan kamu bisa menambahkan plug-in baru.