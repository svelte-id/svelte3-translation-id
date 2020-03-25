---
title: Format Komponen
---

---

Komponen adalah _building block_ semua aplikasi dalam __framework__ Svelte. Komponen tersebut dijabarkan dalam sebuah file yang berakhiran `.svelte` menggunakan superset dari bahasa markup HTML.

Ketiga unsur - script, style, dan markup - adalah opsional.

```html
<script>
	// Logikanya dijelaskan di sini
</script>

<style>
	/* style harus ada di sini */
</style>

<!-- markup (0 elemen atau lebih) ditempatkan di sini -->
```

### &lt;script&gt;

blok `<script>` berisi JavaScript yang dijalankan saat komponen dibuat. Variabel yang dideklarasikan (atau diimpor) di blok ini akan 'tampak' dari komponen markup. Ada empat aturan tambahan:

##### 1. `export` mendeklarasikan properti komponen

---

Svelte использует ключевое слово `export`, чтобы пометить объявление переменной как *свойство*, что означает, что оно становится доступным извне всему, что будет использовать этот компонент (см. раздел [Атрибуты и свойства](docs#Atributy_i_svojstva) для дополнительной информации).

Svelte memakai kata kunci `export` untuk menandai deklarasi variabel sebagai *property *, yang artinya properti ini menjadi dapat diakses dari luar oleh semua yang akan menggunakan kompenen ini (lihat [Atribut dan Properti] (docs # attribut_properti) untuk informasi lebih lanjut) .

```html
<script>
	export let foo;

	// nilai variabel yang dideklarasikan sebagai properti,
	// tersedia seketika
	console.log({ foo });
</script>
```

---
Kamu bisa menentukan nilai _default_ yang akan terpakai pada saat ada komponen konsumen (_consumer component_) yang menggunakan properti tersebut.
Dalam modus pengembangan (lihat [opsi kompilasi] (docs # svelte_compile)), apabila konsumen tidak menentukan nilai properti dan tidak ada nilai _default_, maka peringatan kesalahan akan muncul. Untuk mencegah munculnya kesalahan, pastikan bahwa properti diatur ke nilai _default_, meskipun nilai _default_ itu sama dengan `undefined` (tidak terdefinisi).

```html
<script>
	export let bar = 'nilai default opsional';
	export let baz = undefined;
</script>
```

---

Properti yang ditandai dengan kata kunci `const`,` class` atau `function` pada saat diekspor ke luar akan bersifat _read-only_. Properti berupa *function* akan menjadi properti umum.


```html
<script>
	// read-only
	export const thisIs = 'readonly';

	export function greet(name) {
		alert(`hello ${name}!`);
	}

	// properti umum
	export let format = n => n.toFixed(2);
</script>
```

---

Dimungkinkan menggunakan _reserved word_ sebagai nama properti.

```html
<script>
	let className;

	// membuat properti dengan nama  `class`, 
	// yang adalah reserved word dalam JS
	export { className as class };
</script>
```

##### 2. _Assignment_ 'Reaktif'

---

Untuk mengubah status sebuah komponen dan mulai menggambar kembali caranya mudah hanya dengan cara memberikan assignment pada sebuah variabel yang dideklarasikan secara lokal.

Assignment dengan _update_ (`count += 1`) dan _assignment_ properti (`obj.x = y`) akan memberikan hasil yang sama.

Oleh karena sifat reaktivitas Svelte didasarkan pada _assignment_, penggunaan metode _array_ seperti `.push()` dan `.splic()` tidak akan meng-_update_ secara otomatis namun kamu bisa cari tahu bagaimana cara mengatasi keterbatasan ini dalam [tutorial](tutorial/updating-arrays-and-objects).

```html
<script>
	let count = 0;

	function handleClick () {
		// memanggil fungsi ini akan meng-update komponen,
		// apabila dalam markup-nya ada link ke `count`
		count = count + 1;
	}
</script>
```

##### 3. `$:` Membuat Ekspresi Menjadi Reaktif

---
Ekspresi apapun yang berada pada level teratas (maksudnya yang tidak berada di dalam blok atau di dalam fungsi) dapat dibuat menjadi bersifat reaktif dengan cara menambahkan label `$:` di depannya. [JS Label](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Statements/label). Ekspresi yang bersifat reaktif diluncurkan seketika saat sebelum komponennya ter-update ketika nilai variabel yang tercakup dalamnya berubah. 

```html
<script>
	export let title;

	// pada saat properti `title` berubah,
	// ekspresi berikut ini akan memperbarui `document.title`
	$: document.title = title;

	$: {
		console.log(`kamu bisa menggabungkan beberapa ekspresi dalam satu blok`);
		console.log(`title saat ini: ${title}`);
	}
</script>
```

---

Apabila suatu ekspresi belum dideklarasikan sebelumnya maka Svelte akan secara mandiri mendeklarasikan variabel tersebut melalui variabel sebelumnya yang dideklarasikan dengan pernyataan `let`.

```html
<script>
	export let num;

	// tidak perlu mendeklarasikan `squared` dan` cubed`,
	// Svelte akan melakukannya untuk kita
	$: squared = num * num;
	$: cubed = squared * num;
</script>
```

##### 4. Tambahkan Awalan `$` pada Repositori untuk Mendapatkan Nilainya

---
Repositori adalah segala macam objek yang _value_ (nilai)-nya dapat diakses secara reaktif melalui * kontrak repositori *.

[Modul `svelte / store`] (docs # svelte_store) berisikan implementasi minimum _storage_ (penyimpanan) atas kontrak tersebut.

Setiap saat kamu perlu mengambil sebuah _value_ (nilai) dari repositori, kamu dapat melakukannya dengan cara menambahkan awalan bersimbol `$`. Simbol ini memberitahukan kepada Svelte untuk mendeklarasikan variabel berawalan dan men-_subscribe_ variabel pada repositori yang dapat melakukan penghapusan otomatis bila diperlukan.

Memberikan penunjukan nilai menggunakan awalan `$` ini membuat variabel harus berlaku sebagai repositori yang _writable_ dan repositori ini akan menghasilkan nilai saat dipanggil dengan metode  `.set`.

Catatlah bahwa repositori harus dideklarasikan pada level teratas komponen dan bukan di dalam sebuah fungsi atau di dalam blok `if`.

Variabel lokal (yang tidak menunjuk kepada repositori) * tidak boleh* berawalan `$`.

```html
<script>
	import { writable } from 'svelte/store';

	const count = writable(0);
	console.log($count); // akan menghasilkan 0

	count.set(1);
	console.log($count); // akan menghasilkan 1

	$count = 2;
	console.log($count); // akan menghasilkan 2
</script>
```

##### Kontrak Penyimpanan

```js
store = { subscribe: (subscription: (value: any) => void) => () => void, set?: (value: any) => void }
```

Kamu dapat memilih opsi sendiri untuk repositori tanpa mengikutsertakan [`svelte / store`] (docs # svelte_store) dengan mengimplementasikan * kontrak repositori *::

1. Repository harus memiliki metode `.subscribe`, dengan fungsi _subscription_ sebagai argumennya. Saat menggunakan metode ini, fungsi subscription harus dipanggil segera dengan memberikan nilai _storage value_ padanya. Selanjutnya, semua fungsi subscription functions yang diterima harus dipanggil secara _synchronous_ terhadap setiap perubahan yang ada dalam nilai _storage_.
2. Metode `.subscribe` harus mengembalikan (_return_) fungsi _unsubscribe_. Panggilan terhadap fungsi _cancel_ harus membuat fungsi _subscription_ tidak lagi dipanggil oleh  repositori.
3. * Opsional *, repositori dapat memiliki metode `.set`, dengan parameter nilai baru untuk repositori dan secara synchronous memanggil semua fungsi _subscription_ yang sedang aktif. _Storage_ yang demikian disebut * _recordable storage_ *. 

Untuk memastikan kompatibilitas dengan observabel RxJS, metode `.subscribe()` dapat mengembalikan (_return_) objek yang memiliki metode `.unsubscribe()` dan tidak harus langsung menghasilkan fungsi _unsubscribe_. Namun apabila metode `.subscribe` memanggil _subscription_ secara _asynchronous_ (spesifikasi Observabel memang mengizinkan hal ini), Svelte akan menganggap nilai _storage_ sebagai `undefined` sampai panggilan terhadap metode ini berhenti. 

---


### &lt;script context="module"&gt;

---

Blok `<script>` yang mengandung atribut `context ="module"` tereksekusi hanya sekali selama proses awal modul, dan bukan setiap kali instans komponen terinisialisasi. Nilai yang dideklarasikan pada blok ini tersedia dalam markup komponen dan dalam blok `<script>` (tetapi tidak sebaliknya).

Segala sesuatu yang diekspor dari blok tersebut menggunakan operator `export` akan menjadi terekspor dari _compiled module_ itu sendiri.

Kamu tidak bisa membuat `export default` karena default ekspor adalah komponen itu sendiri.

> Variabel yang dideklarasikan pada blok `context =" module "` tidak bersifat reaktif, jadi memberikan nilai baru tidak akan memberi pengaruh perubahan pada komponen, meskipun nilai variabelnya sendiri berubah. Untuk nilai yang memang ditujukan untuk digunakan pada beberapa komponen, sebaiknya menggunakan [_storage_](docs#svelte_store).


```html
<script context="module">
	let totalComponents = 0;

	// contoh berikut kamu nantinya dapat mengimpor fungsi di lain tempat yang tepat:
	// `import Example, { alertTotal } from './Example.svelte'`
	export function alertTotal() {
		alert(totalComponents);
	}
</script>

<script>
	totalComponents += 1;
	console.log(`untuk komponen ini terbentuk sejumlah ${totalComponents} contoh`);
</script>
```


### &lt;style&gt;

---

CSS style di dalam blok <style> akan terisolasi di dalam komponen ini.

Ini bisa terjadi karena penambahan _class_ pada semua elemen terdampak memiliki nama _class_ yang berasal dari fungsi hash dari style komponen itu (contohnya `svelte-123xyz`).

```html
<style>
	p {
		/* ini hanya akan berdampak pada element <p> dalam komponen ini */
		color: burlywood;
	}
</style>
```

---

Untuk mengaplikasikan _style_ pada _selector_ secara global, gunakan _modifier_ `:global(...)`.

```html
<style>
	:global(body) {
		/* style untuk <body> */
		margin: 0;
	}

	div :global(strong) {
		/* style ini akan berlaku untuk semua element <strong> 
		   di semua komponen yang berada di dalam 
	       elemen <div> dari komponen ini */
		color: goldenrod;
	}
</style>
```

---

Apabila kamu hendak membuat animasi @keyframes global, tambahkanlah awalan `-global-` pada nama animasi.
Awalan nama `-global-` akan terhapus pada saat kompilasi dan untuk mengakses animasi tersebut di mana saja dalam kode kamu cukup memanggil dengan nama tanpa awalan tersebut.

```html
<style>
	@keyframes -global-my-animation-name {...}
</style>
```
