---
title: Preloading
---

Seperti yang terlihat di bagian [routing] (docs # Routing), komponen halaman dapat memiliki fungsi `preload` opsional yang akan memuat beberapa data yang tergantung pada halaman tersebut. Ini mirip dengan `getInitialProps` di Next.js atau` asyncData` di Nuxt.js.

```html
<script context="module">
	export async function preload(page, session) {
		const { slug } = page.params;

		const res = await this.fetch(`blog/${slug}.json`);
		const article = await res.json();

		return { article };
	}
</script>

<script>
	export let article;
</script>

<h1>{article.title}</h1>

```

Ia hidup dalam skrip `context =" module "` - lihat [tutorial] (https://svelte.dev/tutorial/module-exports) - karena ini bukan bagian dari instance komponen itu sendiri; alih-alih, ini berjalan * sebelum * komponen dibuat, memungkinkan Anda menghindari berkedip saat data diambil.

### Argumen

Fungsi `preload` menerima dua argumen -` halaman` dan `sesi`.

`page` adalah` {host, path, params, query} `objek di mana` host` adalah host URL, `path` adalah pathname-nya,` params` berasal dari `path` dan nama file rute, dan` query `adalah objek nilai dalam string kueri.

Jadi jika contoh di atas adalah `src / route / blog / [slug] .svelte` dan URL-nya adalah` / blog / some-post? Foo = bar & baz`, yang berikut ini benar:

* `page.path === '/ blog / some-post'`
* `page.params.slug === 'some-post'`
* `page.query.foo === 'bar'`
* `page.query.baz === true`

`session` dihasilkan di server dengan opsi` session` yang diteruskan ke `sapper.middleware`. Sebagai contoh:

```js
sapper.middleware({
	session: (req, res) => ({
		user: req.user
	})
})
```


### Nilai pengembalian

Jika Anda mengembalikan Janji dari `preload`, halaman akan menunda render hingga janji terselesaikan. Anda juga dapat mengembalikan objek polos. Dalam kedua kasus, nilai-nilai dalam objek akan diteruskan ke komponen sebagai alat peraga.

Ketika Sapper merender halaman pada server, ia akan mencoba membuat serialisasi nilai yang diselesaikan (menggunakan [devaluasi] (https://github.com/Rich-Harris/devalue)) dan memasukkannya pada halaman, sehingga klien tidak 'Juga perlu memanggil `preload` saat inisialisasi. Serialisasi akan gagal jika nilainya mencakup fungsi atau kelas khusus (referensi siklus dan berulang baik-baik saja, seperti built-in seperti `Date`,` Map`, `Set` dan` RegExp`).

### Konteks

Di dalam `preload`, Anda memiliki akses ke tiga metode:

* `this.fetch (url, options)`
* `this.error (statusCode, error)`
* `this.redirect (statusCode, location)`


#### this.fetch

Di browser, Anda dapat menggunakan `fetch` untuk membuat permintaan AJAX, untuk mendapatkan data dari rute server Anda (antara lain). Di server ini sedikit rumit - Anda dapat membuat permintaan HTTP, tetapi Anda harus menentukan asal, dan Anda tidak memiliki akses ke cookie. Ini berarti bahwa tidak mungkin untuk meminta data berdasarkan sesi pengguna, seperti data yang mengharuskan Anda untuk masuk.

Untuk memperbaikinya, Sapper menyediakan `this.fetch`, yang berfungsi di server maupun di klien:

```html
<script context="module">
	export async function preload() {
		const res = await this.fetch(`secret-data.json`, {
			credentials: 'include'
		});

		// ...
	}
</script>
```

Perhatikan bahwa Anda perlu menggunakan middleware sesi seperti [sesi ekspres] (https://github.com/expressjs/session) di `app / server.js` Anda untuk mempertahankan sesi pengguna atau melakukan apa pun yang melibatkan otentikasi.


#### this.error

Jika pengguna menavigasi ke `/ blog / some-invalid-slug`, kami ingin membuat halaman 404 Tidak Ditemukan. Kita bisa melakukannya dengan `this.error`:

```html
<script context="module">
	export async function preload({ params, query }) {
		const { slug } = params;

		const res = await this.fetch(`blog/${slug}.json`);

		if (res.status === 200) {
			const article = await res.json();
			return { article };
		}

		this.error(404, 'Not found');
	}
</script>
```

Hal yang sama berlaku untuk kode kesalahan lain yang mungkin Anda temui.


#### this.redirect

Anda dapat membatalkan render dan mengarahkan ke lokasi lain dengan `this.redirect`:

```html
<script context="module">
	export async function preload(page, session) {
		const { user } = session;

		if (!user) {
			return this.redirect(302, 'login');
		}

		return { user };
	}
</script>
```