---
title: Debugging
---

Men-debug kode server Anda sangat mudah dengan [ndb] (https://github.com/GoogleChromeLabs/ndb). Instal secara global ...

```bash
npm install -g ndb
```

...kemudian jalankan Sapper:

```bash
ndb npm run dev
```

> Dengan asumsi bahwa `npm run dev` menjalankan `sapper dev`. Kamu juga bisa menjalankan Sapper melalui [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner), seperti pada `ndb npx sapper dev`.

Perhatikan bahwa kamu mungkin tidak melihat adanya output terminal selama beberapa detik ketika ndb sedang mulai berjalan.
