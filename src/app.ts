import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import { bopDataSchema, BopData } from './schemas.js';
import { Track, Entry, Data } from './types.js';
import { mind } from 'gradient-string';
import figlet from 'figlet';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');

const DATA_DIR = process.env.DATA_DIR ?? 'data';
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? 'output';

const TRACKS_FILE = path.resolve(rootDir, DATA_DIR, 'Tracks.json');
const OUTPUT_FILE = path.resolve(rootDir, OUTPUT_DIR, 'bop.json');

async function fetchAndValidateBop(): Promise<BopData> {
	if (!process.env.LFM_API_URL) {
		throw new Error('LFM_API_URL environment variable is not set');
	}

	const response = await fetch(`${process.env.LFM_API_URL}/api/hotlaps/getAccBop`);
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	const jsonData = await response.json();
	const parseResult = bopDataSchema.safeParse(jsonData);
	if (!parseResult.success) {
		throw new Error('Invalid BopData format');
	}

	return parseResult.data;
}

(async () => {
	try {
		console.log(
			mind(
				figlet.textSync('ACC LFM BOP SCRAPER', {
					font: 'Small',
					horizontalLayout: 'default',
					verticalLayout: 'fitted',
					width: 50,
					whitespaceBreak: true
				})
			)
		);
		console.log(mind('Powered by @APN_Carmine (GitHub)\n'));
		console.log(mind('Credits to @LFM for the API\n'));

		const tracksRaw = await fs.readFile(TRACKS_FILE, 'utf-8');
		const tracks: Track[] = JSON.parse(tracksRaw);

		const bopData = await fetchAndValidateBop();

		const entries: Entry[] = [];

		for (const trackBop of bopData) {
			const track = tracks.find((t) => t.name.toLowerCase() === trackBop.track_name.toLowerCase());
			if (!track) continue;

			const categories = ['GT3', 'GT4'] as const;
			for (const cat of categories) {
				const cars = trackBop.bop[cat];
				if (!cars) continue;

				for (const car of cars) {
					const entry: Entry = {
						track: track.alias,
						carModel: car.car_model
					};
					if (car.ballast !== undefined && car.ballast !== 0) entry.ballastKg = car.ballast;
					if (car.restrictor !== undefined && car.restrictor !== 0) entry.restrictor = car.restrictor;

					entries.push(entry);
				}
			}
		}

		const output: Data = { configVersion: 0, entries };

		await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
		await fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

		console.log(chalk.cyan(`✅ BOP saved to: ${OUTPUT_FILE}`));
	} catch (error) {
		console.error(chalk.red('❌ Error:', error));
	}
})();
