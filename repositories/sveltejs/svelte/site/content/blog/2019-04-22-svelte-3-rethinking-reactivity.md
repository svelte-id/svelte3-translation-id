---
title: Svelte 3: Memikirkan Kembali Reaktivitas
description: Akhirnya di sini
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---

Setelah beberapa bulan menjadi hanya beberapa hari lagi, kami di atas bulan untuk mengumumkan rilis stabil Svelte 3. Ini adalah rilis besar yang mewakili ratusan jam kerja oleh banyak orang di komunitas Svelte, termasuk umpan balik yang sangat berharga dari penguji beta yang telah membantu membentuk desain setiap langkah.

Kami pikir kamu akan menyukainya.


## Apa itu Svelte?

Svelte adalah kerangka kerja komponen - seperti React atau Vue - tetapi dengan perbedaan penting. Kerangka kerja tradisional memungkinkan Anda untuk menulis kode *deklaratif* yang digerakkan oleh keadaan (state), tetapi ada penaltinya: browser harus melakukan pekerjaan ekstra untuk mengubah struktur deklaratif menjadi operasi DOM, menggunakan teknik seperti [virtual DOM diffing](blog/virtual-dom-is-pure-overhead) yang memakan kerangka anggaran Anda dan mengenakan pajak kepada pengumpul sampah.

Alih-alih, Svelte bekerja pada *build time*, mengubah komponen Anda menjadi kode *imperatif* yang sangat presisi memperbarui DOM. Hasilnya, Anda dapat menulis aplikasi ambisius dengan karakteristik kinerja yang sangat baik.

Versi pertama Svelte sebenarnya hanyalah [pengujian sebuah hipotesis] (blog/frameworks-without-the-framework) - bahwa suatu kompiler yang sengaja dibuat untuk tujuan tertentu dapat menghasilkan kode solid yang memberikan pengalaman pengguna yang luar biasa. Versi yang kedua sebenarnya hanyalah peningkatan kecil yang merapikan segalanya.

Versi 3 adalah perombakan yang signifikan. Fokus kami selama lima atau enam bulan terakhir adalah memberikan *pengalaman pengembang (developer experience)* yang luar biasa. Sekarang dimungkinkan untuk menulis komponen dengan [boilerplate yang lebih sedikit secara signifikan](blog/write-less-code) daripada yang akan Anda temukan di tempat lain. Coba [tutorial](tutorial) baru dan lihat apa maksud kami - jika Anda terbiasa dengan kerangka kerja lain kami pikir Anda akan terkejut kesenangan.

Untuk memungkinkannya, pertama-tama kita perlu memikirkan kembali konsep inti kerangka kerja UI modern: reaktivitas.

<div class="max">
<figure style="max-width: 960px; margin: 0 auto">
<div style="height: 0; padding: 0 0 57.1% 0; position: relative; margin: 0 auto;">
	<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; margin: 0;" src="https://www.youtube-nocookie.com/embed/AdNJ3fydeao" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figcaption>'Rethinking Reactivity' dari <a href="https://www.israel.yglfconf.com/"> Perkemahan <i>You Gotta Love Frontend Code</i></a></figcaption>
</figure>
</div>


## Memindahkan reaktivitas ke dalam bahasa

Pada Svelte lama, Anda akan memberi tahu komputer bahwa beberapa keadaan (state) telah berubah dengan memanggil metode `this.set`:

```js
const { count } = this.get();
this.set({
	count: count + 1
});
```

Yang akan menyebabkan komponen untuk *bereaksi*.  Berbicara tentang `this.set`, metode ini hampir serupa dengan metode `this.setState` yang digunakan dalam React klasik (sebelum-<i>kait (hook)</i>):

```js
const { count } = this.state;
this.setState({
	count: count + 1
});
```

Ada beberapa perbedaan teknis yang penting (seperti yang saya jelaskan dalam video di atas, React tidak reaktif) namun secara konseptual hal tersebut adalah hal yang sama.

<aside>
	<p>Faktanya, Svelte 3 pada dasarnya adalah <a href="https://twitter.com/threepointone/status/1057179801109311488">kesalahan Si Sunil</a>.</p>
</aside>

