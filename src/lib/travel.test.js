import assert from 'node:assert/strict';
import test from 'node:test';

import { MAP, arcPath, countries, home, mapPlaces, project, travelStats } from './travel.js';

test('projects coordinates into the map viewBox', () => {
	assert.deepEqual(project([-180, MAP.north]), { x: 0, y: 0 });
	assert.deepEqual(project([180, MAP.south]), { x: 360, y: MAP.height });
	assert.deepEqual(project([2.35, 48.86]), { x: 182.35, y: 35.14 });
});

test('draws a quadratic arc from home bowing above both ends', () => {
	const path = arcPath([-47.88, -15.79], [2.35, 48.86]);
	const match = /^M132\.12 99\.79 Q([\d.]+) ([\d.]+) 182\.35 35\.14$/.exec(path);

	assert.ok(match, path);
	assert.ok(Number(match[2]) < 35.14);
});

test('counts unique countries and continents', () => {
	assert.deepEqual(
		travelStats([
			{ code: 'BR', continent: 'SA' },
			{ code: 'AR', continent: 'SA' },
			{ code: 'FR', continent: 'EU' },
			{ code: 'FR', continent: 'EU' }
		]),
		{ countries: 3, continents: 2 }
	);
});

test('lists every visited place except the home base, each tagged with its country', () => {
	const places = mapPlaces();

	assert.ok(places.length > 0);
	assert.ok(places.every((place) => place.countryName.en && place.countryName.pt));
	assert.ok(!places.some((place) => place.coords[0] === home.coords[0] && place.coords[1] === home.coords[1]));
	assert.ok(countries.some((country) => country.code === home.country));
});
