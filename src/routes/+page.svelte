<script>
	import Contact from '$lib/components/Contact.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Services from '$lib/components/Services.svelte';
	import Travel from '$lib/components/Travel.svelte';
	import { contact } from '$lib/data.js';
	import { t, locale } from '$lib/i18n/index.js';

	const SITE = 'https://vitorfigueredo.dev';
	const person = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Vitor Marileu S. de Figueredo Filho',
		alternateName: 'Vitor Figueredo',
		url: SITE,
		image: `${SITE}/vitor.jpg`,
		email: `mailto:${contact.email}`,
		jobTitle: 'Tech Lead & Senior Full Stack Developer',
		sameAs: [contact.linkedin],
		knowsAbout: ['PHP', 'Laravel', 'SvelteKit', 'React', '.NET', 'Software Architecture', 'Technical Leadership']
	};
</script>

<Seo
	title={$t.meta.title}
	description={$t.meta.description}
	path="/"
	ogLocale={$locale === 'pt' ? 'pt_BR' : 'en_US'}
	jsonLd={person}
/>

<Hero />
<Services />
<Projects />
<Experience />
<Travel />
<Contact />
