export const languages = ['pt', 'en', 'es'];

export const currencies = [
	{ code: 'USD', symbol: '$', region: 'US' },
	{ code: 'BRL', symbol: 'R$', region: 'BR' },
	{ code: 'EUR', symbol: '€', region: 'EU' },
	{ code: 'GBP', symbol: '£', region: 'GB' },
	{ code: 'ARS', symbol: 'AR$', region: 'AR' },
	{ code: 'MXN', symbol: 'MX$', region: 'MX' },
	{ code: 'CAD', symbol: 'CA$', region: 'CA' },
	{ code: 'JPY', symbol: '¥', region: 'JP' },
	{ code: 'CLP', symbol: 'CL$', region: 'CL' }
];

export const copy = {
	pt: {
		meta: {
			title: 'Troco — seu dinheiro, em qualquer moeda',
			description:
				'Organize contas, cartões, transações e orçamentos em várias moedas, com privacidade por padrão.'
		},
		nav: {
			features: 'Recursos',
			currencies: 'Moedas',
			pro: 'Pro',
			privacy: 'Privacidade',
			beta: 'Pedir acesso beta',
			languageLabel: 'Idioma'
		},
		hero: {
			eyebrow: 'Finanças pessoais, sem fronteiras',
			title: 'Seu dinheiro não para na fronteira. Seu controle também não deveria.',
			description:
				'Contas, cartões, transações e orçamentos em várias moedas, reunidos em uma visão clara e pessoal.',
			appStoreStatus: 'Em breve na App Store',
			beta: 'Pedir acesso beta'
		},
		currencies: {
			eyebrow: 'Nove moedas, uma rotina',
			title: 'Acompanhe o dinheiro no idioma em que ele acontece.',
			description:
				'Cada moeda mantém seu código e símbolo próprios, para que dólares de lugares diferentes nunca pareçam iguais.',
			names: {
				USD: 'Dólar dos Estados Unidos',
				BRL: 'Real brasileiro',
				EUR: 'Euro',
				GBP: 'Libra esterlina',
				ARS: 'Peso argentino',
				MXN: 'Peso mexicano',
				CAD: 'Dólar canadense',
				JPY: 'Iene japonês',
				CLP: 'Peso chileno'
			},
			regions: {
				USD: 'Estados Unidos',
				BRL: 'Brasil',
				EUR: 'União Europeia',
				GBP: 'Reino Unido',
				ARS: 'Argentina',
				MXN: 'México',
				CAD: 'Canadá',
				JPY: 'Japão',
				CLP: 'Chile'
			}
		},
		overview: {
			eyebrow: 'Visão consolidada',
			title: 'Uma visão do todo, sem apagar a origem.',
			description:
				'Escolha uma moeda-base para entender seu saldo consolidado e continue vendo a composição em cada moeda original.',
			highlights: [
				'Saldo consolidado na moeda-base escolhida',
				'Composição por moeda original',
				'Cotação atual usada na conversão e fluxo mensal de entradas e saídas'
			]
		},
		transactions: {
			eyebrow: 'Transações e transferências',
			title: 'Registre cada movimento com o contexto que importa.',
			description:
				'Você gerencia receitas, despesas e transferências manualmente — com valores originais e convertidos lado a lado quando fizer sentido.',
			highlights: [
				'Receitas, despesas e transferências entre contas',
				'Lançamentos recorrentes para a rotina financeira',
				'Busca e status para encontrar e acompanhar cada lançamento'
			]
		},
		planning: {
			eyebrow: 'Orçamentos e planejamento',
			title: 'Planeje o mês com espaço para a vida real.',
			description:
				'Defina orçamentos, acompanhe o que resta e compare sua renda com os gastos ao longo do mês.',
			highlights: [
				'Orçamentos por categoria e valores restantes',
				'Percentuais de renda para orientar decisões',
				'Recorrências incluídas no planejamento mensal'
			]
		},
		wallet: {
			eyebrow: 'Contas, cartões e compartilhamento',
			title: 'Sua carteira, sincronizada do seu jeito.',
			description:
				'Organize dinheiro em espécie, contas bancárias e cartões em suas moedas nativas. A sincronização usa iCloud e o compartilhamento é opcional.',
			highlights: [
				'Contas e cartões em suas moedas nativas',
				'Sincronização entre seus dispositivos com iCloud e CloudKit',
				'Quem você convidar pode ler e editar todo o livro-caixa compartilhado'
			]
		},
		pro: {
			eyebrow: 'Troco Pro',
			title: 'Mais espaço para a sua organização.',
			description:
				'O Pro remove os limites da versão gratuita e habilita o compartilhamento da casa.',
			monthly: 'R$ 9.90 por mês',
			yearly: 'R$ 99.90 por ano',
			trial: 'Teste grátis por 7 dias',
			recommended: 'Melhor escolha',
			limits: 'Remova os limites da versão gratuita',
			sharing: 'Habilite o compartilhamento do livro-caixa da casa'
		},
		privacy: {
			eyebrow: 'Privacidade por padrão',
			title: 'Suas finanças não são um produto.',
			description:
				'Não há anúncios, análises de uso nem rastreamento entre apps. Troco não opera uma conta própria nem um servidor de análises para seus dados.',
			details:
				'CloudKit e StoreKit são serviços da Apple. Para buscar cotações, o app envia os códigos das moedas e, em consultas históricas, a data.',
			policy: 'Ler a política de privacidade',
			eula: 'Contrato de licença padrão da Apple'
		},
		finalCta: {
			title: 'Uma relação mais clara com o seu dinheiro começa aqui.',
			description:
				'Troco está chegando à App Store. Se quiser experimentar antes, peça acesso beta por e-mail.',
			appStoreStatus: 'Em breve na App Store',
			beta: 'Pedir acesso beta'
		},
		footer: {
			privacy: 'Privacidade',
			eula: 'EULA da Apple',
			support: 'Falar com o suporte',
			rights: 'Todos os direitos reservados.'
		},
		screenshotAlt: {
			onboarding: 'Tela de boas-vindas do Troco sobre uma paisagem de montanhas.',
			overview: 'Resumo financeiro com saldo consolidado, moedas e fluxo mensal.',
			budgets: 'Resumo de orçamentos com categorias e valores restantes.',
			transactions: 'Lista de transações com valores originais e convertidos.',
			planning: 'Planejamento mensal com renda, gastos e recorrências.',
			wallet: 'Carteira com contas e cartões organizados por moeda.'
		},
		mail: {
			subject: 'Acesso beta ao Troco',
			body: 'Olá! Gostaria de pedir acesso beta ao Troco.'
		}
	},
	en: {
		meta: {
			title: 'Troco — your money, in every currency',
			description:
				'Organize accounts, cards, transactions, and budgets across currencies, with privacy by default.'
		},
		nav: {
			features: 'Features',
			currencies: 'Currencies',
			pro: 'Pro',
			privacy: 'Privacy',
			beta: 'Request beta access',
			languageLabel: 'Language'
		},
		hero: {
			eyebrow: 'Personal finance without borders',
			title: "Your money doesn't stop at the border. Your control shouldn't either.",
			description:
				'Accounts, cards, transactions, and budgets across currencies, brought together in one clear, personal view.',
			appStoreStatus: 'Coming soon on the App Store',
			beta: 'Request beta access'
		},
		currencies: {
			eyebrow: 'Nine currencies, one routine',
			title: 'Follow your money in the currency where it happens.',
			description:
				'Every currency keeps its own code and symbol, so dollars from different places never look alike.',
			names: {
				USD: 'US Dollar',
				BRL: 'Brazilian Real',
				EUR: 'Euro',
				GBP: 'British Pound',
				ARS: 'Argentine Peso',
				MXN: 'Mexican Peso',
				CAD: 'Canadian Dollar',
				JPY: 'Japanese Yen',
				CLP: 'Chilean Peso'
			},
			regions: {
				USD: 'United States',
				BRL: 'Brazil',
				EUR: 'European Union',
				GBP: 'United Kingdom',
				ARS: 'Argentina',
				MXN: 'Mexico',
				CAD: 'Canada',
				JPY: 'Japan',
				CLP: 'Chile'
			}
		},
		overview: {
			eyebrow: 'A consolidated view',
			title: 'See the whole picture without erasing the source.',
			description:
				'Choose a base currency to understand your consolidated balance while keeping each original currency in view.',
			highlights: [
				'Consolidated balance in your chosen base currency',
				'Breakdown by original currency',
				'Current conversion rate and monthly income and expense flow'
			]
		},
		transactions: {
			eyebrow: 'Transactions and transfers',
			title: 'Capture every movement with the context that matters.',
			description:
				'You manage income, expenses, and transfers manually, with original and converted amounts side by side whenever useful.',
			highlights: [
				'Income, expenses, and transfers between accounts',
				'Recurring entries for your financial routine',
				'Search and status to find and follow every entry'
			]
		},
		planning: {
			eyebrow: 'Budgets and planning',
			title: 'Plan the month with room for real life.',
			description:
				'Set budgets, track what remains, and compare your income with spending throughout the month.',
			highlights: [
				'Category budgets and remaining amounts',
				'Income percentages to guide decisions',
				'Recurring entries included in monthly planning'
			]
		},
		wallet: {
			eyebrow: 'Accounts, cards, and sharing',
			title: 'Your wallet, synced on your terms.',
			description:
				'Organize cash, bank accounts, and cards in their native currencies. Sync uses iCloud, and sharing is optional.',
			highlights: [
				'Accounts and cards in their native currencies',
				'Sync across your devices with iCloud and CloudKit',
				'Anyone you invite can read and write the entire shared ledger'
			]
		},
		pro: {
			eyebrow: 'Troco Pro',
			title: 'More room for your financial organization.',
			description: 'Pro removes free-plan limits and enables household sharing.',
			monthly: 'R$ 9.90 per month',
			yearly: 'R$ 99.90 per year',
			trial: '7-day free trial',
			recommended: 'Best value',
			limits: 'Remove free-plan limits',
			sharing: 'Enable household-ledger sharing'
		},
		privacy: {
			eyebrow: 'Privacy by default',
			title: 'Your finances are not a product.',
			description:
				'There are no ads, usage analytics, or cross-app tracking. Troco runs no proprietary account or analytics backend for your data.',
			details:
				'CloudKit and StoreKit are Apple services. To fetch exchange rates, the app sends currency codes and, for historical lookups, a date.',
			policy: 'Read the privacy policy',
			eula: 'Apple Standard EULA'
		},
		finalCta: {
			title: 'A clearer relationship with your money starts here.',
			description:
				'Troco is coming to the App Store. If you would like to try it first, request beta access by email.',
			appStoreStatus: 'Coming soon on the App Store',
			beta: 'Request beta access'
		},
		footer: {
			privacy: 'Privacy',
			eula: 'Apple EULA',
			support: 'Contact support',
			rights: 'All rights reserved.'
		},
		screenshotAlt: {
			onboarding: 'Troco welcome screen set against a mountain landscape.',
			overview: 'Financial summary with consolidated balance, currencies, and monthly flow.',
			budgets: 'Budget summary with categories and remaining amounts.',
			transactions: 'Transaction list with original and converted amounts.',
			planning: 'Monthly planning with income, spending, and recurring entries.',
			wallet: 'Wallet with accounts and cards organized by currency.'
		},
		mail: {
			subject: 'Troco beta access',
			body: 'Hello! I would like to request beta access to Troco.'
		}
	},
	es: {
		meta: {
			title: 'Troco — tu dinero, en cada moneda',
			description:
				'Organiza cuentas, tarjetas, movimientos y presupuestos en varias monedas, con privacidad por defecto.'
		},
		nav: {
			features: 'Funciones',
			currencies: 'Monedas',
			pro: 'Pro',
			privacy: 'Privacidad',
			beta: 'Solicitar acceso beta',
			languageLabel: 'Idioma'
		},
		hero: {
			eyebrow: 'Finanzas personales sin fronteras',
			title: 'Tu dinero no se detiene en la frontera. Tu control tampoco debería hacerlo.',
			description:
				'Cuentas, tarjetas, movimientos y presupuestos en varias monedas, reunidos en una vista clara y personal.',
			appStoreStatus: 'Próximamente en la App Store',
			beta: 'Solicitar acceso beta'
		},
		currencies: {
			eyebrow: 'Nueve monedas, una rutina',
			title: 'Sigue tu dinero en la moneda en la que ocurre.',
			description:
				'Cada moneda conserva su propio código y símbolo, para que los dólares de distintos lugares nunca parezcan iguales.',
			names: {
				USD: 'Dólar estadounidense',
				BRL: 'Real brasileño',
				EUR: 'Euro',
				GBP: 'Libra esterlina',
				ARS: 'Peso argentino',
				MXN: 'Peso mexicano',
				CAD: 'Dólar canadiense',
				JPY: 'Yen japonés',
				CLP: 'Peso chileno'
			},
			regions: {
				USD: 'Estados Unidos',
				BRL: 'Brasil',
				EUR: 'Unión Europea',
				GBP: 'Reino Unido',
				ARS: 'Argentina',
				MXN: 'México',
				CAD: 'Canadá',
				JPY: 'Japón',
				CLP: 'Chile'
			}
		},
		overview: {
			eyebrow: 'Una vista consolidada',
			title: 'Ve el conjunto sin borrar el origen.',
			description:
				'Elige una moneda base para entender tu saldo consolidado y conserva a la vista cada moneda original.',
			highlights: [
				'Saldo consolidado en la moneda base elegida',
				'Desglose por moneda original',
				'Tipo de cambio actual y flujo mensual de ingresos y gastos'
			]
		},
		transactions: {
			eyebrow: 'Movimientos y transferencias',
			title: 'Registra cada movimiento con el contexto que importa.',
			description:
				'Gestionas ingresos, gastos y transferencias manualmente, con importes originales y convertidos lado a lado cuando resulta útil.',
			highlights: [
				'Ingresos, gastos y transferencias entre cuentas',
				'Movimientos recurrentes para tu rutina financiera',
				'Búsqueda y estado para encontrar y seguir cada movimiento'
			]
		},
		planning: {
			eyebrow: 'Presupuestos y planificación',
			title: 'Planifica el mes con espacio para la vida real.',
			description:
				'Define presupuestos, sigue lo que queda y compara tus ingresos con los gastos durante el mes.',
			highlights: [
				'Presupuestos por categoría e importes restantes',
				'Porcentajes de ingresos para orientar decisiones',
				'Movimientos recurrentes incluidos en la planificación mensual'
			]
		},
		wallet: {
			eyebrow: 'Cuentas, tarjetas y uso compartido',
			title: 'Tu cartera, sincronizada a tu manera.',
			description:
				'Organiza efectivo, cuentas bancarias y tarjetas en sus monedas nativas. La sincronización usa iCloud y compartir es opcional.',
			highlights: [
				'Cuentas y tarjetas en sus monedas nativas',
				'Sincronización entre tus dispositivos con iCloud y CloudKit',
				'Quien invites puede leer y editar todo el libro mayor compartido'
			]
		},
		pro: {
			eyebrow: 'Troco Pro',
			title: 'Más espacio para organizar tus finanzas.',
			description:
				'Pro elimina los límites de la versión gratuita y activa el uso compartido del hogar.',
			monthly: 'R$ 9.90 al mes',
			yearly: 'R$ 99.90 al año',
			trial: 'Prueba gratis durante 7 días',
			recommended: 'Mejor opción',
			limits: 'Elimina los límites de la versión gratuita',
			sharing: 'Activa el uso compartido del libro mayor del hogar'
		},
		privacy: {
			eyebrow: 'Privacidad por defecto',
			title: 'Tus finanzas no son un producto.',
			description:
				'No hay anuncios, analítica de uso ni seguimiento entre aplicaciones. Troco no opera una cuenta propia ni un servidor de analítica para tus datos.',
			details:
				'CloudKit y StoreKit son servicios de Apple. Para consultar tipos de cambio, la app envía los códigos de moneda y, en consultas históricas, una fecha.',
			policy: 'Leer la política de privacidad',
			eula: 'EULA estándar de Apple'
		},
		finalCta: {
			title: 'Una relación más clara con tu dinero empieza aquí.',
			description:
				'Troco llegará a la App Store. Si quieres probarlo antes, solicita acceso beta por correo electrónico.',
			appStoreStatus: 'Próximamente en la App Store',
			beta: 'Solicitar acceso beta'
		},
		footer: {
			privacy: 'Privacidad',
			eula: 'EULA de Apple',
			support: 'Contactar con soporte',
			rights: 'Todos los derechos reservados.'
		},
		screenshotAlt: {
			onboarding: 'Pantalla de bienvenida de Troco sobre un paisaje de montañas.',
			overview: 'Resumen financiero con saldo consolidado, monedas y flujo mensual.',
			budgets: 'Resumen de presupuestos con categorías e importes restantes.',
			transactions: 'Lista de movimientos con importes originales y convertidos.',
			planning: 'Planificación mensual con ingresos, gastos y movimientos recurrentes.',
			wallet: 'Cartera con cuentas y tarjetas organizadas por moneda.'
		},
		mail: {
			subject: 'Acceso beta a Troco',
			body: '¡Hola! Me gustaría solicitar acceso beta a Troco.'
		}
	}
};
