---
title: Deployment
---

Sapper dapat berjalan di mana saja yang mendukung Node 8 atau lebih tinggi.


### Men-Deploy ke Now

> Bagian ini berkaitan dengan Now 1, bukan Now 2

Kita dapat men-deploy aplikasi kita dengan mudahnya ke [Now][]:

```bash
npm install -g now
now
```

Skrip ini akan mengunggah kode sumber ke Now, di sanalah akan dijalankan `npm run build` dan `npm start` dan akan mengeluarkan URL untuk aplikasi yang di-deploy.

Untuk _hosting environment_ lainnya, kamu harus melakukan sendiri `npm run build`.

### Men-Deploy _service worker_

Sapper menghasilkan file Service Worker (`service-worker.js`) yang unik dengan adanya  timestamp pada _source code_ (yang dihitung dengan `Date.now()`).

Pada _environment_ di mana aplikasi di-_deploy_ pada multi server (semisal [Now][]), sangat disarankan untuk menggunakan _timestamp_ yang konsisten untuk semua _deployment_. Kalau ini tidak dilakukan maka para pengguna akan menghadapi masalah di mana _Service Worker_ melakukan _update_ tak disangka-sangka karena aplikasi meng-_hit_ server 1, lalu server 2, dan antara mereka selisih sedikit _timestamp_.

Untuk meng-_override_ _timestamp_ dari Sapper, kamu dapat menggunakan satu variabel _environment_ (yaitu `SAPPER_TIMESTAMP`) dan kemudian melakukan modifikasi atas  `service-worker.js`:

```js
const timestamp = process.env.SAPPER_TIMESTAMP; // tidak menggunakan `import { timestamp }`

const ASSETS = `cache${timestamp}`;

export default {
	/* ... */
	plugins: [
		/* ... */
		replace({
			/* ... */
			'process.env.SAPPER_TIMESTAMP': process.env.SAPPER_TIMESTAMP || Date.now()
		})
	]
}
```

Lalu kamu dapat mengaturnya menggunakan variabel _environment_, sebagai contoh:

```bash
SAPPER_TIMESTAMP=$(date +%s%3N) npm run build
```

Pada saat men-_deploy_ ke [Now][], kamu bisa menyampaikan (_pass_) variabel _environment_ ke dalam Now itu sendiri:

```bash
now -e SAPPER_TIMESTAMP=$(date +%s%3N)
```

[Now]: https://zeit.co/now