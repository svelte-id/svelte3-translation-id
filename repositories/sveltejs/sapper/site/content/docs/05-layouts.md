---
title: Tata Letak
---

Sejauh ini, kami telah memperlakukan halaman sebagai komponen yang sepenuhnya berdiri sendiri - setelah navigasi, komponen yang ada akan dihancurkan, dan yang baru akan menggantikannya.

Tetapi di banyak aplikasi, ada elemen yang harus terlihat di *setiap* halaman, seperti navigasi tingkat atas atau catatan kaki. Alih-alih mengulanginya di setiap halaman, kita dapat menggunakan komponen *layout*.

Untuk membuat komponen tata letak yang berlaku untuk setiap halaman, buat file bernama `src/routes/_layout.svelte`. Komponen tata letak default (yang digunakan Sapper jika Anda tidak membawa sendiri) terlihat seperti ini ...

```html
<slot></slot>
```

... tetapi kita dapat menambahkan markup, gaya, dan perilaku apa pun yang kita inginkan. Misalnya, mari kita tambahkan bilah nav:

```html
<!-- src/routes/_layout.svelte -->
<nav>
	<a href=".">Home</a>
	<a href="about">About</a>
	<a href="settings">Settings</a>
</nav>

<slot></slot>
```

Jika kita membuat halaman untuk `/`, `/about` dan `/settings` ...

```html
<!-- src/routes/index.svelte -->
<h1>Home</h1>
```

```html
<!-- src/routes/about.svelte -->
<h1>About</h1>
```

```html
<!-- src/routes/settings.svelte -->
<h1>Settings</h1>
```

... nav akan selalu terlihat, dan mengklik di antara tiga halaman hanya akan menghasilkan `<h1>` diganti.


### Rute Bersarang

Misalkan kita tidak hanya memiliki satu halaman `/settings`, tetapi sebaliknya memiliki halaman bersarang seperti `/settings/profil` dan `/settings/notifications` dengan submenu bersama (untuk contoh kehidupan nyata, lihat [github. com / settings] (https://github.com/settings)).

Kita dapat membuat tata letak yang hanya berlaku untuk halaman di bawah `/settings` (sambil mewarisi tata letak root dengan nav tingkat atas):

```html
<!-- src/routes/settings/_layout.svelte -->
<h1>Settings</h1>

<div class="submenu">
	<a href="settings/profile">Profile</a>
	<a href="settings/notifications">Notifications</a>
</div>

<slot></slot>
```

Komponen tata letak menerima properti `segment` yang berguna untuk hal-hal seperti styling:

```diff
+<script>
+	export let segment;
+</script>
+
<div class="submenu">
-	<a href="settings/profile">Profile</a>
-	<a href="settings/notifications">Notifications</a>
+	<a
+		class:selected={segment === "profile"}
+		href="settings/profile"
+	>Profile</a>
+
+	<a
+		class:selected={segment === "notifications"}
+		href="settings/notifications"
+	>Notifikasi</a>
</div>
```