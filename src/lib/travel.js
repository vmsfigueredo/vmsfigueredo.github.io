/**
 * Travel map data. To add a trip, append a country (or a place inside one) below.
 * Coordinates are [longitude, latitude] of a representative city.
 *
 * @typedef {'SA' | 'NA' | 'EU' | 'AF' | 'AS' | 'OC'} Continent
 * @typedef {Record<'en' | 'pt', string>} Localized
 * @typedef {{ name: Localized, coords: [number, number] }} Place
 * @typedef {{ code: string, continent: Continent, name: Localized, places: Place[] }} Country
 */

/** Map window: equirectangular, longitudes -180..180, latitudes 84..-58 (no Antarctica). */
export const MAP = { north: 84, south: -58, width: 360, height: 142 };

export const home = {
	country: 'BR',
	name: { en: 'Brasília', pt: 'Brasília' },
	/** @type {[number, number]} */
	coords: [-47.88, -15.79]
};

/** @type {Country[]} */
export const countries = [
	{
		code: 'BR',
		continent: 'SA',
		name: { en: 'Brazil', pt: 'Brasil' },
		places: [
			{ name: { en: 'Federal District', pt: 'Distrito Federal' }, coords: [-47.88, -15.79] },
			{ name: { en: 'Espírito Santo', pt: 'Espírito Santo' }, coords: [-40.34, -20.32] },
			{ name: { en: 'São Paulo', pt: 'São Paulo' }, coords: [-46.63, -23.55] },
			{ name: { en: 'Rio Grande do Sul', pt: 'Rio Grande do Sul' }, coords: [-51.23, -30.03] },
			{ name: { en: 'Goiás', pt: 'Goiás' }, coords: [-49.25, -16.68] },
			{ name: { en: 'Minas Gerais', pt: 'Minas Gerais' }, coords: [-43.94, -19.92] }
		]
	},
	{
		code: 'AR',
		continent: 'SA',
		name: { en: 'Argentina', pt: 'Argentina' },
		places: [{ name: { en: 'Buenos Aires', pt: 'Buenos Aires' }, coords: [-58.38, -34.6] }]
	},
	{
		code: 'UY',
		continent: 'SA',
		name: { en: 'Uruguay', pt: 'Uruguai' },
		places: [{ name: { en: 'Montevideo', pt: 'Montevidéu' }, coords: [-56.16, -34.9] }]
	},
	{
		code: 'MX',
		continent: 'NA',
		name: { en: 'Mexico', pt: 'México' },
		places: [{ name: { en: 'Mexico', pt: 'México' }, coords: [-99.13, 19.43] }]
	},
	{
		code: 'US',
		continent: 'NA',
		name: { en: 'United States', pt: 'Estados Unidos' },
		places: [
			{ name: { en: 'Florida', pt: 'Flórida' }, coords: [-81.38, 28.54] },
			{ name: { en: 'Utah', pt: 'Utah' }, coords: [-111.89, 40.76] },
			{ name: { en: 'Nevada', pt: 'Nevada' }, coords: [-115.14, 36.17] }
		]
	},
	{
		code: 'PT',
		continent: 'EU',
		name: { en: 'Portugal', pt: 'Portugal' },
		places: [{ name: { en: 'Lisbon', pt: 'Lisboa' }, coords: [-9.14, 38.72] }]
	},
	{
		code: 'GB-ENG',
		continent: 'EU',
		name: { en: 'England', pt: 'Inglaterra' },
		places: [{ name: { en: 'London', pt: 'Londres' }, coords: [-0.13, 51.51] }]
	},
	{
		code: 'GB-SCT',
		continent: 'EU',
		name: { en: 'Scotland', pt: 'Escócia' },
		places: [{ name: { en: 'Edinburgh', pt: 'Edimburgo' }, coords: [-3.19, 55.95] }]
	},
	{
		code: 'FR',
		continent: 'EU',
		name: { en: 'France', pt: 'França' },
		places: [{ name: { en: 'Paris', pt: 'Paris' }, coords: [2.35, 48.86] }]
	},
	{
		code: 'ES',
		continent: 'EU',
		name: { en: 'Spain', pt: 'Espanha' },
		places: [{ name: { en: 'Madrid', pt: 'Madri' }, coords: [-3.7, 40.42] }]
	}
];

/**
 * Equirectangular projection into the map viewBox (1 unit = 1 degree).
 *
 * @param {[number, number]} coords
 */
export function project([lon, lat]) {
	return { x: round(lon + 180), y: round(MAP.north - lat) };
}

/**
 * Quadratic arc between two coordinates, bowed upwards in proportion to its length.
 *
 * @param {[number, number]} from
 * @param {[number, number]} to
 */
export function arcPath(from, to) {
	const a = project(from);
	const b = project(to);
	const length = Math.hypot(b.x - a.x, b.y - a.y);
	const cx = round((a.x + b.x) / 2);
	const cy = round(Math.max(1, Math.min(a.y, b.y) - length * 0.25));

	return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
}

/** @param {Array<{ code: string, continent: string }>} [list] */
export function travelStats(list = countries) {
	return {
		countries: new Set(list.map((item) => item.code)).size,
		continents: new Set(list.map((item) => item.continent)).size
	};
}

/** Every visited place except the home base, with its country name for labels. */
export function mapPlaces() {
	return countries.flatMap((country) =>
		country.places
			.filter((place) => place.coords[0] !== home.coords[0] || place.coords[1] !== home.coords[1])
			.map((place) => ({ ...place, code: country.code, countryName: country.name }))
	);
}

/** @param {number} value */
function round(value) {
	return Math.round(value * 100) / 100;
}
