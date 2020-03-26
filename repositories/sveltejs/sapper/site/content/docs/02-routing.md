---
title: Rute
---
Seperti yang telah kita lihat, Sapper memiliki dua jenis rute yaitu rute halaman (_page_) dan rute server.

### Halaman

Halaman adalah komponen Svelte yang ditulis dalam file `.svelte`. Ketika pengguna pertama kali mengunjungi aplikasi, mereka akan disajikan versi rute yang di-render oleh server, ditambah beberapa JavaScript yang 'meng-hidrasi' halaman dan menginisialisasi router sisi klien. Mulai dari situ, navigasi ke halaman lain ditangani sepenuhnya pada sisi klien untuk mendapatkan perasaan seperti aplikasi yang cepat.

Nama file menentukan rute. Misalnya, `src /route/index.svelte` adalah file root dari situs Anda:


```html
<!-- src/routes/index.svelte -->
<svelte:head>
	<title>Selamat datang!</title>
</svelte:head>

<h1>Saya menyambut Anda di situs saya!</h1>
```

File dengan nama `src/route/about.svelte` atau `src/route/about/index.svelte` bersesuaian dengan rute `/about`:

```html
<!-- src/routes/about.svelte -->
<svelte:head>
	<title>Perihal</title>
</svelte:head>

<h1>Perihal situs ini</h1>
<p>Ini adalah situs terbaik!</p>
```

Parameter dinamis diatur menggunakan tanda kurung siku `[...]`. Misalnya, dengan cara ini Anda dapat membuat halaman yang menampilkan artikel dari blog:

```html
<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	// fungsi preload opsional dengan parameter
	// `{ path, params, query }` dan mengubahnya menjadi
	// data yang kita perlukan untuk me-render halaman
	export async function preload(page, session) {
		// ada parameter `slug` karena file ini
		// disebut [slug].svelte (yang terkonversi jadi html)
		const { slug } = page.params;

		// `this.fetch` — adalah _wrapper_ `fetch`
		// yang membuat kita dapat 	melakukan _request_
		// yang memiliki kredensial pada server dan klien
		const res = await this.fetch(`blog/${slug}.json`);
		const article = await res.json();

		return { article };
	}
</script>

<script>
	export let article;
</script>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<h1>{article.title}</h1>

<div class='content'>
	{@html article.html}
</div>
```


Apabila kamu hendak menangkap lebih banyak parameter, kamu bisa membuat folder terstruktur menggunakan konvensi penamaan: `[slug]/[language]`.

Кроме того, можно воспользоваться оператором расширения когда нужно получить более одного параметра `[year]/[month]/...` или количество параметров заранее не известно. Например, чтобы не создавать директорию для каждого из параметров в маршруте `/blog/[slug]/[year]/[month]/[day]`, можно просто создать файл `/blog/[...slug].svelte` и получить параметры следующим образом:

Jika Anda tidak ingin membuat beberapa folder untuk mengambil lebih dari satu parameter seperti `[year]/[month]/...`, atau jika jumlah parameternya dinamis, Anda dapat menggunakan parameter rute tersebar. Misalnya, alih-alih secara individual mengambil `/blog/[slug]/[year]/[month]/[day]`, Anda dapat membuat file untuk `/blog/[... slug].svelte` dan lakukan ekstraksi parameter seperti demikian:

```html
<!-- src/routes/blog/[...slug].svelte -->
<script context="module">
	export async function preload({ params }) {
		let [slug, year, month, day] = params.slug;

		return { slug, year, month, day };
	}
</script>
```

> Lihat bagian pada [preloading](docs#Preloading) untuk info lebih lanjut tentang `preload` dan` this.fetch`


### Rute server

Rute server adalah modul yang ditulis dalam file `.js` yang mengekspor fungsi yang berkorespondensi dengan metode HTTP. Setiap fungsi menerima objek HTTP `request` dan` response` sebagai argumen, ditambah fungsi `next`. Ini berguna untuk membuat API JSON. Misalnya, berikut ini cara untuk membuat _end point_ (titik akhir) yang melayani halaman blog di atas:

```js
// routes/blog/[slug].json.js
import db from './_database.js'; // garis bawah memberitahu Sapper bahwa ini bukan rute

export async function get(req, res, next) {
	// parameter `slug` tersedia karena file ini
	// disebut [slug] .json.js
	const { slug } = req.params;

	const article = await db.get(slug);

	if (article !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(article));
	} else {
		next();
	}
}
```

> `delete` adalah satu kata yang dikhususkan dalam JavaScript. Untuk menangani permintaan DELETE, eksporlah sebuah fungsi yang disebut `del`.


### Aturan penamaan file

Ada tiga aturan sederhana untuk memberi nama file yang menentukan rute Anda:

* File bernama `src/route/about.svelte` bersesuaian dengan rute `/about`. File yang disebut `src/route/blog/[slug].svelte` bersesuaian dengan rute `/blog/:slug`, dalam hal ini `params.slug` tersedia untuk `preload`;
* File `src/route/index.svelte` bersesuaian dengan _root_ aplikasi Anda. `src/route/about/index.svelte` diperlakukan sama dengan `src/route/about.svelte`;
* File dan direktori dengan garis bawah utama *tidak* membuat rute. Ini memungkinkan Anda untuk menempatkan modul pembantu dan komponen dengan rute yang bergantung padanya - misalnya Anda dapat memiliki file yang bernama `src/route/_helpers/datetime.js` dan hal itu tak akan *membuat* rute `/_helpers/datetime`.



### Halaman kesalahan

Selain halaman reguler, ada halaman 'khusus' yang Sapper harapkan untuk ditemukan keberadaannya - `src/route/_error.svelte`. Ini akan ditampilkan ketika kesalahan terjadi saat merender halaman.

Objek `error` tersedia untuk templat bersama dengan kode `status` HTTP.



### Regexes dalam rute

Anda dapat menggunakan subset dari ekspresi reguler untuk memenuhi syarat parameter rute, dengan menempatkannya dalam tanda kurung setelah nama parameter.

Sebagai contoh, `src/route/items/[id([0-9]+)].svelte` hanya akan _match_ (cocok) dengan ID numerik —`/items/123` akan cocok, tetapi `/items/xyz` tidak akan cocok.

Karena keterbatasan teknis, karakter berikut tidak dapat digunakan: `/`, `\`, `?`, `:`, `(` dan `)`.