Itu semua berubah dengan munculnya [kait](https://reactjs.org/docs/hooks-intro.html), yang menangani keadaan (state) dengan cara yang sangat berbeda. Banyak kerangka kerja mulai bereksperimen dengan implementasi kait mereka sendiri, tetapi kami dengan cepat menyimpulkan bahwa itu bukan arah yang kami ingin masuki. Kait memiliki beberapa sifat yang menarik, tetapi mereka juga melibatkan beberapa kode yang tidak wajar dan menciptakan pekerjaan yang tidak perlu bagi pengumpul sampah (<i>garbage collector</i>). Untuk kerangka kerja yang digunakan dalam [perangkat yang disematkan](https://mobile.twitter.com/sveltejs/status/1088500539640418304) serta interaktivitas yang sarat dengan animasi, hal tersebut tidaklah baik.

Jadi kami mengambil langkah mundur dan bertanya pada diri sendiri apa jenis API yang akan bekerja untuk kami... dan menyadari bahwa API yang terbaik adalah tanpa API sama sekali. Kita bisa *gunakan bahasa* saja. Memperbarui beberapa nilai `count` - dan semua hal yang bergantung padanya - seharusnya semudah ini:

```js
count += 1;
```

Karena kita adalah <i>compiler</i>, kita dapat melakukannya dengan menginstruksikan tugas di belakang layar:

```js
count += 1; $$invalidate('count', count);
```

Yang penting, kita dapat melakukan semua ini tanpa ongkos dan kerumitan menggunakan proksi atau aksesor. Itu cuma variabel.


## Penampilan Baru

Komponen Anda bukan satu-satunya hal yang mendapatkan polesan. Svelte sendiri memiliki tampilan dan nuansa yang sama sekali baru, berkat karya desain luar biasa dari [Achim Vedam] (https://vedam.de/) yang menciptakan logo dan situs web baru kami, yang telah pindah dari [svelte.technology] (https : //svelte.technology) ke [svelte.dev] (https://svelte.dev).

Kami juga telah mengubah tagline kami, dari 'Kerangka UI yang menghilang secara ajaib' menjadi 'Aplikasi web yang ditingkatkan secara sibernetik'. Svelte memiliki banyak aspek - kinerja luar biasa, ukuran bundel kecil, aksesibilitas, enkapsulasi style bawaan, transisi deklaratif, kemudahan penggunaan, fakta bahwa itu adalah kompiler, dll - yang berfokus pada salah satu aspek tersebut serasa seperti ketidakadilan bagi yang lain. 'Ditingkatkan secara sibernetik' tersebut dirancang untuk membangkitkan filosofi Svelte yang menyeluruh bahwa alat kita harus berfungsi sebagai perpanjangan cerdas dari diri kita sendiri - semoga dengan suatu gaya sentuhan retro seperti  William Gibson.


## Pemutakhiran dari Versi 2

Jika Anda adalah pengguna Svelte 2 saat ini, saya khawatir akan ada beberapa pemutakhiran manual yang terkait. Dalam beberapa hari mendatang kami akan merilis panduan migrasi dan versi terbaru [peningkatan svelte] (https://github.com/sveltejs/svelte-upgrade) yang akan melakukan yang terbaik sebisanya guna mengotomatiskan prosesnya, namun perubahan *ini* signifikan dan tidak semuanya dapat ditangani secara otomatis.

Kami tidak menganggap ini enteng: semoga setelah Anda mengalami Svelte 3 Anda akan memahami mengapa kami merasa perlu untuk memutuskan hubungan dengan masa lalu.


## Masih Akan Datang

Walaupun rilis ini melelahkan namun kami belum selesai. Kami memiliki banyak ide untuk menghasilkan kode yang lebih cerdas, lebih ringkas, dan daftar fitur panjang yang diinginkan. [Sapper](https://sapper.svelte.dev), kerangka kerja aplikasi Next.js-style kami, masih tengah diperbarui untuk menggunakan Svelte 3. [Svelte Native](https://svelte-native.technology/), yang memungkinkan Anda untuk menulis aplikasi Android dan iOS di Svelte, sedang mengalami kemajuan yang mantap namun layak mendapatkan dukungan yang lebih lengkap dari inti. Kami belum banyak memiliki ekstensi editor, sorotan sintaks, kit komponen, devtools dan sebagainya yang dimiliki oleh kerangka kerja lain dan kami harus memperbaikinya. Kami *benar-benar* ingin menambahkan dukungan TypeScript kelas-satu.

Namun pada saat ini kami berpikir bahwa Svelte 3 adalah cara terbaik untuk membangun aplikasi web. Luangkan waktu satu jam untuk melewati [tutorial](tutorial) dan kami berharap dapat meyakinkan Anda akan hal tersebut. Apa pun itu, kami senang melihat Anda di [Ruang obrolan](chat) kami dan di [GitHub](https://github.com/sveltejs/svelte) - semua orang dipersilakan, terutama kamu.