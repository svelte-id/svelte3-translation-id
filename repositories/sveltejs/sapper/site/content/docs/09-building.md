---
title: Proses Building
---

Sampai sekarang kami telah menggunakan `sapper` untuk membangun aplikasi kami dan menjalankan server pengembangan. Tetapi ketika menyangkut produksi, kami ingin membuat hasil mandiri yang teroptimalkan.

### hasil _build_ sapper

Perintah ini mengemas aplikasi Anda ke dalam direktori `__sapper __/build`. (Anda dapat mengubahnya ke direktori khusus, serta mengendalikan berbagai opsi lain - lakukan `build sapper --help` untuk informasi lebih lanjut.)

Output-nya adalah aplikasi Node yang dapat Anda jalankan dari _root_ proyek:

```bash
node __sapper__/build
```