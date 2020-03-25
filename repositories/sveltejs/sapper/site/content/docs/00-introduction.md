---
title: Pendahuluan
---

###  Pemberitahuan penting

> Sapper masih pada tahap awal pengembangan, dan beberapa hal mungkin berubah sebelum kita bisa merilis 1.0. Dokumen ini masih dalam penyelesaian. Jika Anda memiliki pertanyaan, hubungi [saluran Telegram] berbahasa Indonesia untuk mendapatkan bantuan(https://t.me/svelte_id_).
>
> Baca [Panduan Migrasi](migrating) untuk membantu memutakhirkan dari versi yang lebih lama.

### Apa itu Sapper?

Sapper — adalah kerangka kerja pembuat aplikasi web yang sangat produktif. Kamu sedang melihatnya sekarang! Inilah dua prinsip utama kami.:

* Setiap halaman aplikasi Anda adalah komponen [Svelte](https://svelte.dev)
* Anda membuat halaman baru dengan menambahkan komponen ke direktori `src / route` proyek Anda. Mereka akan di-_render_ di server, sehingga waktu pemuatan aplikasi pengguna akan secepat mungkin, dan hanya kemudian aplikasi klien akan mengambil alih kendali.

Membuat aplikasi yang sesuai dengan tren modern terbaik, seperti pemisahan kode, dukungan untuk mode offline, hidrasi adalah tugas yang sangat sulit. Sapper melakukan semua hal membosankan ini untuk Anda sehingga Anda dapat berkonsentrasi hanya pada bagian kreatif.

Untuk memahami panduan ini, mengetahui Svelte tidak diperlukan, tetapi diinginkan. Svelte adalah kerangka kerja yang mengkompilasi komponen Anda menjadi JavaScript vanilla yang sangat dioptimalkan. Baca [artikel blog pengantar](https://svelte.dev/blog/svelte-3-rethinking-reactivity) dan [tutorial](https://svelte.dev/tutorial), untuk mempelajari lebih lanjut tentangnya.

### Откуда такое название?

В армии есть солдаты, которые занимаются разминированием — *сапёры*. В американской армии тоже есть *sappers*, но их сфера деятельности намного шире — кроме разминирования, они ещё в боевых условиях строят мосты, ремонтируют дороги  и проводят сносы.

Для веб-разработчиков ставки, как правило, ниже, чем для военных инженеров. Но у нас тоже есть враги с которыми мы должны бороться: недостаточно мощные устройства, медленные сетевые подключения и общая сложность проектирования интерфейсов. Sapper (скоращение от <b>S</b>velte <b>app</b> mak<b>er</b>) — это ваш мужественный и исполнительный солдат.

### Сравнение с Next.js

[Next.js](https://github.com/zeit/next.js) — это фреймворк для React от [Zeit](https://zeit.co) и он является источником вдохновения для Sapper. Однако между ними есть несколько заметных отличий:

* Sapper работает на Svelte, а не на React, поэтому он быстрее и приложения получаются меньше по размеру
* Вместо маски маршрута мы используем описание параметров маршрута в именах файлов (см. Раздел [Маршруты](docs#Marshruty) ниже)
* *Серверные* маршруты создаются точно так же, как и маршруты обычных *страниц* в директории `src/routes`. Например, это позволяет очень просто добавить точку входа для JSON API, такую же как есть на этой странице (попробуйте —  [/docs.json](/docs.json))
* Ссылки — это обычные элементы `<a>`, а не специальные компоненты вроде `<Link>`. Это означает, например, что [эта ссылка](/), прекрасно работает с маршрутизатором, даже не смотря на то, что она изначально располагается в импортированном документе с markdown разметкой.

### Начало работы

Самый простой способ начать создавать приложение Sapper — скопировать к себе на компьютер репеозиторий шаблона [sapper-template](https://github.com/sveltejs/sapper-template) при помощи утилиты [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit "sveltejs/sapper-template#rollup" my-app
# или: npx degit "sveltejs/sapper-template#webpack" my-app
cd my-app
npm install
npm run dev
```

Это создаст новый проект в каталоге `my-app`, установит его зависимости и запустит сервер на [localhost:3000](http://localhost:3000). Попробуйте поредактировать файлы, чтобы увидеть, насколько всё просто работает — быть может вам вообще не понадобиться читать оставшуюся часть этого руководства!
