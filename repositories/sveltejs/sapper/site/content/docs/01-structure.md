---
title: Struktur Aplikasi
---

Ini hanya bagian untuk yang penasaran. Kami menyarankan Anda bermain dulu dengan templat proyek dan kembali ke sini ketika Anda memahami keterkaitan banyak hal.

Jika Anda melihat ke dalam templat [sapper-template](https://github.com/sveltejs/sapper-template), Anda akan melihat beberapa file yang diharapkan Sapper ada di sana:

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

Ketika Anda pertama kali memulai, Sapper akan membuat direktori tambahan `__sapper__` yang berisi file-file yang dihasilkan.

Anda akan melihat beberapa file tambahan dan direktori `cypress`, yang terkait dengan proses [pengujian] (docs#Testing) - tetapi saat ini kita tidak perlu fokus ke sini.

> Anda dapat * membuat * file-file ini dari awal, tetapi jauh lebih mudah untuk menggunakan templat yang sudah jadi. Lihat [Memulai] (docs # Nachalo_raboty) untuk instruksi tentang cara mudah menggunakan templat ke komputer Anda.

### package.json

Package.json Anda berisi dependensi aplikasi Anda dan mendefinisikan sejumlah skrip::

* `npm run dev` — jalankan aplikasi dalam mode pengembangan dan pantau perubahan pada file sumber
* `npm run build` — membangun aplikasi _production_
* `npm run export` — buat versi statis aplikasi, jika memungkinkan (lihat [Ekspor](docs#Proses_Ekspor))
* `npm start` — memulai aplikasi dalam mode produksi setelah Anda membangunnya
* `npm test` — jalankan tes (lihat [Pengujian](docs#Pengujian_Testing))

### src

Ada tiga entry point aplikasi Anda — `src/client.js`, `src/server.js` dan (opsional) `src/service-worker.js` — serta file `src/template.html`.


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

_Service-worker_ bertindak sebagai penolong (proxy) yang memberi Anda kontrol yang terperinci mengenai cara menanggapi permintaan jaringan. Misalnya, ketika browser meminta `/goats.jpg`, pekerja layanan dapat mengembalikan file yang sebelumnya telah di-cache, atau ia dapat mentransfer permintaan ke server, atau ia bahkan dapat merespons dengan sesuatu yang sama sekali berbeda, misalnya, gambar rusa.

Di antaranya, mereka memungkinkan Anda membuat aplikasi yang bekerja offline.

Karena setiap aplikasi memerlukan perilaku khusus pekerja layanan (satu perlu memberikan segalanya dari cache, sementara yang lain membutuhkan cache hanya jika tidak ada koneksi), Sapper tidak membatasi perilaku pekerja layanan dengan cara apa pun. Anda sendiri yang menulis logikanya di `service-worker.js`. Anda dapat mengimpor objek berikut dari `@sapper/service-worker`:

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

Ini adalah dasar dari aplikasi Anda - halaman server dan rute. Anda akan belajar lebih banyak di bagian [Rute](docs#Rute).


### static

Ini adalah tempat untuk meletakkan file yang digunakan aplikasi Anda - font, gambar, dan sebagainya. Sebagai contoh, `static/favicon.png` akan tersedia sebagai `/favicon.png`.

Sapper tidak akan menyajikan file-file ini. Biasanya Anda akan menggunakan [sirv](https://github.com/lukeed/sirv) atau [serve-static](https://github.com/expressjs/serve-static). Tetapi itu akan memindai isi folder `static` sehingga Anda dapat dengan mudah menghasilkan manifes cache untuk mendukung  luar jaringan (lihat [service-worker.js](docs#src_service-worker_js)).


### rollup.config.js/ webpack.config.js

Sapper dapat menggunakan [Rollup](https://rollupjs.org/) atau [webpack](https://webpack.js.org/) untuk membangun aplikasi Anda. Kemungkinan besar, kamu tidak perlu mengubah konfigurasinya, tetapi apabila diperlukan kamu bisa menambahkan plug-in baru.