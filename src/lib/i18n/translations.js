/**
 * Interface strings, keyed by locale. CV facts live in $lib/data.js.
 * Placeholders like {n} are replaced by the component.
 */

export const translations = {
	en: {
		meta: {
			title: 'Vitor Figueredo — Tech Lead & Senior Full Stack Developer',
			description:
				'Tech Lead and Senior Full Stack Developer with 10+ years building reliable web systems with Laravel, SvelteKit, React and .NET. Available for remote work.'
		},
		a11y: {
			skip: 'Skip to content',
			menu: 'Open menu',
			closeMenu: 'Close menu',
			primaryNav: 'Main navigation'
		},
		nav: {
			about: 'About',
			projects: 'Projects',
			experience: 'Experience',
			blog: 'Blog',
			contact: 'Contact',
			resume: 'Download resume',
			resumeShort: 'Resume'
		},
		theme: { toggle: 'Change theme', system: 'System', light: 'Light', dark: 'Dark' },
		lang: { toggle: 'Mudar para português' },
		hero: {
			eyebrow: 'Tech Lead · Senior Full Stack Developer',
			hello: "Hi, I'm Vitor.",
			titleStart: 'I build systems',
			titleAccent: 'companies trust.',
			lead: "For over 10 years I've turned business needs into software that works at scale. Today I lead the engineering team of one of Latin America's largest public-sector oversight platforms.",
			ctaProjects: 'See projects',
			ctaContact: 'Get in touch',
			trust: [
				{ value: '10+', label: 'years of experience' },
				{ value: '2×', label: 'promoted to Tech Lead' },
				{ value: 'PT · EN', label: 'Portuguese and English' }
			],
			photoAlt: 'Vitor Figueredo smiling on a street in Paris',
			nowLabel: 'Currently',
			nowRole: 'Tech Lead at Join Tecnologia'
		},
		services: {
			kicker: 'How I help',
			title: 'From business problem to system in production.',
			lead: 'I work between the people who decide and the people who build: I understand the goal, design the solution and lead the delivery.',
			items: [
				{
					icon: 'users',
					title: 'Technical leadership',
					text: 'I coordinate developers, review code and align scope, deadlines and expectations with decision makers.'
				},
				{
					icon: 'monitor',
					title: 'End-to-end systems',
					text: 'From database to screen: web and mobile applications ready for production, with automated tests.'
				},
				{
					icon: 'layers',
					title: 'Architecture and integrations',
					text: 'I design how the system is organized and connect what already exists: legacy systems, APIs and external services.'
				}
			]
		},
		projects: {
			kicker: 'Featured projects',
			title: 'Products I built from scratch.',
			lead: 'Plain-language summaries up front. Technical details are one click away for those who want them.',
			details: 'Technical details',
			stackLabel: 'Main technologies'
		},
		experience: {
			kicker: 'Experience',
			title: "Where I've worked.",
			current: 'current',
			linkedin: 'Full history on LinkedIn',
			eduKicker: 'Education',
			eduTitle: 'Always learning.',
			langTitle: 'Languages',
			certificate: 'certificate'
		},
		languages: [
			{ name: 'Portuguese', level: 'Native' },
			{
				name: 'English',
				level: 'Upper intermediate (CEFR B2)',
				cert: 'https://certs.duolingo.com/u6fsdz9rljb1fxwq'
			}
		],
		travel: {
			kicker: 'Beyond the code',
			title: 'Quality delivered remotely, wherever I am.',
			lead: 'Travelling is my favourite hobby. Every new place teaches me to communicate across people and cultures, and I bring that to remote work with teams in Brazil and abroad.',
			countries: 'countries visited',
			continents: 'continents',
			remoteValue: '100%',
			remote: 'remote since 2022',
			home: 'home base',
			mapLabel: 'World map with trips from Brasília to {list}'
		},
		writing: {
			kicker: 'Blog',
			title: 'I write about what I learn at work.',
			lead: 'Architecture, technical leadership and product decisions, in English and Portuguese.',
			all: 'See all articles'
		},
		blog: {
			metaTitle: 'Blog — Vitor Figueredo',
			kicker: 'Blog',
			title: 'Notes from someone who builds and leads.',
			lead: 'Architecture, technical leadership and product decisions. Straight to the point, based on real projects.',
			search: 'Search articles',
			searchPlaceholder: 'Search articles…',
			all: 'All',
			filterLabel: 'Filter by topic',
			countOne: '{n} article',
			countMany: '{n} articles',
			switchHere: '{n} in English',
			empty: 'No articles match your search.',
			clear: 'Clear filters',
			noneInLang: 'No articles in English yet.',
			minutes: '{n} min',
			readingTime: '{n} min read',
			back: 'All articles',
			onThisPage: 'On this page',
			readIn: 'Read in English',
			authorBio:
				'Tech Lead and Senior Full Stack Developer. I write about architecture, leadership and what I learn building real systems.',
			endNote: 'Found it useful? Share it or reach out.',
			copyLink: 'Copy link',
			linkCopied: 'Link copied',
			contact: 'Get in touch'
		},
		contact: {
			kicker: 'Contact',
			title: "Let's talk?",
			lead: 'New project, job opportunity, consulting or just an idea. Email or WhatsApp is the quickest way to reach me.',
			email: 'Email',
			whatsapp: 'WhatsApp',
			linkedin: 'LinkedIn',
			copy: 'Copy',
			copied: 'Copied to clipboard'
		},
		errors: {
			notFound: 'Page not found',
			generic: 'Something went wrong',
			lead: 'The link may be broken or the page may have moved.',
			home: 'Back to home',
			blog: 'Go to the blog'
		},
		footer: { location: 'Brasília, Brazil · Available for remote work' }
	},

	pt: {
		meta: {
			title: 'Vitor Figueredo — Tech Lead e Desenvolvedor Full Stack Sênior',
			description:
				'Tech Lead e Desenvolvedor Full Stack Sênior com mais de 10 anos construindo sistemas web confiáveis com Laravel, SvelteKit, React e .NET. Disponível para trabalho remoto.'
		},
		a11y: {
			skip: 'Pular para o conteúdo',
			menu: 'Abrir menu',
			closeMenu: 'Fechar menu',
			primaryNav: 'Navegação principal'
		},
		nav: {
			about: 'Sobre',
			projects: 'Projetos',
			experience: 'Experiência',
			blog: 'Blog',
			contact: 'Contato',
			resume: 'Baixar currículo',
			resumeShort: 'Currículo'
		},
		theme: { toggle: 'Mudar tema', system: 'Sistema', light: 'Claro', dark: 'Escuro' },
		lang: { toggle: 'Switch to English' },
		hero: {
			eyebrow: 'Tech Lead · Desenvolvedor Full Stack Sênior',
			hello: 'Olá, eu sou o Vitor.',
			titleStart: 'Construo sistemas',
			titleAccent: 'que empresas confiam.',
			lead: 'Há mais de 10 anos transformo necessidades de negócio em software que funciona em escala. Hoje lidero o time técnico de uma das maiores plataformas de fiscalização pública da América Latina.',
			ctaProjects: 'Ver projetos',
			ctaContact: 'Fale comigo',
			trust: [
				{ value: '10+', label: 'anos de experiência' },
				{ value: '2×', label: 'promovido a Tech Lead' },
				{ value: 'PT · EN', label: 'português e inglês' }
			],
			photoAlt: 'Vitor Figueredo sorrindo em uma rua de Paris',
			nowLabel: 'Atualmente',
			nowRole: 'Tech Lead na Join Tecnologia'
		},
		services: {
			kicker: 'Como eu ajudo',
			title: 'Do problema de negócio ao sistema no ar.',
			lead: 'Trabalho na ponte entre quem decide e quem programa: entendo o objetivo, desenho a solução e lidero a entrega.',
			items: [
				{
					icon: 'users',
					title: 'Liderança técnica',
					text: 'Coordeno desenvolvedores, reviso código e alinho escopo, prazos e expectativas com quem toma as decisões.'
				},
				{
					icon: 'monitor',
					title: 'Sistemas completos',
					text: 'Do banco de dados à tela: aplicações web e mobile prontas para produção, com testes automatizados.'
				},
				{
					icon: 'layers',
					title: 'Arquitetura e integrações',
					text: 'Desenho como o sistema se organiza e conecto o que já existe: sistemas legados, APIs e serviços externos.'
				}
			]
		},
		projects: {
			kicker: 'Projetos em destaque',
			title: 'Produtos que eu construí do zero.',
			lead: 'Resumo em linguagem simples primeiro. Os detalhes técnicos ficam a um clique, para quem quiser ver.',
			details: 'Detalhes técnicos',
			stackLabel: 'Principais tecnologias'
		},
		experience: {
			kicker: 'Experiência',
			title: 'Onde eu trabalhei.',
			current: 'atual',
			linkedin: 'Histórico completo no LinkedIn',
			eduKicker: 'Formação',
			eduTitle: 'Sempre estudando.',
			langTitle: 'Idiomas',
			certificate: 'certificado'
		},
		languages: [
			{ name: 'Português', level: 'Nativo' },
			{
				name: 'Inglês',
				level: 'Intermediário superior (CEFR B2)',
				cert: 'https://certs.duolingo.com/u6fsdz9rljb1fxwq'
			}
		],
		travel: {
			kicker: 'Fora do código',
			title: 'Qualidade entregue remotamente, de onde eu estiver.',
			lead: 'Viajar é meu hobby favorito. Cada lugar novo me ensina a me comunicar com pessoas e culturas diferentes, e levo isso para o trabalho remoto com times do Brasil e do exterior.',
			countries: 'países visitados',
			continents: 'continentes',
			remoteValue: '100%',
			remote: 'remoto desde 2022',
			home: 'base',
			mapLabel: 'Mapa-múndi com viagens de Brasília para {list}'
		},
		writing: {
			kicker: 'Blog',
			title: 'Escrevo sobre o que aprendo no trabalho.',
			lead: 'Arquitetura, liderança técnica e decisões de produto, em português e inglês.',
			all: 'Ver todos os artigos'
		},
		blog: {
			metaTitle: 'Blog — Vitor Figueredo',
			kicker: 'Blog',
			title: 'Notas de quem constrói e lidera.',
			lead: 'Arquitetura, liderança técnica e decisões de produto. Texto direto, baseado em projetos reais.',
			search: 'Buscar artigos',
			searchPlaceholder: 'Buscar artigos…',
			all: 'Todos',
			filterLabel: 'Filtrar por assunto',
			countOne: '{n} artigo',
			countMany: '{n} artigos',
			switchHere: '{n} em português',
			empty: 'Nenhum artigo encontrado para essa busca.',
			clear: 'Limpar filtros',
			noneInLang: 'Ainda não há artigos em português.',
			minutes: '{n} min',
			readingTime: '{n} min de leitura',
			back: 'Todos os artigos',
			onThisPage: 'Neste artigo',
			readIn: 'Ler em português',
			authorBio:
				'Tech Lead e Desenvolvedor Full Stack Sênior. Escrevo sobre arquitetura, liderança e o que aprendo construindo sistemas de verdade.',
			endNote: 'Gostou? Compartilhe ou me chame para conversar.',
			copyLink: 'Copiar link',
			linkCopied: 'Link copiado',
			contact: 'Fale comigo'
		},
		contact: {
			kicker: 'Contato',
			title: 'Vamos conversar?',
			lead: 'Projeto novo, vaga, consultoria ou só uma ideia. E-mail ou WhatsApp é o jeito mais rápido de falar comigo.',
			email: 'E-mail',
			whatsapp: 'WhatsApp',
			linkedin: 'LinkedIn',
			copy: 'Copiar',
			copied: 'Copiado para a área de transferência'
		},
		errors: {
			notFound: 'Página não encontrada',
			generic: 'Algo deu errado',
			lead: 'O link pode estar quebrado ou a página mudou de lugar.',
			home: 'Voltar ao início',
			blog: 'Ir para o blog'
		},
		footer: { location: 'Brasília, Brasil · Disponível para trabalho remoto' }
	}
};
