---
title: API klien
---

Modul `@ sapper / app`, yang menghasilkan Sapper berdasarkan pada struktur aplikasi Anda, berisi fungsi untuk mengendalikan Sapper secara programatis dan menanggapi _event_(peristiwa).



### start ({target})

* `target` - elemen di mana halaman akan di-render

Mengkonfigurasi router dan meluncurkan aplikasi - menangkap klik pada elemen `<a>`, berinteraksi dengan API `history`, menampilkan dan memperbarui komponen Svelte.

Mengembalikan objek `Promise`, yang dieksekusi ketika halaman yang dimuat telah selesai 'hidrasi'.


```js
import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
}).then(() => {
	console.log('client-side app telah berlangsung');
});
```


### goto(href, options?)

* `href` — страница, на которую надо перейти
* `options` — может включать свойство `replaceState`, которое определяет, использовать ли `history.pushState` (по умолчанию) или `history.replaceState`. Не обязательно.

Перемещает по заданному в `href` маршруту. Если пунктом назначения является маршрут Sapper, то Sapper перехватит и отработает перемещение, в ином случае страница будет просто перезагружена с новым `href`. Иначе говоря, это ничем не отличается от поведения, когда пользователь просто кликает по ссылке с таким-же `href` атрибутом.

Возвращает объект `Promise`, который разрешается, когда перемещение будет завершено.

### prefetch(href)

* `href` — страница для упреждающей загрузки

Выполняет упреждающую загрузку указанной страницы, что означает: а) обеспечение полной загрузки кода для страницы и б) вызов метода `preload` страницы с соответствующими параметрами. Это поведение, аналогично случаю, когда пользователь тапает или в проводит курсором над элементом `<a>` с установленным атрибутом [rel=prefetch](docs#Uprezhdayushhaya_zagruzka).

Возвращает объект `Promise`, который разрешается, когда упреждающая загрузка будет завершена.

### prefetchRoutes(routes?)

* `routes` —  массив строк, маршрутов для упреждающей загрузки. Не обязательно.

Выполняет упреждающую загрузку кода для маршрутов, которые ещё не были загружены до этого. Обычно вызывается после завершения `sapper.start()`, чтобы ускорить последующую навигацию (это реализует букву 'L' в [PRPL шаблоне](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)).  Вы можете указать маршруты по любому подходящему пути, например, `/about` (для  `src/routes/about.svelte`) или `/blog/*` (для `src/routes/blog/[slug].svelte`). В отличие от `prefetch`, это не вызовет функцию `preload` для каждой из загружаемых страниц.  Вызов функции без аргументов приведёт к тому, что будут загружены все маршруты.

Возвращает объект `Promise`, который разрешается, когда упреждающая загрузка всех маршрутов будет завершена.