---
title: Migrasi
---


Sampai kita mencapai versi 1.0, mungkin ada perubahan sesekali pada struktur proyek yang diharapkan Sapper.


### dari 0.25 ke 0.26

Perubahan yang paling signifikan: Sapper sekarang dibangun di atas Svelte 3.

#### Mengimpor Sapper

Runtime aplikasi Anda sekarang dibuat untuk `src / node_modules / @ sapper` - ini memungkinkan Anda untuk mengimpornya dengan mudah dari mana saja dalam kode sumber Anda. Perbarui `server.js` Anda ...

```diff
// src/server.js
-import * as sapper from '../__sapper__/server.js';
+import * as sapper from '@sapper/server';
```

...dan client.js:

```diff
-import * as sapper from '../__sapper__/client.js';
+import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});
```

Hal yang sama berlaku untuk import seperti `goto` dan `prefetchRoutes`.


#### Konfigurasi Webpack

Apabila kamu menggunakan webpack, kamu harus meng-update konfigurasi untuk mengenali file `.mjs` dan `.svelte`:

```js
resolve: {
	extensions: ['.mjs', '.js', '.json', '.svelte', '.html']
}
```

Apabila kamu menggunakan file .svelte (_recommended_), kamu juga perlu memberitahu `svelte-loader` untuk mengenalinya:

```diff
-test: /\.html$/
+test: /\.(svelte|html)$/
```


#### Data Sesi

Menyampaikan data dari _server_ ke klien kini dilakukan dengan fungsi `session` yang diteruskan ke _middleware_:

```js
// src/server.js
sapper.middleware({
	session: (req, res) => ({
		// data sesi di sini
	})
})
```

Data ini tersedia dalam fungsi `preload` sebagai parameter kedua:

```html
<!-- SomeComponent.svelte -->
<script context="module">
	export function preload(page, session) {
		const { path, params, query } = page; // seperti sebelumnya

		if (!session.user) return this.redirect(302, 'login');
		// ...
	}
</script>
```


#### Penyimpanan (Stores)

Tersedia juga bersama `page` dan `preloading` sebagai suatu penyimpanan (_store_) dalam komponen:

```html
<script>
	import * as sapper from '@sapper/app';
	const { page, preloading, session } = sapper.stores();
</script>
```

