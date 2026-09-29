<script>
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { copy, currencies, languages } from './content.js';
	import { experience, importFeature, productViews, TESTFLIGHT_URL } from './experience.js';
	import Icon from './Icon.svelte';
	import { inView, watchVisible } from './motion.js';
	import './troco.css';

	/** @typedef {'pt' | 'en' | 'es'} Language */
	/** @typedef {'overview' | 'budgets' | 'transactions' | 'planning' | 'wallet'} ProductKey */

	const SITE = 'https://vitorfigueredo.dev';
	const CANONICAL_URL = `${SITE}/troco`;
	const OG_IMAGE = `${SITE}/troco/og.png`;
	const SUPPORT_EMAIL = 'me@vitorfigueredo.dev';
	// Base price is BRL; English shows US dollars. Keep these in sync with App Store Connect.
	const BRL_PRICE = { code: 'BRL', symbol: 'R$', monthly: 9.99, yearly: 99.99 };
	const PRICES = {
		pt: BRL_PRICE,
		es: BRL_PRICE,
		en: { code: 'USD', symbol: '$', monthly: 2.99, yearly: 29.99 }
	};
	const CAROUSEL_MS = 6000;
	const EULA_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
	const currencyCodes = ['USD', 'BRL', 'EUR', 'GBP', 'ARS', 'MXN', 'CAD', 'JPY', 'CLP'];
	const currencyLabelShape = Object.fromEntries(currencyCodes.map((code) => [code, 'string']));
	const completeCopyShape = {
		meta: { title: 'string', description: 'string' },
		nav: {
			features: 'string',
			currencies: 'string',
			pro: 'string',
			privacy: 'string',
			beta: 'string',
			languageLabel: 'string'
		},
		hero: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			appStoreStatus: 'string',
			beta: 'string'
		},
		currencies: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			names: currencyLabelShape,
			regions: currencyLabelShape
		},
		overview: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			highlights: ['string', 'string', 'string']
		},
		budgets: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			highlights: ['string', 'string', 'string']
		},
		transactions: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			highlights: ['string', 'string', 'string']
		},
		planning: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			highlights: ['string', 'string', 'string']
		},
		wallet: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			highlights: ['string', 'string', 'string']
		},
		import: {
			eyebrow: 'string',
			status: 'string',
			title: 'string',
			description: 'string',
			highlights: ['string', 'string', 'string', 'string'],
			screens: [
				['string', 'string'],
				['string', 'string'],
				['string', 'string'],
				['string', 'string']
			],
			formats: 'string',
			note: 'string'
		},
		pro: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			monthly: 'string',
			yearly: 'string',
			trial: 'string',
			recommended: 'string',
			limits: 'string',
			sharing: 'string'
		},
		privacy: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			architecture: [
				['string', 'string'],
				['string', 'string'],
				['string', 'string']
			],
			policy: 'string',
			eula: 'string'
		},
		intelligence: {
			eyebrow: 'string',
			title: 'string',
			description: 'string',
			items: ['string', 'string', 'string', 'string'],
			note: 'string'
		},
		cta: { join: 'string', hint: 'string' },
		finalCta: {
			title: 'string',
			description: 'string',
			appStoreStatus: 'string',
			beta: 'string'
		},
		footer: { privacy: 'string', eula: 'string', support: 'string', rights: 'string' },
		screenshotAlt: {
			onboarding: 'string',
			overview: 'string',
			budgets: 'string',
			transactions: 'string',
			planning: 'string',
			wallet: 'string'
		},
		mail: { subject: 'string', body: 'string' }
	};
	const ogLocales = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };

	/**
	 * @param {unknown} expected
	 * @param {unknown} actual
	 * @param {string} path
	 */
	function assertCopyShape(expected, actual, path) {
		if (expected === 'string') {
			if (typeof actual !== 'string' || !actual.trim()) {
				throw new Error(`Troco copy requires a non-empty string at ${path}`);
			}
			return;
		}

		if (Array.isArray(expected)) {
			if (!Array.isArray(actual) || actual.length !== expected.length) {
				throw new Error(`Troco copy has the wrong list shape at ${path}`);
			}
			expected.forEach((entry, index) =>
				assertCopyShape(entry, actual[index], `${path}[${index}]`)
			);
			return;
		}

		if (!expected || typeof expected !== 'object' || !actual || typeof actual !== 'object') {
			throw new Error(`Troco copy has the wrong value type at ${path}`);
		}

		const expectedRecord = /** @type {Record<string, unknown>} */ (expected);
		const actualRecord = /** @type {Record<string, unknown>} */ (actual);
		const expectedKeys = Object.keys(expectedRecord).sort();
		const actualKeys = Object.keys(actualRecord).sort();

		if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
			throw new Error(
				`Troco copy keys differ at ${path}: expected ${expectedKeys.join(', ')}, received ${actualKeys.join(', ')}`
			);
		}

		for (const key of expectedKeys) {
			assertCopyShape(expectedRecord[key], actualRecord[key], `${path}.${key}`);
		}
	}

	if (dev) {
		if (JSON.stringify(languages) !== JSON.stringify(['pt', 'en', 'es'])) {
			throw new Error('Troco languages must be exactly pt, en, and es');
		}

		if (JSON.stringify(currencies.map(({ code }) => code)) !== JSON.stringify(currencyCodes)) {
			throw new Error('Troco currency codes do not match the required nine-code sequence');
		}

		for (const locale of /** @type {Language[]} */ (languages)) {
			assertCopyShape(completeCopyShape, copy[locale], `copy.${locale}`);
		}
	}

	/** @type {Language} */
	let language = $state('pt');
	let pageCopy = $derived(copy[language]);
	let editorial = $derived(experience[language]);
	let selectedView = $state(0);
	let importStep = $state(0);
	let carouselHover = $state(false);
	let carouselFocus = $state(false);
	let carouselVisible = $state(false);
	let reducedMotion = $state(false);
	let selectedCurrency = $state(1);
	let annual = $state(true);
	let menuOpen = $state(false);
	let motionPaused = $state(false);
	let autoplay = $derived(!carouselHover && !carouselFocus && carouselVisible && !reducedMotion && !motionPaused);
	let activeProduct = $derived(productViews[selectedView]);
	let productCopy = $derived(pageCopy[/** @type {ProductKey} */ (activeProduct.key)]);
	let activeCurrency = $derived(currencies[selectedCurrency]);
	let importSoon = $derived(importFeature.status === 'soon');
	let price = $derived(PRICES[language]);
	let priceValue = $derived(annual ? price.yearly : price.monthly);
	let priceInteger = $derived(String(Math.trunc(priceValue)));
	let decimalSeparator = $derived(/** @type {string} */ (language) === 'en' ? '.' : ',');
	let priceDecimal = $derived(decimalSeparator + priceValue.toFixed(2).split('.')[1]);
	let betaMailto = $derived(
		`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(pageCopy.mail.subject)}&body=${encodeURIComponent(pageCopy.mail.body)}`
	);
	let betaHref = $derived(TESTFLIGHT_URL || betaMailto);
	let betaExternal = $derived(TESTFLIGHT_URL ? { target: '_blank', rel: 'noopener' } : {});
	/** @param {string} requestLabel */
	const betaLabel = (requestLabel) => (TESTFLIGHT_URL ? pageCopy.cta.join : requestLabel);
	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: 'Troco',
			description: pageCopy.meta.description,
			url: CANONICAL_URL,
			image: OG_IMAGE,
			operatingSystem: 'iOS',
			applicationCategory: 'FinanceApplication',
			author: {
				'@type': 'Person',
				name: 'Vitor Figueredo',
				url: SITE
			},
			offers: [
				{
					'@type': 'Offer',
					name: pageCopy.pro.monthly,
					price: price.monthly.toFixed(2),
					priceCurrency: price.code
				},
				{
					'@type': 'Offer',
					name: pageCopy.pro.yearly,
					price: price.yearly.toFixed(2),
					priceCurrency: price.code
				}
			]
		}).replace(/</g, '\\u003c')
	);

	// Advance the product tabs on a timer. Any change to the selection, hover, focus, or
	// visibility restarts the clock, which is what keeps the progress bar in step.
	$effect(() => {
		if (!autoplay) return;
		const timer = setTimeout(() => {
			selectedView = (selectedView + 1) % productViews.length;
		}, CAROUSEL_MS);
		return () => clearTimeout(timer);
	});

	onMount(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = query.matches;
		const onQuery = (/** @type {MediaQueryListEvent} */ event) => (reducedMotion = event.matches);
		query.addEventListener('change', onQuery);

		/** @type {string | null} */
		let saved = null;
		try {
			saved = localStorage.getItem('troco-language');
		} catch {
			// Storage can be unavailable in privacy-restricted browsing contexts.
		}

		const browserLanguage = navigator.language.toLowerCase().split('-')[0];
		const savedLanguage = saved && languages.includes(saved) ? saved : null;
		const initial = savedLanguage || (languages.includes(browserLanguage) ? browserLanguage : 'pt');

		if (languages.includes(initial)) {
			language = /** @type {Language} */ (initial);
		}

		syncDocumentLanguage();

		return () => query.removeEventListener('change', onQuery);
	});

	/** @param {string} nextLanguage */
	function selectLanguage(nextLanguage) {
		if (!languages.includes(nextLanguage)) return;

		language = /** @type {Language} */ (nextLanguage);
		try {
			localStorage.setItem('troco-language', language);
		} catch {
			// The selection remains active even when persistence is unavailable.
		}

		syncDocumentLanguage();
	}

	function syncDocumentLanguage() {
		document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
	}

	/** @param {string} name */
	const shot = (name) => `/troco/screenshots/${language}/${name}.webp`;

	/** @param {string} code */
	function currencyName(code) {
		return pageCopy.currencies.names[
			/** @type {keyof typeof pageCopy.currencies.names} */ (code)
		];
	}

	/** @param {string} code */
	function currencyRegion(code) {
		return pageCopy.currencies.regions[
			/** @type {keyof typeof pageCopy.currencies.regions} */ (code)
		];
	}
