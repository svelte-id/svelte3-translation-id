---
title: API Klien
---

Modul `@ sapper/app` di-_generate_ oleh Sapper berdasarkan bentuk aplikasi Anda. Modul tersebut berisi fungsi-fungsi untuk mengendalikan Sapper secara programatis dan menanggapi _events_ (peristiwa-peristiwa).


### start ({target})

* `target` - elemen yang akan di-_render_ pada halaman

Hal ini akan mengkonfigurasi _router_ dan mulai meluncurkan aplikasi - mendengarkan adakah klik pada elemen `<a>`, berinteraksi dengan API `history`, me-_render_ dan memperbarui komponen Svelte.

Memberikan hasil kembali `Promise`, yang dieksekusi ketika halaman yang dimuat telah selesai 'hidrasi'.


```js
import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
}).then(() => {
	console.log('client-side app telah berlangsung');
});
```


### goto(href, options?)

* `href` - halaman yang akan dituju
* `options` - dapat menyertakan properti` replaceState`, yang menentukan apakah akan menggunakan `history.pushState` (secara default) atau menggunakan `history.replaceState`. Tidak wajib

Secara terprogram menavigasi ke `href` yang diberikan. Jika tujuannya adalah rute Sapper, Sapper akan mengelola navigasi namun jika tidak maka halaman akan dimuat ulang dengan `href` yang baru. Dengan kata lain, perilaku tersebut seperti seolah-olah pengguna mengklik tautan dengan `href` ini.

Memberikan hasil kembali `Promise` yang terselesaikan pada saat navigasi telah selesai. Dapat dimanfaatkan untuk melakukan aksi setelah navigasi telah selesai misalnya memperbarui basis data, menyimpan, dll.

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

* `href` - halaman untuk dijemput (_prefetch_)

Secara terprogram menjemput (_prefetch_) halaman tertentu untuk tujuan: 
a) memastikan bahwa kode untuk halaman telah dimuat dan 
b) memanggil metode `preload` halaman dengan opsi-opsi yang bersesuaian. Ini adalah perilaku yang sama yang dipicu Sapper saat ketika pengguna mengetuk atau menggerakkan mouse di atas elemen `<a>` dengan [rel=prefetch](docs#Prefetching).

Memberikan hasil kembali `Promise` yang terselesaikan saat penjemputan selesai.

### prefetchRoutes(routes?)

* `route` - array string opsional yang merepresentasikan rute yang akan dijemput.

Secara programatis melakukan _prefetch_ (penjemputan) kode untuk rute yang belum diambil. Biasanya kamu dapat memanggilnya setelah metode `sapper.start()` telah diselesaikan untuk mempercepat navigasi selanjutnya (inilah kepanjangan akronim 'L' pada [pola PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)). Mengabaikan argumen akan mengakibatkan semua rute diambil. Kamu bisa menunjuk rute spesifik dengan menggunakan nama _path_ yang bersesuaian dengan misalnya `/about` (yang bersesuaian dengan `src/routes/about.svelte`) atau `/blog/*` (yang bersesuaian dengan `src/routes/blog/[slug].svelte`). Namun tidak seperti `prefetch`, cara ini tidak akan memanggil `preload` untuk setiap halaman.

Memberikan hasil `Promise` yang terselesaikan saat rute telah dijemput.