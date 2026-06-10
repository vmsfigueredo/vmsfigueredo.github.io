/**
 * CV data extracted from the resume PDFs (.specs).
 * Each entry holds both locales so components can switch without re-fetching.
 */

export const contact = {
	email: 'me@vitorfigueredo.dev',
	phone: '+55 61 99613-6776',
	whatsapp: 'https://wa.me/5561996136776',
	linkedin: 'https://www.linkedin.com/in/vmsfigueredo/',
	resume: {
		en: './Resume - Vitor Figueredo.pdf',
		pt: './Curriculo - Vitor Figueredo.pdf'
	}
};

/** @type {Array<{company:string, location:Record<'en'|'pt',string>, period:Record<'en'|'pt',string>, current?:boolean, role:Record<'en'|'pt',string>, stack:string[], bullets:Record<'en'|'pt',string[]>}>} */
export const experience = [
	{
		company: 'Join Tecnologia',
		current: true,
		location: { en: 'Porto Alegre, BR (Remote)', pt: 'Porto Alegre, BR (Remoto)' },
		period: { en: 'Jan 2024 – present', pt: 'Jan 2024 – atual' },
		role: {
			en: 'Tech Lead | Senior Full Stack Developer',
			pt: 'Líder Técnico | Desenvolvedor Full Stack Sr.'
		},
		stack: ['PHP', 'Laravel 11', 'ReactJS', 'MySQL', 'Elasticsearch'],
		bullets: {
			en: [
				'Promoted to Tech Lead after 12 months: technical coordination, code review, and stakeholder alignment.',
				'Leading a large-scale public-sector oversight platform — one of the largest of its kind in Latin America.',
				'Aligning expectations and technical feasibility directly with government stakeholders.',
				'Full stack development with PHP (Laravel 11) and ReactJS; MySQL and Elasticsearch integrations.',
				'Optimized and scaled the system for high performance and maintainability in a critical project.'
			],
			pt: [
				'Promovido a Líder Técnico após 12 meses: coordenação técnica, revisão de código e alinhamento com stakeholders.',
				'Liderando plataforma de fiscalização do setor público de grande porte — uma das maiores do tipo na América Latina.',
				'Alinhamento de expectativas e viabilidade técnica direto com stakeholders governamentais.',
				'Desenvolvimento full stack com PHP (Laravel 11) e ReactJS; integrações MySQL e Elasticsearch.',
				'Otimização e escalabilidade do sistema para alta performance em projeto de alta criticidade.'
			]
		}
	},
	{
		company: 'Simply PHP',
		location: { en: 'Montreal, CA (Remote)', pt: 'Montreal, CA (Remoto)' },
		period: { en: 'Nov 2024 – Jan 2025', pt: 'Nov 2024 – Jan 2025' },
		role: {
			en: 'Senior Full Stack Developer (Contract)',
			pt: 'Desenvolvedor Full Stack Sr. (Contrato)'
		},
		stack: ['PHP', 'API Integration', 'Logistics'],
		bullets: {
			en: [
				'Delivered an API integrating an enterprise manufacturer’s legacy systems with a third-party logistics tracking platform.',
				'Aligned scope and technical requirements with international stakeholders.',
				'Focused on system integration, data reliability, and performance in a distributed environment.'
			],
			pt: [
				'Entreguei API de integração entre sistemas legados de uma indústria de grande porte e uma plataforma terceira de rastreio logístico.',
				'Alinhamento de escopo e requisitos técnicos com stakeholders internacionais.',
				'Foco em integração de sistemas, confiabilidade de dados e performance em ambiente distribuído.'
			]
		}
	},
	{
		company: 'Rehagro',
		location: { en: 'Belo Horizonte, BR (Remote)', pt: 'Belo Horizonte, BR (Remoto)' },
		period: { en: 'Oct 2022 – Oct 2024', pt: 'Out 2022 – Out 2024' },
		role: { en: 'Tech Lead | Full Stack Developer', pt: 'Líder Técnico | Desenvolvedor Full Stack' },
		stack: ['Laravel', '.NET / C#', 'React', 'React Native', 'MySQL'],
		bullets: {
			en: [
				'Promoted to Tech Lead after 3 months, leading 5 developers on code quality, mentorship and support.',
				'Ran SCRUM ceremonies: dailies, planning, reviews, retrospectives.',
				'Defined system architecture, tech decisions, and complex integrations with continuous deployment.',
				'Full stack with Laravel (PHP), .NET (C#), React (JS/TS) and React Native.'
			],
			pt: [
				'Promovido a Líder Técnico após 3 meses, liderando 5 desenvolvedores em qualidade, mentoria e suporte.',
				'Conduzi cerimônias SCRUM: dailies, plannings, reviews e retrospectives.',
				'Definição de arquitetura, decisões técnicas e integrações complexas com deploy contínuo.',
				'Full stack com Laravel (PHP), .NET (C#), React (JS/TS) e React Native.'
			]
		}
	},
	{
		company: 'VFTec / Freelance',
		location: { en: 'Brasília, BR', pt: 'Brasília, BR' },
		period: { en: '2015 – 2022', pt: '2015 – 2022' },
		role: { en: 'Full Stack Web Developer', pt: 'Desenvolvedor Web Full Stack' },
		stack: ['PHP', 'JavaScript', 'MySQL'],
		bullets: {
			en: ['7 years of freelance and contract full stack web development.'],
			pt: ['7 anos de desenvolvimento web full stack como freelancer e contratos.']
		}
	}
];