</script>

<svelte:head>
	<title>{pageCopy.meta.title}</title>
	<meta name="description" content={pageCopy.meta.description} />
	<link rel="canonical" href={CANONICAL_URL} />
	<link rel="icon" type="image/png" sizes="32x32" href="/troco/favicon-32.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/troco/favicon-192.png" />
	<link rel="apple-touch-icon" href="/troco/apple-touch-icon.png" />
	<meta property="og:title" content={pageCopy.meta.title} />
	<meta property="og:description" content={pageCopy.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Troco" />
	<meta property="og:url" content={CANONICAL_URL} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content={pageCopy.meta.title} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content={ogLocales[language]} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageCopy.meta.title} />
	<meta name="twitter:description" content={pageCopy.meta.description} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content={pageCopy.meta.title} />
	{@html `<script type="application/ld+json">${jsonLd}</scr` + `ipt>`}
</svelte:head>

<svelte:window onkeydown={(event) => { if (event.key === 'Escape') menuOpen = false; }} />

<div class="troco-page" class:motion-paused={motionPaused} lang={language === 'pt' ? 'pt-BR' : language}>
  <a class="skip-link" href="#top">{editorial.skip}</a>
  <div class="reading-progress" aria-hidden="true"></div>
  <header class="troco-nav">
    <div class="nav-inner shell">
      <a class="wordmark" href="#top" aria-label="Troco"><span class="brand-symbol"><Icon name="mark" size={25} /></span>troco<span class="wordmark-dot">.</span></a>
      <nav class="desktop-nav" aria-label="Troco">
        <a href="#features">{pageCopy.nav.features}</a>
        <a href="#currencies">{pageCopy.nav.currencies}</a>
        <a href="#privacy">{pageCopy.nav.privacy}</a>
        <a href="#pro">Troco Pro <span class="tiny-dot"></span></a>
      </nav>
      <div class="nav-actions">
        <div class="language-picker" role="group" aria-label={pageCopy.nav.languageLabel}>
          {#each languages as locale}
            <button type="button" class:active={language === locale} aria-pressed={language === locale} onclick={() => selectLanguage(locale)}>{locale.toUpperCase()}</button>
          {/each}
        </div>
        <a class="button button-dark nav-cta" href={betaHref} {...betaExternal}>{betaLabel(pageCopy.nav.beta)}<Icon name="diagonal" size={16} /></a>
        <button class="icon-button mobile-toggle" type="button" aria-label={menuOpen ? editorial.close : editorial.menu} aria-expanded={menuOpen} aria-controls="mobile-navigation" onclick={() => menuOpen = !menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
    </div>
    <nav id="mobile-navigation" class="mobile-nav" hidden={!menuOpen} aria-label="Troco">
      <a href="#features" onclick={() => menuOpen = false}>{pageCopy.nav.features}<Icon /></a>
      <a href="#currencies" onclick={() => menuOpen = false}>{pageCopy.nav.currencies}<Icon /></a>
      <a href="#privacy" onclick={() => menuOpen = false}>{pageCopy.nav.privacy}<Icon /></a>
      <a href="#pro" onclick={() => menuOpen = false}>Troco Pro<Icon /></a>
      <a href={betaHref} {...betaExternal} onclick={() => menuOpen = false}>{betaLabel(pageCopy.nav.beta)}<Icon name="diagonal" /></a>
    </nav>
  </header>

  <section id="top" class="hero shell" use:inView>
    <div class="hero-copy">
      <p class="eyebrow"><span class="tiny-dot"></span>{pageCopy.hero.eyebrow}</p>
      <h1>{editorial.headline[0]}<br /><span>{editorial.headline[1]}</span></h1>
      <p class="hero-description">{editorial.intro}</p>
      <div class="hero-actions">
        <a class="button button-dark" href={betaHref} {...betaExternal}>{betaLabel(pageCopy.hero.beta)}<Icon name="diagonal" /></a>
        <a class="text-link" href="#features">{editorial.explore}<Icon name="down" size={17} /></a>
      </div>
      <p class="availability"><Icon name="phone" size={16} />{editorial.platform}<span></span>{pageCopy.hero.appStoreStatus}</p>
    </div>
    <div class="hero-art">
      <div class="orbital-scene" aria-hidden="true">
        <div class="hero-disc"></div>
        <svg class="orbit-grid" viewBox="0 0 600 600" fill="none"><circle cx="300" cy="300" r="250" /><ellipse cx="300" cy="300" rx="140" ry="250" transform="rotate(-25 300 300)"/><ellipse cx="300" cy="300" rx="250" ry="92" transform="rotate(-25 300 300)"/><circle cx="300" cy="300" r="290" stroke-dasharray="2 9" /></svg>
        <div class="currency-float currency-float-usd"><small>USD</small><strong>$</strong></div>
        <div class="currency-float currency-float-eur"><small>EUR</small><strong>€</strong></div>
        <div class="currency-float currency-float-brl"><small>BRL</small><strong>R$</strong></div>
        <span class="orbital-point point-one"></span><span class="orbital-point point-two"></span>
      </div>
      <figure class="hero-phone phone">
        <img src={shot('02-resumo')} alt={pageCopy.screenshotAlt.overview} width="720" height="1565" decoding="async" fetchpriority="high" />
      </figure>
      <div class="hero-caption"><span class="caption-icon"><Icon name="globe" size={23} /></span><span>{editorial.heroNote}<small>{editorial.platform}</small></span><Icon name="check" size={17} /></div>
      <button class="motion-control icon-button" type="button" aria-label={motionPaused ? editorial.play : editorial.pause} aria-pressed={motionPaused} onclick={() => motionPaused = !motionPaused}><Icon name={motionPaused ? 'play' : 'pause'} size={16} /></button>
    </div>
    <div class="hero-bottom"><span>Troco / iOS</span><span>{editorial.sample}</span><a href="#features" aria-label={editorial.explore}><Icon name="down" size={18} /></a></div>
  </section>

  <div class="benefits-strip">
    <div class="shell benefits-inner">
      {#each editorial.pillars as pillar, i}<p><Icon name={['globe', 'cloud', 'shield'][i]} size={21} />{pillar}</p>{/each}
    </div>
  </div>

  <section id="features" class="product-section shell section-space" use:inView>
    <div class="section-heading enter">
      <div><p class="eyebrow"><span class="section-number">01 /</span>{editorial.productEyebrow}</p><h2>{editorial.productTitle}</h2></div>
      <p>{editorial.productIntro}</p>
    </div>
    <div class="product-carousel" role="group" aria-label={pageCopy.nav.features} style="--carousel-ms: {CAROUSEL_MS}ms" use:watchVisible={(/** @type {boolean} */ visible) => (carouselVisible = visible)} onmouseenter={() => (carouselHover = true)} onmouseleave={() => (carouselHover = false)} onfocusin={() => (carouselFocus = true)} onfocusout={() => (carouselFocus = false)}>
    <div class="product-selector enter" role="group" aria-label={pageCopy.nav.features}>
      {#each productViews as view, index}<button type="button" class:active={selectedView === index} aria-pressed={selectedView === index} aria-controls="product-detail" onclick={() => selectedView = index}><Icon name={view.icon} /><span>{editorial.tabs[index]}</span><span class="selector-number">0{index + 1}</span></button>{/each}
    </div>
    <div class="product-stage enter" id="product-detail">
      <div class="product-detail" aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true">
        {#key selectedView}
          <div class="swap-content">
            <span class="feature-icon"><Icon name={activeProduct.icon} size={27} /></span>
            <p class="eyebrow">{productCopy.eyebrow}</p>
            <h3>{productCopy.title}</h3>
            <p class="product-description">{productCopy.description}</p>
            <ul class="check-list">{#each productCopy.highlights as highlight}<li><Icon name="check" size={17} /><span>{highlight}</span></li>{/each}</ul>
          </div>
        {/key}
        <div class="feature-pagination"><span>0{selectedView + 1}</span><div>{#each productViews as view, index}<span class:active={index === selectedView} class:running={autoplay && index === selectedView}></span>{/each}</div><span>0{productViews.length}</span></div>
      </div>
      <div class="product-preview">
        <span class="preview-type" aria-hidden="true">{editorial.tabs[selectedView]}</span>
        {#key selectedView}<figure class="product-phone phone swap-content"><img src={shot(activeProduct.image)} alt={pageCopy.screenshotAlt[/** @type {ProductKey} */ (activeProduct.key)]} width="720" height="1565" loading="lazy" decoding="async" /></figure>{/key}
        <p class="preview-caption">{editorial.sample}</p>
      </div>
    </div>
    </div>
  </section>

  <section id="currencies" class="currency-section section-space" use:inView>
    <div class="shell currency-layout">
      <div class="currency-copy enter">
        <p class="eyebrow"><span class="section-number">02 /</span>{pageCopy.currencies.eyebrow}</p>
        <h2>{editorial.currencyTitle}</h2><p class="section-description">{editorial.currencyIntro}</p>
        <p class="currency-hint">{editorial.currencyHint}<Icon name="down" size={16} /></p>
        <div class="currency-picker" role="group" aria-label={pageCopy.nav.currencies}>
          {#each currencies as currency, index}<button type="button" class:active={selectedCurrency === index} aria-pressed={selectedCurrency === index} aria-label={currencyName(currency.code) + ' (' + currency.code + ')'} onclick={() => selectedCurrency = index}>{currency.code}</button>{/each}
        </div>
        <p class="currency-footnote"><Icon name="check" size={18} />{editorial.currencyNote}</p>
      </div>
      <div class="currency-display enter" aria-live="polite" aria-atomic="true">
        <div class="currency-globe" aria-hidden="true"><svg viewBox="0 0 500 500" fill="none"><circle cx="250" cy="250" r="210"/>{#each [50, 115, 170] as radius}<ellipse cx="250" cy="250" rx={radius} ry="210"/>{/each}<ellipse cx="250" cy="250" rx="210" ry="65"/><ellipse cx="250" cy="250" rx="210" ry="145"/><path d="M40 250h420M250 40v420"/></svg></div>
        {#key selectedCurrency}<div class="currency-face swap-content"><span>{editorial.currencyLabel} / {activeCurrency.code}</span><strong>{activeCurrency.symbol}</strong><h3>{currencyName(activeCurrency.code)}</h3><p>{currencyRegion(activeCurrency.code)}</p></div>{/key}
        <span class="currency-count">0{selectedCurrency + 1} <span>/ 09</span></span>
      </div>
    </div>
  </section>

  <section id="import" class="import-section section-space" aria-labelledby="import-title" use:inView>
    <div class="shell import-layout">
      <div class="import-copy enter">
        <p class="eyebrow"><span class="section-number">03 /</span>{pageCopy.import.eyebrow}{#if importSoon}<span class="soon-badge">{pageCopy.import.status}</span>{/if}</p>
        <h2 id="import-title">{pageCopy.import.title}</h2>
        <p class="section-description">{pageCopy.import.description}</p>
        <ul class="check-list">{#each pageCopy.import.highlights as highlight}<li><Icon name="check" size={17} /><span>{highlight}</span></li>{/each}</ul>
        <p class="import-note">{importSoon ? pageCopy.import.note : pageCopy.import.formats}</p>
      </div>
      <figure class="import-preview enter">
        {#key importStep}<div class="phone import-phone swap-content"><img src={shot('import-' + (importStep + 1))} alt={pageCopy.import.screens[importStep][1]} width="720" height="1565" loading="lazy" decoding="async" /></div>{/key}
        <div class="import-steps" role="group" aria-label={pageCopy.import.eyebrow}>{#each pageCopy.import.screens as screen, index}<button type="button" class:active={importStep === index} aria-pressed={importStep === index} onclick={() => importStep = index}>{screen[0]}</button>{/each}</div>
        <figcaption class="preview-caption">{editorial.sample}</figcaption>
      </figure>
    </div>
  </section>

  <section id="privacy" class="privacy-section shell section-space" aria-labelledby="privacy-title" use:inView>
    <div class="privacy-top enter"><p class="eyebrow"><span class="section-number">04 /</span>{pageCopy.privacy.eyebrow}</p><Icon name="shield" size={31} /></div>
    <div class="privacy-layout">
      <h2 id="privacy-title" class="privacy-title enter">{#each editorial.principles as principle}<span>{principle}</span>{/each}</h2>
      <div class="privacy-detail enter"><p class="privacy-lead">{pageCopy.privacy.title}</p><p>{pageCopy.privacy.description}</p><a class="text-link" href="/troco/privacy.html">{pageCopy.privacy.policy}<Icon name="diagonal" size={17} /></a></div>
    </div>
    <div class="privacy-arch enter">{#each pageCopy.privacy.architecture as item}<div><h3>{item[0]}</h3><p>{item[1]}</p></div>{/each}</div>
    <div class="intelligence enter" aria-labelledby="intelligence-title">
      <div><p class="eyebrow"><span class="tiny-dot"></span>{pageCopy.intelligence.eyebrow}</p><h3 id="intelligence-title">{pageCopy.intelligence.title}</h3></div>
      <div><p class="intelligence-lead">{pageCopy.intelligence.description}</p><ul class="chip-list">{#each pageCopy.intelligence.items as item}<li>{item}</li>{/each}</ul><p class="privacy-small">{pageCopy.intelligence.note}</p></div>
    </div>
    <div class="privacy-bottom enter"><span><Icon name="lock" size={18} />{editorial.privateLabel}</span><span><Icon name="cloud" size={20} />{editorial.cloudLabel}</span></div>
  </section>

  <section id="pro" class="pro-section section-space" use:inView>
    <div class="shell pro-layout">
      <div class="pro-copy enter"><p class="eyebrow"><span class="section-number">05 /</span>Troco Pro</p><h2>{editorial.proTitle}</h2><p>{pageCopy.pro.description}</p><ul class="check-list"><li><Icon name="check" size={18} />{pageCopy.pro.limits}</li><li><Icon name="check" size={18} />{pageCopy.pro.sharing}</li></ul></div>
      <div class="price-card enter">
        <div class="price-top"><span class="pro-wordmark">troco<span>pro</span></span><Icon name="diagonal" size={25} /></div>
        <div class="billing-switch" role="group" aria-label="Troco Pro"><button type="button" class:active={!annual} aria-pressed={!annual} onclick={() => annual = false}>{editorial.month}</button><button type="button" class:active={annual} aria-pressed={annual} onclick={() => annual = true}>{editorial.year}</button></div>
        <div class="price-value" aria-live="polite" aria-atomic="true"><span>{price.symbol}</span><strong>{priceInteger}<span>{priceDecimal}</span></strong><span>{annual ? editorial.perYear : editorial.perMonth}</span></div>
        <p class="price-saving">{annual ? editorial.annualSaving : pageCopy.pro.trial}</p>
        <a class="button button-dark" href={betaHref} {...betaExternal}>{betaLabel(pageCopy.hero.beta)}<Icon name="diagonal" /></a>
        <p class="trial-note">{pageCopy.pro.trial}</p><p class="price-note">{editorial.priceNote}</p>
      </div>
    </div>
  </section>

  <section class="faq-section shell section-space" use:inView>
    <div class="faq-heading enter"><p class="eyebrow">{editorial.faqLabel}</p><h2>{editorial.faqTitle}</h2></div>
    <div class="faq-list enter">{#each editorial.faqs as faq}<details><summary>{faq[0]}<Icon name="plus" size={20} /></summary><p>{faq[1]}</p></details>{/each}</div>
  </section>

  <section class="final-cta" use:inView>
    <div class="shell final-inner enter"><p class="eyebrow">{editorial.footerNote}</p><h2>{editorial.finalTitle[0]}<br /><span>{editorial.finalTitle[1]}</span></h2><div class="final-actions"><a class="button button-dark" href={betaHref} {...betaExternal}>{betaLabel(pageCopy.finalCta.beta)}<Icon name="diagonal" /></a><span>{pageCopy.finalCta.appStoreStatus}</span></div>{#if !TESTFLIGHT_URL}<p class="cta-hint">{pageCopy.cta.hint}</p>{/if}<div class="final-symbol" aria-hidden="true"><Icon name="mark" size={280} /></div></div>
  </section>

  <footer class="troco-footer shell"><div class="footer-top"><a class="wordmark" href="#top" aria-label="Troco"><span class="brand-symbol"><Icon name="mark" size={25} /></span>troco<span class="wordmark-dot">.</span></a><p>{editorial.footerNote}</p><a href="#top" class="back-top" aria-label="Troco"><Icon name="arrow" size={22} /></a></div><div class="footer-bottom"><p>© 2026 Troco. {pageCopy.footer.rights}</p><nav aria-label="Troco"><a href="/troco/privacy.html">{pageCopy.footer.privacy}</a><a href={EULA_URL}>{pageCopy.footer.eula}</a><a href={`mailto:${SUPPORT_EMAIL}`}>{pageCopy.footer.support}</a></nav></div></footer>
</div>
