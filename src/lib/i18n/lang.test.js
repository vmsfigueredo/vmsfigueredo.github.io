import assert from 'node:assert/strict';
import test from 'node:test';

import { htmlLang, resolveInitialLocale } from './lang.js';

test('uses pt-BR only for Portuguese blog routes', () => {
	assert.equal(htmlLang('/blog/pt/lideranca-tecnica/'), 'pt-BR');
	assert.equal(htmlLang('/blog/pt'), 'pt-BR');
	assert.equal(htmlLang('/blog/en/technical-leadership/'), 'en');
	assert.equal(htmlLang('/blog/'), 'en');
	assert.equal(htmlLang('/'), 'en');
	assert.equal(htmlLang('/blog/ptx/'), 'en');
});

test('article path wins over saved preference, which wins over the browser language', () => {
	assert.equal(resolveInitialLocale({ pathname: '/blog/pt/a/', saved: 'en', navigatorLanguage: 'en-US' }), 'pt');
	assert.equal(resolveInitialLocale({ pathname: '/', saved: 'en', navigatorLanguage: 'pt-BR' }), 'en');
	assert.equal(resolveInitialLocale({ pathname: '/', saved: null, navigatorLanguage: 'pt-BR' }), 'pt');
	assert.equal(resolveInitialLocale({ pathname: '/', saved: 'fr', navigatorLanguage: 'de-DE' }), 'en');
	assert.equal(resolveInitialLocale({ pathname: '/blog/', saved: null }), 'en');
});
