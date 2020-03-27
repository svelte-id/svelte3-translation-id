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
* Kamu membuat halaman baru dengan menambahkan komponen ke direktori `src/route` proyek Anda. Komponen-komponen itu akan di-_render_ di server, sehingga waktu pemuatan aplikasi pengguna akan sangat cepat untuk selanjutnya kendali akan diambil alih oleh klien.

Membuat aplikasi yang sesuai dengan semua tren modern terbaik, seperti pemisahan kode, dukungan untuk mode offline, hidrasi adalah tugas yang sangat sulit. Sapper melakukan semua hal membosankan ini untuk Anda sehingga Anda dapat berkonsentrasi hanya pada bagian kreatif.

Anda tidak perlu tahu Svelte untuk memahami sisa panduan ini, tetapi itu akan membantu. Singkatnya, ini adalah kerangka kerja UI yang mengkompilasi komponen Anda ke JavaScript vanilla yang sangat optimal. Baca [artikel blog pengantar](https://svelte.dev/blog/svelte-3-rethinking-reactivity) dan [tutorial](https://svelte.dev/tutorial), untuk mempelajari lebih lanjut tentangnya.

### Asal Muasal Nama?

Dalam perang, ada tentara yang membangun jembatan, memperbaiki jalan, membersihkan ranjau dan melakukan pembasmian - semua dalam kondisi peperangan dikenal dengan nama _sappers_.

Bagi para pengembang web taruhannya tidak setinggi para insinyur dalam peperangan. Tetapi kita menghadapi lingkungan musuh yang harus dihadapi: perangkat yang kurang kuat kemampuan, koneksi jaringan yang lambat dan kompleksitas yang pasti ada di dalam rekayasa antarmuka. Sapper (yang merupakan kependekan dari <b>S</b>velte <b>application</b> mak<b>er</b>) adalah sobatmu yang patuh dan gagah berani.

### Perbandingan dengan Next.js

[Next.js](https://github.com/zeit/next.js) — adalah _framework React_ dari [Zeit](https://zeit.co) dan juga adalah sumber inspirasi bagi Sapper. Namun, ada beberapa perbedaan yang perlu diperhatikan yaitu:

* Sapper ditenagai oleh Svelte, bukan React. Aplikasiknya lebih kecil dan lebih cepat;
* Sapper tidak menggunakan _masking_ rute, melainkan menggunakan nama file parameter untuk meng-encode rute (lihat bagian [Rute] (docs/routing) di bawah) 
* Rute server dibuat dengan cara yang sama seperti rute *halaman* biasa dalam direktori `src/routes`. Membuatnya sangat mudah untuk menambahkan entri poin untuk API JSON, sama seperti yang memperkuat halaman ini (coba kunjungi - [/docs.json](/docs.json))
* Tautan-tautan yang ada hanyalah elemen `<a>` biasa bukan komponen khusus seperti `<Link>`. Ini berarti bahwa sebagai contoh [tautan ini](/) berfungsi dengan baik pada _router_ meskipun berada dalam _blob markdown_.

### Ayo Memulai

Cara termudah untuk mulai membuat aplikasi Sapper adalah menyalin repositori templat ke komputer Anda [sapper-template](https://github.com/sveltejs/sapper-template) menggunakan utilitas [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit "sveltejs/sapper-template#rollup" my-app
# atau: npx degit "sveltejs/sapper-template#webpack" my-app
cd my-app
npm install
npm run dev
```

Hal ini akan membentuk kerangka projek baru pada direktori `my-app`, menginstal dependensinya, dan memulai server di [localhost: 3000](http://localhost:3000). Cobalah mengedit file untuk melihat betapa sederhananya semuanya - Anda bahkan mungkin tidak perlu membaca sisa panduan ini!