/** @type {Array<{name:string, year:string, role:Record<'en'|'pt',string>, stat?:{value:string, label:Record<'en'|'pt',string>}, summary:Record<'en'|'pt',string>, stack:string[], highlights:Record<'en'|'pt',string[]>}>} */
export const projects = [
	{
		name: 'PROVATEC',
		year: '2025 · 2026',
		role: { en: 'Creator · v1 & v2', pt: 'Criador · v1 e v2' },
		summary: {
			en: 'Enrollment platform for a large annual medical board exam — candidate (physician) registration, a dynamic form builder, online payments and an admin back office. I built v1 from scratch in Next.js, then migrated it to SvelteKit; both versions were written by me.',
			pt: 'Plataforma de inscrição para uma grande prova anual de certificação médica — cadastro de candidatos (médicos), construtor de formulários dinâmico, pagamentos online e back office administrativo. Construí a v1 do zero em Next.js e depois migrei para SvelteKit; ambas as versões foram escritas por mim.'
		},
		stack: [
			'Laravel 12',
			'PHP 8.4',
			'Next.js → SvelteKit 2',
			'Svelte 5',
			'PostgreSQL',
			'MongoDB',
			'Redis',
			'Docker',
			'JWT',
			'Multi-tenancy'
		],
		highlights: {
			en: [
				'Domain-driven backend: bounded contexts (Candidate, FormBuilder, Payment, Admin) with per-domain services, repositories and auto-loaded routes.',
				'Domain-based multi-tenancy (stancl/tenancy) isolating each client tenant.',
				'Dynamic form builder powering custom enrollment flows without code changes.',
				'Audit trail in MongoDB, media handling, and a Pest-tested Laravel API.'
			],
			pt: [
				'Backend domain-driven: bounded contexts (Candidato, FormBuilder, Pagamento, Admin) com services, repositories e rotas auto-carregadas por domínio.',
				'Multi-tenancy por domínio (stancl/tenancy) isolando cada tenant/cliente.',
				'Construtor de formulários dinâmico para fluxos de inscrição customizados sem alterar código.',
				'Trilha de auditoria em MongoDB, gestão de mídia e API Laravel testada com Pest.'
			]
		}
	},
	{
		name: 'Sigebra',
		year: '2024 –',
		role: { en: 'Creator · Tech Lead', pt: 'Criador · Líder Técnico' },
		stat: { value: '6+', label: { en: 'schools served', pt: 'escolas atendidas' } },
		summary: {
			en: 'Multi-tenant school management system with a built-in Virtual Learning Environment (VLE). Already adopted by 6+ schools. Spans a Laravel API, SvelteKit web app, background worker and marketing landing page.',
			pt: 'Sistema de gestão escolar multi-tenant com Ambiente Virtual de Aprendizagem (AVA) integrado. Já adotado por 6+ escolas. Composto por API Laravel, web app SvelteKit, worker de background e landing de divulgação.'
		},
		stack: [
			'Laravel 13',
			'PHP 8.3',
			'SvelteKit',
			'PostgreSQL',
			'Redis',
			'Docker',
			'Multi-tenancy',
			'JWT',
			'Spatie Permissions',
			'OpenAPI'
		],
		highlights: {
			en: [
				'Domain-based multi-tenancy (stancl/tenancy) — each school runs isolated on its own tenant.',
				'Virtual Learning Environment: course content, lessons and student-facing flows.',
				'Role/permission system (spatie) and JWT auth across web app and worker.',
				'Multi-service architecture: API, web, worker and landing, orchestrated with Docker.'
			],
			pt: [
				'Multi-tenancy por domínio (stancl/tenancy) — cada escola roda isolada em seu tenant.',
				'Ambiente Virtual de Aprendizagem: conteúdo de cursos, aulas e fluxos do aluno.',
				'Sistema de papéis/permissões (spatie) e auth JWT entre web app e worker.',
				'Arquitetura multi-serviço: API, web, worker e landing, orquestrados com Docker.'
			]
		}
	},
	{
		name: 'NavFin',
		year: '2025',
		role: { en: 'Backend Architect', pt: 'Arquiteto Backend' },
		summary: {
			en: 'Fintech microservices backend — a monorepo of independent Laravel services (auth, user, identity, credit, loan) behind a Traefik gateway, with a shared contracts package. Backend only.',
			pt: 'Backend fintech em microsserviços — monorepo de serviços Laravel independentes (auth, user, identity, credit, loan) atrás de um gateway Traefik, com pacote de contracts compartilhado. Apenas backend.'
		},
		stack: [
			'Laravel 11',
			'PHP 8.2',
			'PostgreSQL 16',
			'Redis 7',
			'Traefik v3',
			'Docker',
			'Microservices',
			'JWT'
		],
		highlights: {
			en: [
				'Microservices monorepo: each service is a standalone Laravel app with its own database and vendor.',
				'Traefik forward-auth: the auth service validates JWTs, downstream services receive only X-User-Id / X-Role / X-Tenant-Id headers.',
				'Service + Repository patterns over a shared contracts package (BaseService, ServiceResponse, DTOs).',
				'Pest-tested, Docker-orchestrated, with separate observability stack.'
			],
			pt: [
				'Monorepo de microsserviços: cada serviço é uma app Laravel autônoma com banco e vendor próprios.',
				'Forward-auth via Traefik: o serviço de auth valida JWTs; os demais recebem só headers X-User-Id / X-Role / X-Tenant-Id.',
				'Padrões Service + Repository sobre pacote de contracts compartilhado (BaseService, ServiceResponse, DTOs).',
				'Testado com Pest, orquestrado em Docker, com stack de observabilidade separada.'
			]
		}
	}
];

