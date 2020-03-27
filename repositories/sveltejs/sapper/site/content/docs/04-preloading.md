---
title: Preloading
---

Seperti yang terlihat pada bagian [rute](docs#Rute), komponen halaman dapat memiliki fungsi `preload` opsional yang akan memuat beberapa data yang dibutuhkan oleh halaman tersebut. Mirip seperti `getInitialProps` pada Next.js atau` asyncData` pada Nuxt.js.

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

Ia hadir dalam skrip `context ="module"` - lihat [tutorial] (https://svelte.dev/tutorial/module-exports) - karena ini bukan bagian dari instans komponen itu sendiri; alih-alih, ini berjalan *sebelum* komponen tercipta, memungkinkan Anda menghindari kedipan (_flash_) saat data diambil.

### Argumen

Fungsi `preload` menerima dua argumen parameter -`page` dan `session`.

`page` adalah `{host, path, params, query}` objek di mana 
- `host` adalah host URL;
- `path` adalah nama _path_-nya;
- `params` berasal dari `path` dan nama file rute, dan
- `query`adalah suatu objek nilai dalam string kueri.

Jadi jika contoh di atas adalah `src/route/blog/[slug].svelte` dan URL-nya adalah`/blog /some-post?Foo=bar&baz`, yang berikut ini benar:

* `page.path === '/blog/some-post'`
* `page.params.slug === 'some-post'`
* `page.query.foo === 'bar'`
* `page.query.baz === true`

`session` terbentuk pada server dengan opsi `session` yang diteruskan sampai kepada `sapper.middleware`. Sebagai contoh:

```js
sapper.middleware({
	session: (req, res) => ({
		user: req.user
	})
})
```


### Nilai Pengembalian

Apabila `preload` kamu menghasilkan suatu _promise_ maka proses _render_ halaman akan mengalami _delay_ sampai _promise_ terselesaikan. Dimungkinkan juga `preload` menghasilkan objek polos (_plain_). Pada kedua kemungkinan tersebut nilai-nilai pada objek akan diteruskan sampai ke dalam komponen-komponen sebagai properti.

Ketika Sapper me-_render_ suatu halaman pada server, Sapper akan mencoba melakukan serialisasi nilai yang telah terselesaikan (_resolved value_) menggunakan [devaluasi] (https://github.com/Rich-Harris/devalue) dan memasukkannya pada halaman, sehingga klien tidak perlu juga memanggil `preload` pada saat inisialisasi. Serialisasi akan gagal apabila nilai tersebut berupa fungsi atau kelas khusus. Sedangkan serialisasi untuk referensi siklis dan berulang akan baik-baik saja sebagaimana nilai bawaan (_built-in_) seperti `Date`,`Map`, `Set` dan `RegExp`).

### Konteks

Di dalam `preload`, kamu memiliki akses ke tiga metode:

* `this.fetch (url, options)`
* `this.error (statusCode, error)`
* `this.redirect (statusCode, location)`


#### this.fetch

Kamu dapat menggunakan `fetch` untuk membuat permintaan AJAX pada _browser_, antara lain untuk mendapatkan data dari rute server. Pada server hal ini agak sedikit rumit - kamu dapat membuat permintaan HTTP, tetapi kamu harus menentukan suatu asal (_origin_), dan kamu _khan_ tidak memiliki akses ke _cookie_ _ya_, jadi artinya tidak mungkin kamu meminta data berdasarkan sesi pengguna, sebagaimana halnya data-data yang mewajibkan kamu untuk _login_ terlebih dahulu.

Untuk memperbaikinya, Sapper menyediakan `this.fetch` yang berfungsi pada server maupun klien:

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

Perhatikan bahwa kamu perlu menggunakan _middleware_ sesi seperti [sesi express] (https://github.com/expressjs/session) pada `app/server.js` untuk mempertahankan sesi pengguna atau melakukan apa saja terkait otentikasi.


#### this.error

Apabila pengguna melakukan navigasi ke `/blog/some-invalid-slug`, maka kita perlu me-_render_ suatu halaman *404 Tidak Ditemukan*. Kita dapat membuatnya dengan `this.error`:

```html
<script context="module">
	export async function preload({ params, query }) {
		const { slug } = params;

		const res = await this.fetch(`blog/${slug}.json`);

		if (res.status === 200) {
			const article = await res.json();
			return { article };
		}

		this.error(404, 'Tidak ditemukan');
	}
</script>
```

Hal serupa berlaku untuk kode kesalahan lain yang mungkin kamu hadapi.


#### this.redirect

Kamu dapat membatalkan proses _render_ dan mengarahkan ulang (_redirect_) ke lokasi lain dengan `this.redirect`:

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