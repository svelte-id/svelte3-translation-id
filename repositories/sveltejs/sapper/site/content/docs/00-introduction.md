---
title: Pendahuluan
---

###  Pemberitahuan penting

> Sapper masih pada tahap awal pengembangan, dan beberapa hal mungkin berubah sebelum kita bisa merilis 1.0. Dokumen ini masih dalam penyelesaian. Jika Anda memiliki pertanyaan, hubungi [saluran Telegram] berbahasa Indonesia untuk mendapatkan bantuan(https://t.me/svelte_id_).
>
> Baca [Panduan Migrasi](migrating) untuk membantu memutakhirkan dari versi yang lebih lama.

### Apa itu Sapper?

Sapper — adalah kerangka kerja pembuat aplikasi web yang sangat produktif. Kamu sedang melihatnya sekarang! Inilah dua prinsip utama kami:

* Setiap halaman aplikasimu adalah sebuah komponen [Svelte](https://svelte.dev)
* Kamu membuat halaman baru dengan menambahkan komponen ke direktori `src / route` proyek Anda. Komponen-komponen itu akan di-_render_ di server, sehingga waktu pemuatan aplikasi pengguna akan sangat cepat untuk selanjutnya kendali akan diambil alih oleh klien.

Membuat aplikasi yang sesuai dengan semua tren modern terbaik, seperti pemisahan kode, dukungan untuk mode offline, hidrasi adalah tugas yang sangat sulit. Sapper melakukan semua hal membosankan ini untuk Anda sehingga Anda dapat berkonsentrasi hanya pada bagian kreatif.

Anda tidak perlu tahu Svelte untuk memahami sisa panduan ini, tetapi itu akan membantu. Singkatnya, ini adalah kerangka kerja UI yang mengkompilasi komponen Anda ke JavaScript vanilla yang sangat optimal. Baca [artikel blog pengantar](https://svelte.dev/blog/svelte-3-rethinking-reactivity) dan [tutorial](https://svelte.dev/tutorial), untuk mempelajari lebih lanjut tentangnya.

### Dari mana nama itu berasal?

Ada tentara di tentara yang terlibat dalam pembersihan ranjau - *sappers*. Tentara Amerika juga memiliki *penyadap*, tetapi bidang kegiatan mereka jauh lebih luas - selain izin ranjau, mereka juga membangun jembatan dalam kondisi pertempuran, memperbaiki jalan dan melakukan pembongkaran.

Untuk pengembang web, tarifnya biasanya lebih rendah daripada insinyur militer. Tetapi kita juga memiliki musuh yang harus kita lawan: perangkat yang kurang kuat, koneksi jaringan lambat, dan keseluruhan kompleksitas desain antarmuka. Sapper (kependekan dari <b> S </b> velte <b> aplikasi </b> mak <b> er </b>) adalah prajuritmu yang pemberani dan ulung.

### Perbandingan dengan Next.js

[Next.js](https://github.com/zeit/next.js) — kerangka kerja untuk React oleh [Zeit](https://zeit.co) adalah sumber inspirasi bagi Sapper. Namun, ada beberapa perbedaan mencolok di antaranya:

* Sapper bekerja pada Svelte, bukan pada React, jadi lebih cepat dan aplikasinya lebih kecil
* Alih-alih _masking_ rute, kami menggunakan parameter rute dalam nama file (lihat bagian [Rute] (docs/routing) di bawah)
* Rute server * dibuat dengan cara yang sama seperti rute * halaman * biasa dalam direktori `src/routes`. Misalnya, ini membuatnya sangat mudah untuk menambahkan entri poin untuk API JSON, sama seperti pada halaman ini (coba - [/ doc.json 022 (/ doc.json))
* Tautan adalah elemen `<a>` biasa, bukan komponen khusus seperti `<Link>`. Ini berarti, misalnya, bahwa [tautan ini] (/) berfungsi baik dengan router, meskipun awalnya terletak di dokumen yang diimpor dengan markup markup.

### Ayo Mulai

Cara termudah untuk mulai membuat aplikasi Sapper adalah menyalin repositori templat ke komputer Anda [sapper-template](https://github.com/sveltejs/sapper-template) menggunakan utilitas [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit "sveltejs/sapper-template#rollup" my-app
# atau: npx degit "sveltejs/sapper-template#webpack" my-app
cd my-app
npm install
npm run dev
```

Ini akan membuat proyek baru di direktori `my-app`, menginstal dependensinya, dan memulai server di [localhost: 3000] (http: // localhost: 3000). Cobalah mengedit file untuk melihat betapa sederhananya semuanya - Anda bahkan mungkin tidak perlu membaca sisa panduan ini!
