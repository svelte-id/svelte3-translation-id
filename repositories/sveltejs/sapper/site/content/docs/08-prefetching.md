---
title: Prefetching
---

Sapper menggunakan pemisahan kode untuk memecah aplikasi Anda menjadi potongan-potongan kecil (satu per rute), memastikan waktu _startup_ yang cepat.

Untuk *rute dinamis*, seperti contoh `src/route/blog/[slug].svelte` kami, itu tidak cukup. Untuk merender posting blog, kita perlu mengambil data untuk itu, dan kita tidak bisa melakukan itu sampai kita tahu apa `slug` itu. Dalam kasus terburuk, itu dapat menyebabkan kelambatan saat browser menunggu data kembali dari server.


### rel=prefetch

Kita dapat melakukan mitigasi dengan *menjemput* (_prefetch_) data. Menambahkan atribut `rel=prefetch` ke tautan ...

```html
<a rel=prefetch href='blog/what-is-sapper'> Apa itu Sapper? </a>
```

... akan menyebabkan Sapper menjalankan fungsi `preload` halaman begitu pengguna melayang di atas tautan (pada desktop) atau menyentuhnya (di seluler), alih-alih menunggu _event_ `klik` untuk memicu navigasi. Biasanya, ini memberi kita beberapa ratus milidetik tambahan, yang merupakan perbedaan antara antarmuka pengguna yang terasa lamban, dan yang terasa tajam.

> `rel=prefetch` adalah idiom Sapper, bukan atribut standar untuk elemen `<a>`

<! - TODO menambahkan fungsi untuk membuat prefetch secara terprogram ->