`page` dan `preloading` adalah [penyimpanan-readable](https://svelte.dev/tutorial/readable-stores), sedangkan `session` adalah [penyimpanan-writable](https://svelte.dev/tutorial/writable-stores). Menulis pada penyimpanan sesi (sebagai contoh, setelah user log in) akan menyebabkan semua fungsi `preload` yang bergantung pada data sesi untuk dijalankan ulang (_re-run_); tidak ada data sesi yang dipertahankan kepada server.


#### Tata Letak

Komponen tata letak Anda sekarang harus menggunakan elemen `<slot>` untuk membuat rute bersarang, bukannya `<svelte: komponen>`:

```diff
<main>
-	<svelte:component this={child.component} {...child.props}/>
+	<slot></slot>
</main>
```

Komponen tata letak itu sendiri menerima prop `segment`, yang setara dengan` child.segment` di versi sebelumnya.


### 0.21 ke 0.22

Alih-alih mengimpor middleware dari paket `sapper`, atau mengimpor _runtime_ klien dari` sapper / runtime.js`, aplikasi ini *dikompilasi* menghasilkan file:

```diff
// src/client.js
-import { init } from 'sapper/runtime.js';
-import { manifest } from './manifest/client.js';
+import * as sapper from '../__sapper__/client.js';

-init({
+sapper.start({
	target: document.querySelector('#sapper'),
-	manifest
});
```

```diff
// src/server.js
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
-import sapper from 'sapper';
-import { manifest } from './manifest/server.js';
+import * as sapper from '../__sapper__/server.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
-		sirv('assets', { dev }),
+		sirv('static', { dev }),
-		sapper({ manifest })
+		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
```

```diff
// src/service-worker.js
-import { assets, shell, routes, timestamp } from './manifest/service-worker.js';
+import { files, shell, routes, timestamp } from '../__sapper__/service-worker.js';
```

Selain itu, direktori bawaan _build_ dan ekspor masing-masing sekarang adalah `__sapper__/build` dan `__sapper__/export`.


### 0.20 ke 0.21

* Direktori `app` sekarang adalah `src`
* Direktori `routes` sekarang `src/routes`
* Direktori `assets` sekarang `static` (ingat untuk memperbarui file `src/server.js` Anda untuk mencerminkan perubahan ini juga)
* Alih-alih memiliki tiga file konfigurasi terpisah (`webpack/client.config.js`,` webpack/server.config.js` dan `webpack/ service-worker.config.js`), cukup ada satu file `webpack.config.js` yang mengekspor konfigurasi `client`,`server` dan `serviceworker`.


### 0.17 ke 0.18

File `sapper/webpack/config.js` (diperlukan dalam file `webpack/*.Config.js`) sekarang menjadi `sapper/config/webpack.js`.


### 0.14 ke 0.15

Rilis ini mengubah cara penanganan rute, menghasilkan sejumlah perubahan.

Alih-alih komponen `App.html` tunggal, Anda dapat menempatkan komponen` _layout.html` di direktori mana pun di bawah `routes`. Anda harus memindahkan `app/App.html` ke `routes/_layout.html` dan memodifikasinya seperti berikut ini:

```diff
-<!-- app/App.html -->
+<!-- routes/_layout.html -->

-<Nav path={props.path}/>
+<Nav segment={child.segment}/>

-<svelte:component this={Page} {...props}/>
+<svelte:component this={child.component} {...child.props}/>
```

selanjutnya kamu perlu menghapus `App` dari titik masuk (_entry point_) klien dan server Anda, dan mengganti `routes` dengan `manifes`:

```diff
// app/client.js
import { init } from 'sapper/runtime.js';
-import { routes } from './manifest/client.js';
-import App from './App.html';
+import { manifest } from './manifest/client.js';

init({
	target: document.querySelector('#sapper'),
-	routes,
-	App
+	manifest
});
```

```diff
// app/server.js
import sirv from 'sirv';
import polka from 'polka';
import sapper from 'sapper';
import compression from 'compression';
-import { routes } from './manifest/server.js';
-import App from './App.html';
+import { manifest } from './manifest/server.js';

polka()
	.use(
		compression({ threshold: 0 }),
		sirv('assets'),
-		sapper({ routes, App })
+		sapper({ manifest })
	)
	.listen(process.env.PORT)
	.catch(err => {
		console.log('error', err);
	});
```
fungsi `preload` tidak lagi mengambil seluruh objek permintaan pada server; sebaliknya, mereka menerima parameter yang sama seperti halnya pada klien.



### 0.13 ke 0.14

Halaman kesalahan `4xx.html` dan` 5xx.html` telah diganti dengan satu halaman, `_error.html`. Selain propors `params`,` query` dan `path` biasa, halaman ini menerima` status` dan `error`.




### 0.11 ke 0.12

Dalam versi sebelumnya, setiap halaman adalah komponen yang sepenuhnya mandiri. Pada saat navigasi, seluruh halaman akan di-reset dan dibuat yang baru. Biasanya, setiap halaman akan mengimpor komponen `<Layout>` bersama untuk mencapai konsistensi visual.

Pada 0.12, perubahan ini: kita punya satu komponen `<App>` tunggal, yang didefinisikan dalam `app/App.html`, yang mengendalikan rendering dari sisa aplikasi. Lihat [templat-sapper] (https://github.com/sveltejs/sapper-template/blob/master/app/App.html) untuk contoh.

Komponen ini dirender dengan nilai-nilai berikut:

* `Page` - konstruktor komponen untuk halaman saat ini
* `props` - objek dengan `params`, `query`, dan data apa pun yang dikembalikan dari fungsi `preload` halaman
* `preloading` - `true` saat preload, `false` sebaliknya. Berguna untuk menunjukkan indikator kemajuan

Sapper perlu tahu tentang komponen aplikasi Anda. Untuk itu, Anda perlu memodifikasi `app/server.js` dan `app/client.js` Anda:

```diff
// app/server.js
import polka from 'polka';
import sapper from 'sapper';
import serve from 'serve-static';
import { routes } from './manifest/server.js';
+import App from './App.html';

polka()
	.use(
		serve('assets'),
-		sapper({ routes })
+		sapper({ App, routes })
	)
	.listen(process.env.PORT);
```

```diff
// app/client.js
import { init } from 'sapper/runtime.js';
import { routes } from './manifest/client.js';
+import App from './App.html';

-init(target: document.querySelector('#sapper'), routes);
+init({
+	target: document.querySelector('#sapper'),
+	routes,
+	App
+});
```

Setelah `App.html` Anda dibuat dan aplikasi server dan klien Anda diperbarui, Anda dapat menghapus komponen `<Layout> `dari setiap halaman Anda.


### <0.9 ke 0.10

##### app / template.html

* Elemen `<head>` Anda harus mengandung `%sapper.base%` (lihat ([Basis URL](docs#Basis_URL))
* Hapus referensi ke _service worker_ Anda; sekarang ditangani oleh `%sapper.scripts%`

##### Halaman

* Fungsi `preload` Anda sekarang harus menggunakan `this.fetch` bukannya `fetch`. `this.fetch` memungkinkan Anda membuat permintaan kredensial di server, dan berarti Anda tidak perlu lagi membuat objek `global.fetch` di `app/server.js`.



### 0.6 ke 0.7

Lihat [sapper-template](https://github.com/sveltejs/sapper-template) untuk contoh lengkap dari semua poin di bawah ini.


##### package.json

Untuk memulai server dev, gunakan `sapper dev` bukannya `node server.js`. Kemungkinan besar, `package.json` Anda memiliki skrip `npm run dev` yang perlu diperbarui.

##### Entry points

Pada versi 0.7, Sapper akan mencari titik masuk Anda - untuk klien, server dan service worker - dalam folder `app`. Alih-alih menggunakan `__variables__` yang di-inject secara ajaib, setiap titik masuk akan mengimpor dari file yang bersesuaian pada folder `app/manifests`. Semua ini dihasilkan oleh Sapper secara otomatis.

```js
// app/client.js (formerly templates/main.js)
import { init } from 'sapper/runtime.js';
import { routes } from './manifest/client.js';

init(document.querySelector('#sapper'), routes);

if (module.hot) module.hot.accept(); // aktifkan hot reloading
```

```js
// app/server.js (dahulu server.js)
// Perhatikan bawah sekarang kita menggunakan sintaks modul ES,
// karena file ini diproses oleh webpack sebagaimana halnya 
// seperti seluruh sisa aplikasi ini selanjutnya
import sapper from 'sapper';
import { routes } from './manifest/server.js';
// ... import-import lainnya

// kita dapat menyampaikan objek `routes` kepada middleware Sapper
app.use(sapper({
	routes
}));
```

```js
// app/service-worker.js (dahulu templates/service-worker.js)
import { assets, shell, timestamp, routes } from './manifest/service-worker.js';

// misalnya menggantikan `__assets__` dengan `assets` di file
```


##### Template dan halaman kesalahan

Dalam versi sebelumnya, kami memiliki `templates/2xx.html`,` templates/4xx.html` dan `templates/5xx.html`. Sekarang, kita memiliki satu templat, `app/templat.html`, yang akan terlihat seperti` templat/2xx.html` lama Anda.

Untuk menangani status kesalahan, kami memiliki rute 'khusus': `route/_error.html`.

Halaman ini sama seperti halaman lainnya, kecuali halaman ini akan ditampilkan setiap kali status kesalahan tercapai. Komponen memiliki akses ke nilai `status` dan `error`.

Perhatikan bahwa Anda sekarang dapat menggunakan `this.error (statusCode, error)` di dalam fungsi `preload` Anda.


##### Konfigurasi Webpack

Konfigurasi webpack Anda sekarang _live_ pada direktori `webpack`:

* `webpack.client.config.js` sekarang menjadi `webpack/client.config.js`
* `webpack.server.config.js` sekarang menjadi `webpack/server.config.js`

Jika Anda memiliki _service-worker_, Anda juga harus memiliki file `webpack/service-worker.config.js`. Lihat [templat-sapper] (https://github.com/sveltejs/sapper-template) untuk contoh.