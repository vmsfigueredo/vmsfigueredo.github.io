/**
 * All UI strings + CV content, keyed by locale.
 * Content extracted from .specs/Resume (EN) and Curriculo (PT-BR) PDFs.
 */

export const translations = {
	en: {
		meta: {
			title: 'Vitor Figueredo — Tech Lead & Full Stack Developer',
			description:
				'Tech Lead and Senior Full Stack Developer. PHP/Laravel, React, .NET. Building and scaling critical large-scale systems.'
		},
		nav: {
			home: 'home',
			about: 'about',
			projects: 'projects',
			experience: 'experience',
			contact: 'contact',
			resume: 'resume'
		},
		hero: {
			greeting: 'whoami',
			name: 'Vitor Figueredo',
			roles: ['Tech Lead', 'Senior Full Stack Developer', 'Software Architect'],
			tagline:
				'I design, build and scale large, critical systems — from public-sector oversight platforms to enterprise logistics integrations.',
			ctaProjects: './experience',
			ctaContact: './contact',
			ctaResume: 'download resume'
		},
		about: {
			heading: 'about',
			cmd: 'cat about.md',
			bio: [
				'Tech Lead and Senior Full Stack Developer with 10+ years building web systems.',
				'I lead teams, define architecture, and ship resilient, high-performance applications in PHP (Laravel), React, .NET (C#) and React Native.',
				'Comfortable from stakeholder alignment to database optimization — currently leading a large-scale public-sector oversight platform, one of the largest of its kind in Latin America.'
			],
			skillsHeading: 'skills',
			eduHeading: 'education',
			langHeading: 'languages',
			languages: [
				{ name: 'Portuguese', level: 'Native' },
				{ name: 'English', level: 'Upper Intermediate: CEFR B2', cert: 'https://certs.duolingo.com/u6fsdz9rljb1fxwq' }
			]
		},
		projects: {
			heading: 'projects',
			cmd: 'ls ~/projects'
		},
		experience: {
			heading: 'experience',
			cmd: 'git log --oneline',
			current: 'current',
			viewMore: 'View on LinkedIn'
		},
		contact: {
			heading: 'contact',
			cmd: './contact.sh',
			intro: "Let’s build something. Reach out:",
			emailLabel: 'email',
			phoneLabel: 'phone',
			linkedinLabel: 'linkedin',
			copy: 'copy',
			copied: 'copied!',
			emailMe: 'email me',
			whatsapp: 'message me'
		},
		footer: {
			built: 'Built with SvelteKit + Tailwind. Hosted on GitHub Pages.'
		}
	},

	pt: {
		meta: {
			title: 'Vitor Figueredo — Líder Técnico & Desenvolvedor Full Stack',
			description:
				'Líder Técnico e Desenvolvedor Full Stack Sênior. PHP/Laravel, React, .NET. Construindo e escalando sistemas críticos de grande porte.'
		},
		nav: {
			home: 'início',
			about: 'sobre',
			projects: 'projetos',
			experience: 'experiência',
			contact: 'contato',
			resume: 'currículo'
		},
		hero: {
			greeting: 'whoami',
			name: 'Vitor Figueredo',
			roles: ['Líder Técnico', 'Desenvolvedor Full Stack Sênior', 'Arquiteto de Software'],
			tagline:
				'Projeto, construo e escalo sistemas grandes e críticos — de plataformas de fiscalização do setor público a integrações logísticas corporativas.',
			ctaProjects: './experiência',
			ctaContact: './contato',
			ctaResume: 'baixar currículo'
		},
		about: {
			heading: 'sobre',
			cmd: 'cat sobre.md',
			bio: [
				'Líder Técnico e Desenvolvedor Full Stack Sênior com mais de 10 anos construindo sistemas web.',
				'Lidero equipes, defino arquitetura e entrego aplicações resilientes e de alta performance em PHP (Laravel), React, .NET (C#) e React Native.',
				'Atuo da definição com stakeholders à otimização de banco de dados — atualmente liderando uma plataforma de fiscalização do setor público de grande porte, uma das maiores do tipo na América Latina.'
			],
			skillsHeading: 'habilidades',
			eduHeading: 'formação',
			langHeading: 'idiomas',
			languages: [
				{ name: 'Português', level: 'Nativo' },
				{ name: 'Inglês', level: 'Nível Intermediário Superior: CEFR B2', cert: 'https://certs.duolingo.com/u6fsdz9rljb1fxwq' }
			]
		},
		projects: {
			heading: 'projetos',
			cmd: 'ls ~/projetos'
		},
		experience: {
			heading: 'experiência',
			cmd: 'git log --oneline',
			current: 'atual',
			viewMore: 'Ver no LinkedIn'
		},
		contact: {
			heading: 'contato',
			cmd: './contato.sh',
			intro: 'Vamos construir algo. Fale comigo:',
			emailLabel: 'email',
			phoneLabel: 'telefone',
			linkedinLabel: 'linkedin',
			copy: 'copiar',
			copied: 'copiado!',
			emailMe: 'enviar email',
			whatsapp: 'me chamar'
		},
		footer: {
			built: 'Feito com SvelteKit + Tailwind. Hospedado no GitHub Pages.'
		}
	}
};
