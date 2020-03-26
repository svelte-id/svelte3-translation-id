---
title: API klien
---

Modul `@ sapper/app`, yang menghasilkan Sapper berdasarkan pada struktur aplikasi Anda, berisi fungsi untuk mengendalikan Sapper secara programatis dan menanggapi _event_ (peristiwa).



### start ({target})

* `target` - elemen di mana halaman akan di-render

Mengkonfigurasi router dan meluncurkan aplikasi - menangkap klik pada elemen `<a>`, berinteraksi dengan API `history`, menampilkan dan memperbarui komponen Svelte.

Mengembalikan objek `Promise`, yang dieksekusi ketika halaman yang dimuat telah selesai 'hidrasi'.


```js
import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
}).then(() => {
	console.log('client-side app telah berlangsung');
});
```


### goto(href, options?)

* `href` - halaman yang akan dituju* `options` - dapat menyertakan properti` replaceState`, yang menentukan apakah akan menggunakan `history.pushState` (default) atau` history.replaceState`. Tidak wajibSecara terprogram menavigasi ke `href` yang diberikan. Jika tujuannya adalah rute Sapper, Sapper akan menangani navigasi, jika tidak halaman akan dimuat ulang dengan `href` yang baru. Dengan kata lain, perilaku tersebut seolah-olah pengguna mengklik tautan dengan `href` ini.

Mengembalikan `Promise` yang diselesaikan saat navigasi selesai. Ini dapat digunakan untuk melakukan tindakan setelah navigasi selesai, seperti memperbarui basis data, menyimpan, dll.

```js
import { goto } from '@sapper/app';

const navigateAndSave = async () => {
	await goto('/');
	saveItem();
}

const saveItem = () => {
	// lakukan sesuatu pada database
}
```

### prefetch(href)

* `href` - halaman untuk prefetch

Secara terprogram mengambil halaman sebelumnya, yang berarti 
a) memastikan bahwa kode untuk halaman dimuat, dan 
b) memanggil metode `preload` halaman dengan opsi yang sesuai. Ini adalah perilaku yang sama yang dipicu oleh Sapper ketika pengguna mengetuk atau menggerakkan mouse di atas elemen `<a>` dengan [rel=prefetch](docs#Prefetching).

Mengembalikan `Promise` yang diselesaikan saat _prefetch_ selesai.

### prefetchRoutes(routes?)

* `route` - array string opsional yang merepresntasikan rute yang akan di-_prefetch_.

Secara programatis melakukan _prefetch_ (penjemputan) kode untuk rute yang belum diambil. Biasanya kamu dapat memanggilnya setelah metode `sapper.start()` tuntas, untuk mempercepat navigasi selanjutnya (inilah kepanjangan akronim 'L' pada [pola PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)). Mengabaikan argumen akan mengakibatkan semua rute diambil, atau kamu bisa menujuk rute dengan menggunakan nama path yang _matching_ dengan misalnya `/about` (yang _match_ dengan `src/routes/about.svelte`) atau `/blog/*` (yang _match_ `src/routes/blog/[slug].svelte`). Namun tidak seperti `prefetch`, cara ini tidak akan memanggil `preload` untuk setiap halaman.

Mengembalikan `Promise` yang diselesaikan saat rute telah dijemput sebelumnya.