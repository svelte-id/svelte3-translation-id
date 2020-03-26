---
title: Store
---

Nilai `page` dan` session` yang diteruskan ke fungsi `preload` tersedia untuk komponen sebagai [store] (https://svelte.dev/tutorial/writable-stores), bersama dengan` preloading`.

Di dalam komponen, dapatkan referensi ke toko-toko seperti:

```html
<script>
	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
</script>
```

* `preloading` berisi nilai boolean yang hanya bisa dibaca, menunjukkan apakah suatu navigasi sedang menunggu atau tidak
* `page` berisi objek` {host, path, params, query} `readonly, identik dengan yang dilewatkan ke fungsi` preload`
* `session` berisi data apa pun yang diunggah di server. Ini adalah [penyimpanan yang dapat ditulis] (https://svelte.dev/tutorial/writable-stores), artinya Anda dapat memperbaruinya dengan data baru (misalnya, setelah pengguna masuk) dan aplikasi Anda akan di-refresh.


### _Seeding_ Data sesi

Di server, Anda dapat mengisi `session` dengan mengirimkan opsi ke` sapper.middleware`:

```js
// src/server.js
express() // atau Polka, atau framework lain yang serupa
	.use(
		serve('static'),
		authenticationMiddleware(),
		sapper.middleware({
			session: (req, res) => ({
				user: req.user
			})
		})
	)
	.listen(process.env.PORT);
```

> Data sesi harus dapat diserialisasi (menggunakan [devaluasi] (https://github.com/Rich-Harris/devalue)) - tidak ada fungsi atau kelas khusus, hanya tipe data JavaScript bawaan