/** @type {Array<{label:Record<'en'|'pt',string>, items:string[]}>} */
export const skills = [
	{
		label: { en: 'Languages', pt: 'Linguagens' },
		items: ['PHP', 'C#', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS']
	},
	{
		label: { en: 'Frameworks', pt: 'Frameworks' },
		items: ['Laravel', 'ReactJS', 'React Native', 'Flutter', '.NET']
	},
	{
		label: { en: 'Databases', pt: 'Bancos de Dados' },
		items: ['MySQL', 'MongoDB', 'SQLite', 'Redis', 'Elasticsearch']
	},
	{
		label: { en: 'DevOps & Tools', pt: 'DevOps & Ferramentas' },
		items: ['Azure DevOps', 'JIRA', 'Git', 'GitHub', 'GitLab', 'BitBucket']
	}
];

/** @type {Array<{degree:Record<'en'|'pt',string>, school:string, year:string}>} */
export const education = [
	{
		degree: {
			en: "BS in Cybersecurity (in progress)",
			pt: 'Bacharelado em Cybersecurity (cursando)'
		},
		school: 'Ensign College · Salt Lake City, UT',
		year: 'Aug 2026 –'
	},
	{
		degree: {
			en: 'Postgrad — Software Architecture & AI Solutions',
			pt: 'Pós — Arquitetura de Software e Soluções com IA'
		},
		school: 'Faculdade XP',
		year: '2024'
	},
	{
		degree: { en: "Bachelor's in Computer Engineering", pt: 'Engenharia da Computação' },
		school: 'FACISA',
		year: '2023'
	},
	{
		degree: {
			en: 'MBA — Database Administration',
			pt: 'MBA — Administração de Banco de Dados'
		},
		school: 'Faculdade Ágora',
		year: '2021'
	},
	{
		degree: { en: 'MBA — Full Stack Web Development', pt: 'MBA — Desenvolvimento Web Full Stack' },
		school: 'Faculdade Ágora',
		year: '2021'
	},
	{
		degree: {
			en: 'Associate — Systems Analysis & Development',
			pt: 'Análise e Desenvolvimento de Sistemas'
		},
		school: 'FATEC Alto Paranaíba',
		year: '2019'
	}
];
