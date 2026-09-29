// One-off generator for static/world-dots.svg: a dotted equirectangular world map
// used as a CSS mask by the travel section. The output is committed; rerun only to
// change the grid.
//
//   npm i --no-save world-atlas topojson-client d3-geo
//   node scripts/build-world-map.js
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

import { geoContains } from 'd3-geo';
import { feature } from 'topojson-client';

import { MAP } from '../src/lib/travel.js';

const STEP = 2; // degrees between dots
const require = createRequire(import.meta.url);
const topology = JSON.parse(await readFile(require.resolve('world-atlas/land-50m.json'), 'utf8'));
const land = feature(topology, topology.objects.land);

const dots = [];
for (let lat = MAP.north - STEP / 2; lat > MAP.south; lat -= STEP) {
	for (let lon = -180 + STEP / 2; lon < 180; lon += STEP) {
		if (geoContains(land, [lon, lat])) dots.push(`M${lon + 180} ${MAP.north - lat}h.01`);
	}
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP.width} ${MAP.height}"><path d="${dots.join('')}" fill="none" stroke="#000" stroke-width="1.1" stroke-linecap="round"/></svg>\n`;
await writeFile(new URL('../static/world-dots.svg', import.meta.url), svg);
console.log(`static/world-dots.svg: ${dots.length} dots, ${svg.length} bytes`);
