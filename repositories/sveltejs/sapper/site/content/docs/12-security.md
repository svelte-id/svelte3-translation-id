---
title: Keamanan
---

Secara bawaan (_default_), Sapper tidak menambahkan _security header_ pada aplikasi Anda, tapi kamu bisa menambahkan sendiri menggunakan _middleware_ seperti [Helmet][].

### Kebijakan Keamanan Konten/ _Content Security Policy_ (CSP)

Sapper men-generate  `<script>` _inline_, yang bisa gagal tereksekusi apabila header [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)  tidak mengizinkan eksekusi sembarang _script_`	(`unsafe-inline`).

Untuk mengatasi hal ini, Sapper dapat meng-_inject_ [nonce](https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/) yang dapat dikonfigurasi dengan _middleware_ untuk mengeluarkan _header CSP_ yang tepat. Berikut ini adalah contoh menggunakan [Express][] dan [Helmet][]:

```js
// server.js
import uuidv4 from 'uuid/v4';
import helmet from 'helmet';

app.use((req, res, next) => {
	res.locals.nonce = uuidv4();
	next();
});
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			scriptSrc: [
				"'self'",
				(req, res) => `'nonce-${res.locals.nonce}'`
			]
		}
	}
}));
app.use(sapper.middleware());
```

Menggunakan `res.locals.nonce` dengan cara demikian menuturi konvensi yang diatur oleh 
[Dokumentasi CSP Helmet](https://helmetjs.github.io/docs/csp/#generating-nonces).

[Express]: https://expressjs.com/
[Helmet]: https://helmetjs.github.io/