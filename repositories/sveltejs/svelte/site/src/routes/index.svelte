<script>
	import { Blurb, Hero, Section } from '@sveltejs/site-kit';
	import Contributors from './_components/Contributors.svelte';
	import Example from './_components/Example.svelte';
	import WhosUsingSvelte from './_components/WhosUsingSvelte.svelte';
	// import Lazy from '../components/Lazy.svelte';

	// TODO this causes a Sapper CSS bug...
	// function loadReplWidget() {
	// 	console.log('lazy loading');
	// 	return import('../components/Repl/ReplWidget.svelte').then(mod => mod.default);
	// }
</script>

<style>
	/* darken text for accessibility */
	/* TODO does this belong elsewhere? */
	:global(.back-light) {
		--text: hsl(36, 3%, 44%);
	}

	.examples {
		background: var(--second);
		color: white;
		overflow: hidden;
	}
</style>

<svelte:head>
	<title> Svelte • Aplikasi web yang disempurnakan secara sibernetik </title>

	<meta name="twitter:title" content="Svelte">
	<meta name="twitter:description" content="Cybernetically enhanced web apps">
	<meta name="Description" content="Cybernetically enhanced web apps">
</svelte:head>

<Hero
	title="Svelte"
	tagline="Aplikasi web yang disempurnakan secara sibernetik"
	outline="svelte-logo-outline.svg"
	logotype="svelte-logotype.svg"
/>

<Blurb>
	<a href="blog/write-less-code" slot="one">
		<h2> Lebih sedikit kode </h2>
		<p> Buat komponen yang bebas dari <i>boilerplate</i> menggunakan bahasa yang sudah Anda kenal - HTML, CSS, dan JavaScript </p>

		<span class="learn-more">pelajari lebih lanjut</span>
	</a>

	<a href="blog/virtual-dom-is-pure-overhead" slot="two">
		<h2> Tanpa DOM virtual </h2>
		<p> Svelte mengkompilasi kode Anda menjadi vanilla JS yang kecil tak berkerangka - aplikasi Anda mulai dengan cepat dan tetap cepat </p>

		<span class="learn-more">pelajari lebih lanjut</span>
	</a>

	<a href="blog/svelte-3-rethinking-reactivity" slot="three">
		<h2> Reaktif Sesungguhnya </h2>
		<p> Tak ada lagi pustaka pengelolaan <i>state</i> yang rumit - Svelte menghadirkan reaktivitas pada JavaScript</p>

		<span class="learn-more">pelajari lebih lanjut</span>
	</a>

	<div class="description" slot="what">
		<p> Svelte adalah pendekatan radikal baru dalam membangun antarmuka pengguna. Sementara kerangka kerja tradisional seperti React dan Vue melakukan sebagian besar tugasnya pada <em> browser </em>, Svelte menggeser pekerjaan itu pada <em> langkah kompilasi </em> yang terjadi saat Anda membangun aplikasi. </p>

		<p> Alih-alih menggunakan teknik seperti DOM virtual, Svelte menulis kode yang memperbarui DOM dengan presisi yang tinggi ketika status aplikasi Anda berubah.</p>

		<p> <a href="blog/svelte-3-rethinking-reactivity"> Baca posting blog pengantar </a> untuk mempelajari lebih lanjut. </p>
	</div>

	<div style="grid-area: start; display: flex; flex-direction: column; min-width: 0" slot="how">
		<pre class="language-bash" style="margin: 0 0 1em 0; min-width: 0; min-height: 0">
npx degit <a href="https://github.com/sveltejs/template" style="user-select: initial;">sveltejs/template</a> my-svelte-project
<span class="token comment"># atau unduh dan ekstrak <a href="https://github.com/sveltejs/template/archive/master.zip">file .zip</a> ini</span>
cd my-svelte-project

npm install
npm run dev
		</pre>

		<p style = "flex: 1"> Lihat <a href="blog/the-easiest-way-to-get-started"> panduan mulai cepat </a> untuk informasi lebih lanjut. </p>

		<p class = "cta"> <a rel="prefetch" href="tutorial"> Pelajari Svelte </a> </p>
	</div>
</Blurb>

<div class="examples">
	<Example id="hello-world">
		<p>Komponen Svelte dibangun di atas HTML. Cukup tambahkan data.</p>
	</Example>

	<Example id="nested-components">
		<p> CSS dibatasi komponennya secara default - tidak ada lagi benturan gaya atau perang kekhususan. Atau Anda dapat <a href="/blog/svelte-css-in-js"> menggunakan perpustakaan CSS-in-JS favorit Anda </a>. </p>
	</Example>

	<Example id="reactive-assignments">
		<p>Memicu pembaruan granular yang efisien dengan penetapan (<i>assignment</i>) variabel lokal. <i>Compiler</i> mengerjakan sisanya.</p>
	</Example>

	<Example id="svg-transitions">
		<p>Membangun UI yang indah dengan mesin transisi yang kuat dan berkinerja tinggi yang dibangun langsung pada kerangka kerja.</p>
	</Example>
</div>

<Section>
	<h3>Siapa yang menggunakan Svelte?</h3>

	<WhosUsingSvelte/>
</Section>

<Section>
	<h3>Para Kontributor</h3>

<p> Svelte adalah perangkat lunak gratis dan <i>open source</i>, dimungkinkan oleh karya lusinan sukarelawan. <a href="https://github.com/sveltejs/svelte"> Bergabunglah dengan kami! </a> </p>
	<Contributors/>
</Section>
