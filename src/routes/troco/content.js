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
			title: 'Troco — Finanças pessoais em múltiplas moedas',
			description:
				'Controle financeiro para iPhone: contas, cartões, orçamentos e transações em várias moedas, sem anúncios e sem rastreamento.'
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
		budgets: {
			eyebrow: 'Orçamentos do mês',
			title: 'Veja para onde o dinheiro vai.',
			description:
				'Quanto resta em todos os orçamentos do mês e em cada grupo de categorias, com o que já foi gasto logo abaixo.',
			highlights: [
				'Quanto ainda resta no mês, em um número só',
				'Orçamentos por grupo de categorias, com o valor restante',
				'O que foi gasto em cada orçamento, a um toque'
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
			eyebrow: 'Agenda do mês',
			title: 'Tudo o que vence, antes de vencer.',
			description:
				'Contas fixas, recorrências e faturas de cartão em uma agenda só. O que venceu aparece primeiro, com Confirmar e Adiar à mão.',
			highlights: [
				'Recorrências e lançamentos futuros no mesmo lugar',
				'Faturas de cada cartão, com o fechamento e o vencimento',
				'Confirme ou adie um compromisso sem sair da lista'
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
		import: {
			eyebrow: 'Importação inteligente',
			status: 'Em breve',
			title: 'Seu extrato entra.\nA bagunça não.',
			description:
				'Importe suas movimentações. O Troco encontra transações já registradas, identifica novas compras e deixa apenas as dúvidas para você resolver.',
			highlights: [
				'Encontra transações parecidas com as que você já registrou',
				'Reconhece o que é novo no extrato',
				'Normaliza descrições e sugere categorias',
				'Aprende com as suas decisões, no aparelho'
			],
			screens: [
				['Parece o mesmo', 'Card do Troco perguntando se é a mesma compra, com o lançamento do banco e o já registrado lado a lado.'],
				['Só no banco', 'Card para adicionar ao Troco uma compra que só aparece no extrato, com a categoria sugerida.'],
				['Só no Troco', 'Card perguntando se um lançamento que o banco não mostra deve ser mantido.'],
				['Conciliado', 'Resumo do mês conciliado, com quantos lançamentos foram conciliados automaticamente e quantos você revisou.']
			],
			formats: 'Incluída no Troco Pro. Aceita arquivos OFX, QFX, QBO e CSV.',
			note: 'Em desenvolvimento. Ainda não está disponível no app.',
			next: {
				status: 'Em breve',
				title: 'Um print do banco vira lançamento.',
				description:
					'A próxima etapa: tire um print do app do seu banco e o Troco lê uma transação ou a lista inteira. A leitura é feita pelo modelo de IA do próprio iPhone, offline. A imagem não sai do aparelho.'
			}
		},
		pro: {
			eyebrow: 'Troco Pro',
			title: 'Mais espaço para a sua organização.',
			description:
				'O Pro remove os limites da versão gratuita e habilita o compartilhamento da casa.',
			monthly: 'R$ 9,99 por mês',
			yearly: 'R$ 99,99 por ano',
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
			architecture: [
				[
					'No seu iPhone',
					'Contas, transações e orçamentos ficam primeiro em um banco de dados dentro do próprio app. Não há cadastro nem conta do Troco.'
				],
				[
					'Com a Apple',
					'iCloud e CloudKit sincronizam seus dispositivos; o StoreKit cuida da assinatura. O desenvolvedor não opera um servidor próprio para os seus dados.'
				],
				[
					'O que sai do app',
					'Para cotações, os códigos das moedas e, em consultas históricas, a data. Nenhum saldo, lançamento ou identificador. Diagnósticos técnicos são opcionais e vêm desligados.'
				]
			],
			policy: 'Ler a política de privacidade',
			eula: 'Contrato de licença padrão da Apple'
		},
		intelligence: {
			eyebrow: 'Já no app',
			title: 'Inteligente sem ser intrometido.',
			description:
				'O Troco usa o modelo de IA do próprio iPhone para entender o que chega até ele, sem transformar suas finanças em matéria-prima para publicidade ou rastreamento.',
			items: [
				'Entende o extrato de bancos diferentes',
				'Separa quem recebeu da descrição',
				'Sugere a categoria pelo nome',
				'Aprende com as suas decisões'
			],
			note:
				'Quando um recurso usa o modelo da Apple no aparelho, o processamento acontece localmente. iCloud, App Store e cotações de câmbio seguem como descrito na política de privacidade.'
		},
		cta: {
			join: 'Acessar o beta público',
			hint: 'Sem cadastro: envie o e-mail do seu Apple ID e respondemos com o convite.'
		},
		finalCta: {
			title: 'Uma relação mais clara com o seu dinheiro começa aqui.',
			description:
				'Troco está chegando à App Store. Enquanto isso, o beta público está aberto no TestFlight.',
			appStoreStatus: 'Em breve na App Store',
			beta: 'Pedir acesso beta'
		},
		footer: {
			privacy: 'Privacidade',
			eula: 'Termos de uso',
			support: 'Falar com o suporte',
			rights: 'Todos os direitos reservados.'
		},
		screenshotAlt: {
			onboarding: 'Tela de boas-vindas do Troco sobre uma paisagem de montanhas.',
			overview: 'Resumo financeiro com saldo consolidado, moedas e fluxo mensal.',
			budgets: 'Orçamentos do mês com o valor restante em cada grupo de categorias.',
			transactions: 'Lista de transações com valores originais e convertidos.',
			planning: 'Agenda do mês com recorrências, faturas de cartão e compromissos vencidos.',
			wallet: 'Carteira com contas e cartões organizados por moeda.'
		},
		mail: {
			subject: 'Acesso beta ao Troco',
			body: 'Olá! Quero testar o Troco.\n\nE-mail do meu Apple ID (para o convite): '
		}
	},
	en: {
		meta: {
			title: 'Troco — Personal finance in multiple currencies',
			description:
				'Personal finance for iPhone: accounts, cards, budgets, and transactions across currencies, with no ads and no tracking.'
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
		budgets: {
			eyebrow: 'Monthly budgets',
			title: 'See where your money goes.',
			description:
				'How much is left across every budget this month and in each category group, with what you spent right below.',
			highlights: [
				'What is left this month, in a single number',
				'Budgets by category group, with the remaining amount',
				'What went into each budget, one tap away'
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
			eyebrow: 'Monthly agenda',
			title: 'Everything that is due, before it is due.',
			description:
				'Fixed bills, recurring entries, and card statements in one agenda. Anything overdue comes first, with Confirm and Postpone at hand.',
			highlights: [
				'Recurring and future entries in one place',
				'Each card statement, with its closing and due dates',
				'Confirm or postpone a commitment without leaving the list'
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
		import: {
			eyebrow: 'Smart import',
			status: 'Coming soon',
			title: 'Your statement comes in.\nThe mess does not.',
			description:
				'Import your transactions. Troco finds the ones you already logged, spots new purchases, and leaves only the doubts for you to settle.',
			highlights: [
				'Finds transactions that look like ones you already logged',
				'Recognizes what is new in the statement',
				'Normalizes descriptions and suggests categories',
				'Learns from your decisions, on your device'
			],
			screens: [
				['Looks the same', 'Troco card asking whether it is the same purchase, with the bank entry and the logged one side by side.'],
				['Only at the bank', 'Card to add to Troco a purchase that only appears on the statement, with a suggested category.'],
				['Only in Troco', 'Card asking whether to keep an entry that the bank does not show.'],
				['Reconciled', 'Reconciled month summary, with how many entries matched automatically and how many you reviewed.']
			],
			formats: 'Included with Troco Pro. Accepts OFX, QFX, QBO, and CSV files.',
			note: 'In development. Not yet available in the app.',
			next: {
				status: 'Coming soon',
				title: 'A screenshot from your bank becomes an entry.',
				description:
					'Next up: take a screenshot of your banking app and Troco reads one transaction or the whole list. The reading runs on the iPhone\'s own AI model, offline. The image never leaves your device.'
			}
		},
		pro: {
			eyebrow: 'Troco Pro',
			title: 'More room for your financial organization.',
			description: 'Pro removes free-plan limits and enables household sharing.',
			monthly: '$2.99 per month',
			yearly: '$29.99 per year',
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
			architecture: [
				[
					'On your iPhone',
					'Accounts, transactions, and budgets are stored first in a database inside the app itself. There is no sign-up and no Troco account.'
				],
				[
					'With Apple',
					'iCloud and CloudKit sync your devices; StoreKit handles the subscription. The developer runs no server of their own for your data.'
				],
				[
					'What leaves the app',
					'For exchange rates, currency codes and, for historical lookups, a date. No balances, entries, or identifiers. Technical diagnostics are optional and off by default.'
				]
			],
			policy: 'Read the privacy policy',
			eula: 'Apple Standard EULA'
		},
		intelligence: {
			eyebrow: 'Now in the app',
			title: 'Smart without being intrusive.',
			description:
				'Troco uses the iPhone\'s own AI model to understand what comes in, without turning your finances into raw material for advertising or tracking.',
			items: [
				'Reads statements from different banks',
				'Separates who was paid from the description',
				'Suggests a category from the name',
				'Learns from your decisions'
			],
			note:
				'When a feature uses Apple\'s on-device model, processing happens locally. iCloud, the App Store, and exchange rates work as described in the privacy policy.'
		},
		cta: {
			join: 'Join the public beta',
			hint: 'No sign-up: send the email of your Apple ID and we will reply with the invite.'
		},
		finalCta: {
			title: 'A clearer relationship with your money starts here.',
			description:
				'Troco is coming to the App Store. In the meantime, the public beta is open on TestFlight.',
			appStoreStatus: 'Coming soon on the App Store',
			beta: 'Request beta access'
		},
		footer: {
			privacy: 'Privacy',
			eula: 'Terms of Use',
			support: 'Contact support',
			rights: 'All rights reserved.'
		},
		screenshotAlt: {
			onboarding: 'Troco welcome screen set against a mountain landscape.',
			overview: 'Financial summary with consolidated balance, currencies, and monthly flow.',
			budgets: 'Monthly budgets with the amount left in each category group.',
			transactions: 'Transaction list with original and converted amounts.',
			planning: 'Monthly agenda with recurring entries, card statements, and overdue commitments.',
			wallet: 'Wallet with accounts and cards organized by currency.'
		},
		mail: {
			subject: 'Troco beta access',
			body: 'Hello! I would like to try Troco.\n\nMy Apple ID email (for the invite): '
		}
	},
	es: {
		meta: {
			title: 'Troco — Finanzas personales en varias monedas',
			description:
				'Control financiero para iPhone: cuentas, tarjetas, presupuestos y movimientos en varias monedas, sin anuncios ni rastreo.'
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
		budgets: {
			eyebrow: 'Presupuestos del mes',
			title: 'Ve a dónde va tu dinero.',
			description:
				'Cuánto queda en todos los presupuestos del mes y en cada grupo de categorías, con lo gastado justo debajo.',
			highlights: [
				'Lo que queda del mes, en un solo número',
				'Presupuestos por grupo de categorías, con el importe restante',
				'Lo gastado en cada presupuesto, a un toque'
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
			eyebrow: 'Agenda del mes',
			title: 'Todo lo que vence, antes de que venza.',
			description:
				'Cuentas fijas, recurrencias y facturas de tarjeta en una sola agenda. Lo vencido aparece primero, con Confirmar y Aplazar a mano.',
			highlights: [
				'Recurrencias y movimientos futuros en el mismo lugar',
				'La factura de cada tarjeta, con su cierre y vencimiento',
				'Confirma o aplaza un compromiso sin salir de la lista'
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
		import: {
			eyebrow: 'Importación inteligente',
			status: 'Próximamente',
			title: 'Tu extracto entra.\nEl desorden no.',
			description:
				'Importa tus movimientos. Troco encuentra los que ya registraste, identifica compras nuevas y deja solo las dudas para que las resuelvas tú.',
			highlights: [
				'Encuentra movimientos parecidos a los que ya registraste',
				'Reconoce lo que es nuevo en el extracto',
				'Normaliza descripciones y sugiere categorías',
				'Aprende de tus decisiones, en tu dispositivo'
			],
			screens: [
				['Parece lo mismo', 'Tarjeta de Troco preguntando si es la misma compra, con el movimiento del banco y el registrado lado a lado.'],
				['Solo en el banco', 'Tarjeta para agregar a Troco una compra que solo aparece en el extracto, con la categoría sugerida.'],
				['Solo en Troco', 'Tarjeta que pregunta si se mantiene un movimiento que el banco no muestra.'],
				['Conciliado', 'Resumen del mes conciliado, con cuántos movimientos se conciliaron automáticamente y cuántos revisaste.']
			],
			formats: 'Incluida en Troco Pro. Acepta archivos OFX, QFX, QBO y CSV.',
			note: 'En desarrollo. Todavía no está disponible en la app.',
			next: {
				status: 'Próximamente',
				title: 'Una captura de tu banco se vuelve un movimiento.',
				description:
					'Lo siguiente: haz una captura de la app de tu banco y Troco lee un movimiento o la lista completa. La lectura la hace el modelo de IA del propio iPhone, sin conexión. La imagen no sale del dispositivo.'
			}
		},
		pro: {
			eyebrow: 'Troco Pro',
			title: 'Más espacio para organizar tus finanzas.',
			description:
				'Pro elimina los límites de la versión gratuita y activa el uso compartido del hogar.',
			monthly: 'R$ 9,99 al mes',
			yearly: 'R$ 99,99 al año',
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
			architecture: [
				[
					'En tu iPhone',
					'Cuentas, movimientos y presupuestos se guardan primero en una base de datos dentro de la propia app. No hay registro ni cuenta de Troco.'
				],
				[
					'Con Apple',
					'iCloud y CloudKit sincronizan tus dispositivos; StoreKit gestiona la suscripción. El desarrollador no opera un servidor propio para tus datos.'
				],
				[
					'Lo que sale de la app',
					'Para los tipos de cambio, los códigos de moneda y, en consultas históricas, una fecha. Ningún saldo, movimiento ni identificador. Los diagnósticos técnicos son opcionales y vienen desactivados.'
				]
			],
			policy: 'Leer la política de privacidad',
			eula: 'EULA estándar de Apple'
		},
		intelligence: {
			eyebrow: 'Ya en la app',
			title: 'Inteligente sin ser intrusivo.',
			description:
				'Troco usa el modelo de IA del propio iPhone para entender lo que le llega, sin convertir tus finanzas en materia prima para publicidad o rastreo.',
			items: [
				'Entiende extractos de bancos distintos',
				'Separa a quién se pagó de la descripción',
				'Sugiere la categoría por el nombre',
				'Aprende de tus decisiones'
			],
			note:
				'Cuando una función usa el modelo de Apple en el dispositivo, el procesamiento ocurre localmente. iCloud, la App Store y los tipos de cambio funcionan como describe la política de privacidad.'
		},
		cta: {
			join: 'Acceder a la beta pública',
			hint: 'Sin registro: envía el correo de tu Apple ID y respondemos con la invitación.'
		},
		finalCta: {
			title: 'Una relación más clara con tu dinero empieza aquí.',
			description:
				'Troco llegará a la App Store. Mientras tanto, la beta pública está abierta en TestFlight.',
			appStoreStatus: 'Próximamente en la App Store',
			beta: 'Solicitar acceso beta'
		},
		footer: {
			privacy: 'Privacidad',
			eula: 'Términos de uso',
			support: 'Contactar con soporte',
			rights: 'Todos los derechos reservados.'
		},
		screenshotAlt: {
			onboarding: 'Pantalla de bienvenida de Troco sobre un paisaje de montañas.',
			overview: 'Resumen financiero con saldo consolidado, monedas y flujo mensual.',
			budgets: 'Presupuestos del mes con el importe restante en cada grupo de categorías.',
			transactions: 'Lista de movimientos con importes originales y convertidos.',
			planning: 'Agenda del mes con recurrencias, facturas de tarjeta y compromisos vencidos.',
			wallet: 'Cartera con cuentas y tarjetas organizadas por moneda.'
		},
		mail: {
			subject: 'Acceso beta a Troco',
			body: '¡Hola! Quiero probar Troco.\n\nCorreo de mi Apple ID (para la invitación): '
		}
	}
};
