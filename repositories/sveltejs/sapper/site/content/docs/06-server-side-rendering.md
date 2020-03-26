---
title: rendering sisi server
---

Sapper, secara default, menjadikan sisi server terlebih dahulu (SSR), dan kemudian memasang kembali elemen dinamis apa pun pada klien. Svelte menyediakan [dukungan luar biasa untuk ini] (https://svelte.dev/docs#Server-side_component_API). Ini memiliki manfaat dalam kinerja dan pengindeksan mesin pencari, antara lain, tetapi hadir dengan kerumitannya sendiri.

### Membuat komponen SSR kompatibel

Sapper bekerja dengan baik dengan sebagian besar perpustakaan pihak ketiga yang mungkin Anda temui. Namun, kadang-kadang, pustaka pihak ketiga dibundel dengan cara yang memungkinkannya bekerja dengan beberapa pemuat modul yang berbeda. Terkadang, kode ini menciptakan ketergantungan pada `window`, seperti memeriksa keberadaan` window.global` mungkin dilakukan.

Karena tidak ada `window` di lingkungan sisi server seperti Sapper, tindakan hanya mengimpor modul tersebut dapat menyebabkan impor gagal, dan menghentikan server Sapper dengan kesalahan seperti:

```bash
ReferenceError: window is not defined
```

Cara untuk mengatasi ini adalah dengan menggunakan impor dinamis untuk komponen Anda, dari dalam fungsi `onMount` (yang hanya dipanggil pada klien), sehingga kode impor Anda tidak pernah dipanggil di server.

```html
<script>
	import { onMount } from 'svelte';

	let MyComponent;

	onMount(async () => {
		const module = await import('my-non-ssr-component');
		MyComponent = module.default;
	});
</script>

<svelte:component this={MyComponent} foo="bar"/>
```