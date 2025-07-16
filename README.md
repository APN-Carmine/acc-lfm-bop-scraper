# ACC LFM BOP Scraper

Scraper that generates a bop.json file from LowFuel Motorsport BOP data for use on ACC servers.

## Features

- Fetches up-to-date BOP data from LFM.
- Maps track names to ACC aliases using [`data/Tracks.json`](data/Tracks.json).
- Outputs a clean, ready-to-use [`output/bop.json`](output/bop.json) file.
- Type-safe validation using [Zod](https://github.com/colinhacks/zod).

## Requirements

- Node.js 18+
- npm

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/APN-Carmine/acc-lfm-bop-scraper.git
   cd acc-lfm-bop-scraper
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and adjust if needed:

   ```sh
   cp .env.example .env
   ```

   - `LFM_API_URL`: LFM API base URL (default is correct)
   - `DATA_DIR`: Directory for input data (default: `data`)
   - `OUTPUT_DIR`: Directory for output (default: `output`)

## Usage

To fetch the latest BOP data and generate `output/bop.json`:

```sh
npm start
```

The script will:

- Fetch BOP data from LFM.
- Validate and process the data.
- Write the result to [`output/bop.json`](output/bop.json).

## Project Structure

- [`src/app.ts`](src/app.ts): Main script.
- [`src/types.ts`](src/types.ts): TypeScript types.
- [`src/schemas.ts`](src/schemas.ts): Zod schemas for validation.
- [`data/Tracks.json`](data/Tracks.json): Track name/alias mapping.
- [`output/bop.json`](output/bop.json): Generated output.

## License

MIT

---

Credits:  
- Powered by [@APN-Carmine](https://github.com/APN-Carmine)
- Data from [LowFuel Motorsport](https://lowfuelmotorsport.com)