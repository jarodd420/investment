# Investments

Jared Rodriguez’s book: a short list of holdings ranked by estimated forward ROI.

The app shows one screen. The book holds at most ten names. Right now it is Apple (AAPL), Amazon (AMZN), NVIDIA (NVDA), SpaceX (SPCX), and Microsoft (MSFT).

Five names sit beside the book as replacement candidates, not as holdings. Jared named Palo Alto Networks (PANW) and Google, scored as Alphabet Class A (GOOGL). The other three are suggested for the seat they could fill: Broadcom (AVGO) if the open seat is NVIDIA, Meta (META) if the open seat is a mega-cap platform already held, and Eli Lilly (LLY) if the open seat should not be another technology name.

Each public stock uses the same figure: consensus analyst upside, the percent gap between the average analyst price target and the last regular-session close. The screen shows the last price, the target, the implied upside, the as-of date, and a short explanation of that gap.

SpaceX is publicly traded. It listed on Nasdaq as SPCX, with trading beginning June 12, 2026, so it is scored the same way as the other names. A future holding that is not publicly traded stays on the list and is marked not rated. The app does not invent a ticker, a price, or an ROI score for a private company.

This ranking is an estimate, not investment advice.

## Public site

GitHub Pages serves the static site from the `gh-pages` branch:

[https://jarodd420.github.io/investment/](https://jarodd420.github.io/investment/)

`npm run build:pages` writes that site to `out/`, with asset paths under `/investment`. Publish a new build by replacing the `gh-pages` branch with the contents of `out/` plus a `.nojekyll` file. In the repository settings, Pages must use the `gh-pages` branch and the `/` folder.

## Run locally

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Data

Figures are a snapshot retrieved October 17, 2026, not a live quote.

- Last close: October 16, 2026, 4:00 p.m. Eastern Time, from Yahoo Finance.
- Average price target, the count of analyst price targets, and the recommendation label: Yahoo Finance, same retrieval.
- Cross-check: StockAnalysis forecast pages, which show the same average targets to the cent and attribute them to S&P Global Market Intelligence.

Source links are on the page. The recommendation label is shown for context. The order uses the upside figure only.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` builds for production.
- `npm run start` starts the production server.
- `npm run lint` runs ESLint.
