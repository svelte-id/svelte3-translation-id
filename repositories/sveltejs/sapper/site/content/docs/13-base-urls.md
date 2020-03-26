---
title: Basis URL 
---

Biasanya, root dari aplikasi Sapper Anda disajikan di `/`. Tetapi dalam beberapa kasus, aplikasi Anda mungkin perlu dilayani dari jalur basis yang berbeda - misalnya, jika Sapper hanya mengontrol bagian dari domain Anda, atau jika Anda memiliki beberapa aplikasi Sapper yang hidup berdampingan.

Ini bisa dilakukan seperti berikut ini:

```js
// app/server.js

express() // atau Polka, atau framework serupa
	.use(
		'/my-base-path', // <!-- tambahkan baris ini
		compression({ threshold: 0 }),
		serve('static'),
		sapper.middleware()
	)
	.listen(process.env.PORT);
```

Sapper akan mendeteksi jalur dasar dan mengkonfigurasi router sisi-server dan sisi-klien yang sesuai.

Jika Anda [mengekspor](docs#Pengeksporan) aplikasi Anda, Anda harus memberi tahu dari mana posisi mulai bergerak:

```bash
sapper export --basepath my-base-path
```
