---
title: Kerangka Tak Berkerangka: Mengapa Tak Terpikirkan Sejak Dahulu?
description: Kamu tak bisa menulis aplikasi serius dengan vanilla JavaScript tanpa menabrak tembok kerumitan. Namun sebuah compiler dapat melakukannya untukmu.
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---

> Tunggu, kerangka kerja baru ini punya *runtime*? Ugh. Terima kasih, saya akan lewatkan.
> **– pengembang front end di tahun 2018**

Kita mengirimkan terlalu banyak kode kepada para pengguna kita. Sebagaimana banyak para pengembang front end, saya telah berada dalam penyangkalan mengenai fakta tersebut, dengan berpikir bahwa baik-baik saja untuk melayankan 100kb JavaScript saat halaman dimuat – hanya memakai [one less .jpg!](https://twitter.com/miketaylr/status/227056824275333120) – dan bahwa hal yang paling **penting** adalah kinerja saat aplikasi Anda sudah interaktif.

Tetapi saya salah. 100kb .js tidaklah setara dengan 100kb .jpg. Bukan hanya waktu dalam jaringan yang membantai kinerja _startup_ aplikasi Anda, tetapi juga waktu yang dihabiskan melakukan _parsing_ dan mengevaluasi _script_ Anda, yang seketika itu membuat _browser_ menjadi tidak responsif. Apalagi di ponsel, milidetik terakumulasi dengan sangat cepat.

Apabila Anda tidak yakin bahwa hal ini adalah masalah, coba follow [Alex Russell](https://twitter.com/slightlylate) pada Twitter. Alex [tidak banyak kawan dalam komunitas framework akhir-akhir ini](https://twitter.com/slightlylate/status/728355959022587905), tapi dia tidak salah. Namun alternatif yang diajukan untuk menggunakan kerangka kerja seperti Angular, React dan Ember – [Polymer](https://www.polymer-project.org/1.0/) – masih saja tidak banyak yang mendukungnya di dunia front end meskipun hal tersebut bukan karena kurangnya pemasaran.

Barangkali kita perlu memikirkan kembali semuanya.


## Permasalahan apakah yang _sesungguhnya_ diselesaikan oleh framework?

The common view is that frameworks make it easier to manage the complexity of your code: the framework abstracts away all the fussy implementation details with techniques like virtual DOM diffing. But that's not really true. At best, frameworks *move the complexity around*, away from code that you had to write and into code you didn't.

Instead, the reason that ideas like React are so wildly and deservedly successful is that they make it easier to manage the complexity of your *concepts*. Frameworks are primarily a tool for structuring your thoughts, not your code.

Given that, what if the framework *didn't actually run in the browser*? What if, instead, it converted your application into pure vanilla JavaScript, just like Babel converts ES2016+ to ES5? You'd pay no upfront cost of shipping a hefty runtime, and your app would get seriously fast, because there'd be no layers of abstraction between your app and the browser.


## Introducing Svelte

Svelte is a new framework that does exactly that. You write your components using HTML, CSS and JavaScript (plus a few extra bits you can [learn in under 5 minutes](https://v2.svelte.dev/guide)), and during your build process Svelte compiles them into tiny standalone JavaScript modules. By statically analysing the component template, we can make sure that the browser does as little work as possible.

The [Svelte implementation of TodoMVC](http://svelte-todomvc.surge.sh/) weighs 3.6kb zipped. For comparison, React plus ReactDOM *without any app code* weighs about 45kb zipped. It takes about 10x as long for the browser just to evaluate React as it does for Svelte to be up and running with an interactive TodoMVC.

And once your app *is* up and running, according to [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) **Svelte is fast as heck**. It's faster than React. It's faster than Vue. It's faster than Angular, or Ember, or Ractive, or Preact, or Riot, or Mithril. It's competitive with Inferno, which is probably the fastest UI framework in the world, for now, because [Dominic Gannaway](https://twitter.com/trueadm) is a wizard. (Svelte is slower at removing elements. We're [working on it](https://github.com/sveltejs/svelte/issues/26).)

It's basically as fast as vanilla JS, which makes sense because it *is* vanilla JS – just vanilla JS that you didn't have to write.


## But that's not the important thing

Well, it *is* important – performance matters a great deal. What's really exciting about this approach, though, is that we can finally solve some of the thorniest problems in web development.

Consider interoperability. Want to `npm install cool-calendar-widget` and use it in your app? Previously, you could only do that if you were already using (a correct version of) the framework that the widget was designed for – if `cool-calendar-widget` was built in React and you're using Angular then, well, hard cheese. But if the widget author used Svelte, apps that use it can be built using whatever technology you like. (On the TODO list: a way to convert Svelte components into web components.)

Or [code splitting](https://twitter.com/samccone/status/797528710085652480). It's a great idea (only load the code the user needs for the initial view, then get the rest later), but there's a problem – even if you only initially serve one React component instead of 100, *you still have to serve React itself*. With Svelte, code splitting can be much more effective, because the framework is embedded in the component, and the component is tiny.

Finally, something I've wrestled with a great deal as an open source maintainer: your users always want *their* features prioritised, and underestimate the cost of those features to people who don't need them. A framework author must always balance the long-term health of the project with the desire to meet their users' needs. That's incredibly difficult, because it's hard to anticipate – much less articulate – the consequences of incremental bloat, and it takes serious soft skills to tell people (who may have been enthusiastically evangelising your tool up to that point) that their feature isn't important enough. But with an approach like Svelte's, many features can be added with absolutely no cost to people who don't use them, because the code that implements those features just doesn't get generated by the compiler if it's unnecessary.


## We're just getting started

Svelte is very new. There's a lot of work still left to do – creating build tool integrations, adding a server-side renderer, hot reloading, transitions, more documentation and examples, starter kits, and so on.

But you can already build rich components with it, which is why we've gone straight to a stable 1.0.0 release. [Read the guide](https://v2.svelte.dev/guide), [try it out in the REPL](/repl), and head over to [GitHub](https://github.com/sveltejs/svelte) to help kickstart the next era of front end development.
