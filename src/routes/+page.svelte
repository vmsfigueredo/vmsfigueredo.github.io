<script>
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { t } from '$lib/i18n/index.js';
</script>

<Hero />
<About />
<Projects />
<Experience />
<Contact />

<footer class="border-t border-border px-5 py-8 text-center text-xs text-fg-dim">
	<p>
		<span class="text-accent">$</span> echo "© {new Date().getFullYear()} Vitor Figueredo"
	</p>
	<p class="mt-1">{$t.footer.built}</p>
</footer>
