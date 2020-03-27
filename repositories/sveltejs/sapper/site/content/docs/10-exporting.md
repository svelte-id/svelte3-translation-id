---
title: Proses Ekspor
---

Banyak situs secara efektif * statis *, artinya mereka tidak benar-benar membutuhkan server Express yang mendukung mereka. Sebagai gantinya, mereka dapat di-host dan disajikan sebagai file statis, yang memungkinkan mereka untuk digunakan ke lebih banyak lingkungan hosting (seperti [Netlify] (https://www.netlify.com/) atau [Halaman GitHub] (https: // pages.github.com/)). Situs statis umumnya lebih murah untuk beroperasi dan memiliki karakteristik kinerja yang lebih baik.

Sapper memungkinkan Anda untuk *mengekspor* situs statis dengan perintah tunggal  `sapper export` tanpa-konfigurasi. Bahkan, sekarang kamu sedang melihat situs hasil ekspor!

Statis tidak berarti non-interaktif - komponen Svelte Anda bekerja persis seperti biasanya, dan kamu masih bisa mendapatkan semua manfaat dari perutean dan penjemputan (_prefetching_) sisi klien.


### sapper export

Di dalam proyek Sapper Anda, coba ini:

```bash
# npx memungkinkan Anda untuk menggunakan dependensi yang diinstal secara lokal
npx sapper export
```

Ini akan membuat folder `__sapper __ / export` dengan pembuatan situs Anda yang siap-produksi. Anda dapat meluncurkannya seperti ini:

```bash
npx serve __sapper__/export
```

Arahkan ke [localhost: 5000] (http: // localhost: 5000) (atau port apa pun yang dipilih `serve`), dan verifikasi bahwa situs Anda berfungsi seperti yang diharapkan.

Anda juga dapat menambahkan skrip ke package.json Anda ...

```js
{
	"scripts": {
		...
		"export": "sapper export"
	}
}
```

... memungkinkan Anda untuk `npm run export` aplikasi Anda.


### Cara Kerja Ekspor

Ketika Anda menjalankan `sapper export`, Sapper pertama membangun versi produksi aplikasi Anda, seolah-olah Anda telah menjalankan `sapper build`, dan menyalin isi folder `static` Anda ke tujuan. Sapper kemudian memulai server, dan menavigasi ke root aplikasi Anda. Dari sana, ia mengikuti elemen `<a>` yang ditemukannya, dan menangkap data apa pun yang dilayani oleh aplikasi.

Karena itu, setiap halaman yang ingin Anda sertakan dalam situs yang diekspor harus dapat dijangkau oleh `<a>` elemen atau ditambahkan ke opsi `--entry` dari perintah `sapper export`. Selain itu, setiap rute non-halaman harus diminta di `preload`, *bukan* di `onMount` atau di tempat lain.


### Kapan Saatnya untuk Tidak Mengekspor

Aturan dasarnya adalah ini: agar aplikasi dapat diekspor, dua pengguna mana pun yang meng-_hit_ halaman yang sama dari aplikasi Anda harus mendapatkan konten yang sama dari server. Dengan kata lain, aplikasi apa pun yang melibatkan sesi pengguna atau otentikasi *bukan* kandidat untuk `sapper export`.

Perhatikan bahwa Anda masih dapat mengekspor aplikasi dengan rute dinamis, seperti contoh `src/route/blog/[slug].svelte` kami dari sebelumnya. `sapper export` akan mencegat permintaan `fetch` yang dibuat di dalam `preload`, sehingga data yang disajikan dari `src/route/blog/[slug].json.js` juga akan ter-_capture_.


### Konflik Rute

Karena `sapper export` menulis ke sistem file, tidak mungkin memiliki dua rute server direktori dan file sekaligus dengan nama yang sama. Sebagai contoh, `src/route/foo/index.js` dan` src/route/foo/bar.js` akan mencoba membuat `export/foo` dan `export/foo/bar`, yang tidak mungkin.

Solusinya adalah mengubah nama salah satu rute untuk menghindari konflik - misalnya, `src/route/foo-bar.js`. (Perhatikan bahwa Anda juga perlu memperbarui kode apa pun yang mengambil data dari `/foo/bar` ke referensi`/foo-bar` sebagai gantinya.)

Untuk *halaman*, kami mengatasi masalah ini dengan menulis `export/foo/index.html` alih-alih` export/foo`.