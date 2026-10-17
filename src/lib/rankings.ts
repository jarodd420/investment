/**
 * Snapshot of Jared Rodriguez's book.
 *
 * Primary figures, retrieved October 17, 2026 from Yahoo Finance:
 * - Last close: v7 quote `regularMarketPrice` (regularMarketTime 2026-10-16T20:00:00Z,
 *   4:00 p.m. Eastern Time).
 * - Average target, target count, and recommendation: v10 quoteSummary
 *   `financialData.targetMeanPrice`, `numberOfAnalystOpinions`, `recommendationKey`.
 *
 * Cross-check: StockAnalysis forecast pages retrieved the same day show the same
 * average targets, to the cent, and attribute consensus targets to S&P Global
 * Market Intelligence. Analyst poll counts on those pages differ from Yahoo's
 * target-opinion counts, so the rank does not use them.
 *
 * SpaceX (legal name Space Exploration Technologies Corp.) trades on Nasdaq as
 * SPCX. The company priced its IPO on June 11, 2026 and said the shares would
 * begin trading June 12, 2026. Confirmed on the company IR release, the SEC
 * Form 424(b)(4), and the Yahoo Finance equity quote.
 */

export const BOOK_CAP = 10

export const PRICE_AS_OF_LABEL = "October 16, 2026, 4:00 p.m. ET"

export const RETRIEVED_LABEL = "October 17, 2026"

export const METHOD_SUMMARY =
  "Implied upside is the average analyst price target minus the last regular-session close, divided by that close. Every public name uses that figure, and a higher number ranks first. A company that is not publicly traded stays on the list and is marked not rated, with no ticker, price, or score invented for it."

export type RecommendationLabel =
  | "Strong Buy"
  | "Buy"
  | "Hold"
  | "Sell"
  | "Strong Sell"

export type HoldingStatus = "rated" | "unrated"

export type Picker = "jared" | "suggested"

export type HoldingInput = {
  symbol: string | null
  name: string
  legalName: string
  exchange: string | null
  status: HoldingStatus
  lastPrice: number | null
  averageTarget: number | null
  analystTargets: number | null
  recommendation: RecommendationLabel | null
  listingNote: string | null
  picker?: Picker
  pickNote?: string
}

export type RankedHolding = HoldingInput & {
  rank: number | null
  impliedUpside: number | null
  reason: string
}

export type SourceLink = {
  label: string
  href: string
}

export type SourceGroup = {
  id: string
  label: string
  detail: string
  links: SourceLink[]
}

export const HOLDINGS: HoldingInput[] = [
  {
    symbol: "AAPL",
    name: "Apple",
    legalName: "Apple Inc.",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 343.46,
    averageTarget: 329.38,
    analystTargets: 39,
    recommendation: "Buy",
    listingNote: null,
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    legalName: "Amazon.com, Inc.",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 250,
    averageTarget: 331.46,
    analystTargets: 58,
    recommendation: "Strong Buy",
    listingNote: null,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    legalName: "NVIDIA Corporation",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 214.13,
    averageTarget: 328.72,
    analystTargets: 59,
    recommendation: "Strong Buy",
    listingNote: null,
  },
  {
    symbol: "SPCX",
    name: "SpaceX",
    legalName: "Space Exploration Technologies Corp.",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 146.03,
    averageTarget: 222.71,
    analystTargets: 31,
    recommendation: "Buy",
    listingNote:
      "Space Exploration Technologies Corp. trades on the Nasdaq Global Select Market as SPCX. Trading began on June 12, 2026, so this name is public and uses the same score as the other holdings.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    legalName: "Microsoft Corporation",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 529.05,
    averageTarget: 599.24,
    analystTargets: 53,
    recommendation: "Strong Buy",
    listingNote: null,
  },
]

export const CANDIDATES: HoldingInput[] = [
  {
    symbol: "PANW",
    name: "Palo Alto Networks",
    legalName: "Palo Alto Networks, Inc.",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 342,
    averageTarget: 398.52,
    analystTargets: 50,
    recommendation: "Buy",
    listingNote: null,
    picker: "jared",
    pickNote: "Cybersecurity is not in the book today.",
  },
  {
    symbol: "GOOGL",
    name: "Google",
    legalName: "Alphabet Inc.",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 340.59,
    averageTarget: 430.51,
    analystTargets: 54,
    recommendation: "Strong Buy",
    listingNote: null,
    picker: "jared",
    pickNote:
      "Google here is Alphabet Class A, ticker GOOGL. Class C trades as GOOG and is not the share scored here.",
  },
  {
    symbol: "AVGO",
    name: "Broadcom",
    legalName: "Broadcom Inc.",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 328.75,
    averageTarget: 527.59,
    analystTargets: 47,
    recommendation: "Strong Buy",
    listingNote: null,
    picker: "suggested",
    pickNote:
      "Suggested if the open seat is NVIDIA. Broadcom is the other widely covered way to own custom AI chips and networking silicon.",
  },
  {
    symbol: "META",
    name: "Meta",
    legalName: "Meta Platforms, Inc.",
    exchange: "Nasdaq",
    status: "rated",
    lastPrice: 709.33,
    averageTarget: 814.51,
    analystTargets: 58,
    recommendation: "Strong Buy",
    listingNote: null,
    picker: "suggested",
    pickNote:
      "Suggested if the open seat is a mega-cap platform already held. Meta is the large ads-and-AI company that is not in the book.",
  },
  {
    symbol: "LLY",
    name: "Eli Lilly",
    legalName: "Eli Lilly and Company",
    exchange: "NYSE",
    status: "rated",
    lastPrice: 1257.03,
    averageTarget: 1328.05,
    analystTargets: 30,
    recommendation: "Buy",
    listingNote: null,
    picker: "suggested",
    pickNote:
      "Suggested if the open seat should not be another technology name. The book is five technology companies, and Lilly is a large, widely covered company outside that group.",
  },
]

export const SOURCES: SourceGroup[] = [
  {
    id: "yahoo",
    label: "Yahoo Finance",
    detail:
      "Last close, average analyst price target, number of analyst price targets, recommendation, and exchange. Retrieved October 17, 2026. The close is the October 16, 2026, 4:00 p.m. Eastern Time regular session.",
    links: [
      { label: "AAPL", href: "https://finance.yahoo.com/quote/AAPL/" },
      { label: "AMZN", href: "https://finance.yahoo.com/quote/AMZN/" },
      { label: "NVDA", href: "https://finance.yahoo.com/quote/NVDA/" },
      { label: "SPCX", href: "https://finance.yahoo.com/quote/SPCX/" },
      { label: "MSFT", href: "https://finance.yahoo.com/quote/MSFT/" },
      { label: "PANW", href: "https://finance.yahoo.com/quote/PANW/" },
      { label: "GOOGL", href: "https://finance.yahoo.com/quote/GOOGL/" },
      { label: "AVGO", href: "https://finance.yahoo.com/quote/AVGO/" },
      { label: "META", href: "https://finance.yahoo.com/quote/META/" },
      { label: "LLY", href: "https://finance.yahoo.com/quote/LLY/" },
    ],
  },
  {
    id: "stockanalysis",
    label: "StockAnalysis, citing S&P Global",
    detail:
      "Forecast pages retrieved October 17, 2026. Average targets match Yahoo Finance to the cent, except Eli Lilly: StockAnalysis displays that average as $1,328, and the Yahoo figure used here is $1,328.05. Both publish +5.65% upside. StockAnalysis attributes consensus targets to S&P Global Market Intelligence. Those pages poll a different analyst count than Yahoo’s target count, so that count is not used in the rank.",
    links: [
      {
        label: "AAPL",
        href: "https://stockanalysis.com/stocks/aapl/forecast/",
      },
      {
        label: "AMZN",
        href: "https://stockanalysis.com/stocks/amzn/forecast/",
      },
      {
        label: "NVDA",
        href: "https://stockanalysis.com/stocks/nvda/forecast/",
      },
      {
        label: "SPCX",
        href: "https://stockanalysis.com/stocks/spcx/forecast/",
      },
      {
        label: "MSFT",
        href: "https://stockanalysis.com/stocks/msft/forecast/",
      },
      {
        label: "PANW",
        href: "https://stockanalysis.com/stocks/panw/forecast/",
      },
      {
        label: "GOOGL",
        href: "https://stockanalysis.com/stocks/googl/forecast/",
      },
      {
        label: "AVGO",
        href: "https://stockanalysis.com/stocks/avgo/forecast/",
      },
      {
        label: "META",
        href: "https://stockanalysis.com/stocks/meta/forecast/",
      },
      {
        label: "LLY",
        href: "https://stockanalysis.com/stocks/lly/forecast/",
      },
    ],
  },
  {
    id: "spacex-listing",
    label: "SpaceX listing",
    detail:
      "SpaceX is publicly traded. The company announced that SPCX would begin trading on June 12, 2026, and the SEC prospectus registers Class A common stock under that symbol.",
    links: [
      {
        label: "IPO pricing release",
        href: "https://ir.spacex.com/updates/releases-details/2026/Space-Exploration-Technologies-Corp--Announces-Pricing-of-Initial-Public-Offering/default.aspx",
      },
      {
        label: "SEC Form 424(b)(4)",
        href: "https://www.sec.gov/Archives/edgar/data/1181412/000162828026042639/spaceexplorationtechnologi.htm",
      },
    ],
  },
]

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "exceptZero",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatUsd(value: number): string {
  return usd.format(value)
}

export function formatUpside(value: number): string {
  return percent.format(value)
}

function cents(value: number): number {
  return Math.round(value * 100) / 100
}

export function impliedUpside(lastPrice: number, averageTarget: number): number {
  const last = cents(lastPrice)
  const target = cents(averageTarget)
  return (target - last) / last
}

function ordinal(value: number): string {
  const mod100 = value % 100
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`
  switch (value % 10) {
    case 1:
      return `${value}st`
    case 2:
      return `${value}nd`
    case 3:
      return `${value}rd`
    default:
      return `${value}th`
  }
}

function nameList(holdings: RankedHolding[]): string {
  const names = holdings.map((holding) => holding.name)
  if (names.length <= 1) return names[0] ?? ""
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`
}

export function bookComparison(upside: number, book: RankedHolding[]): string {
  const rated = book.filter((holding) => holding.impliedUpside != null)
  const above = rated.filter((holding) => (holding.impliedUpside as number) > upside)
  const below = rated.filter((holding) => (holding.impliedUpside as number) < upside)
  if (above.length === 0 && below.length > 0) {
    return "On this measure the estimated upside is higher than every name in the book."
  }
  if (below.length === 0 && above.length > 0) {
    return "On this measure the estimated upside is lower than every name in the book."
  }
  const higherThan = below.length
    ? `Higher estimated upside than ${nameList(below)}.`
    : ""
  const lowerThan = above.length ? ` Lower than ${nameList(above)}.` : ""
  return `${higherThan}${lowerThan}`.trim()
}

function describe(
  holding: HoldingInput,
  implied: number | null,
  index: number,
  ratedCount: number,
  scope: "book" | "candidates",
  book?: RankedHolding[],
): string {
  if (
    holding.status !== "rated" ||
    holding.lastPrice == null ||
    holding.averageTarget == null ||
    implied == null
  ) {
    return `${holding.name} stays on the list and is not rated. It has no public share price, so there is no consensus upside and no ROI score.`
  }

  const gap = cents(cents(holding.averageTarget) - cents(holding.lastPrice))
  const relation = gap >= 0 ? "above" : "below"
  const place =
    index === 0
      ? scope === "book"
        ? "This is the widest estimated upside in the book."
        : "This is the widest estimated upside among the candidates."
      : `It ranks ${ordinal(index + 1)} of ${ratedCount} ${scope === "book" ? "rated names" : "candidates"} on this measure.`
  const listing = holding.listingNote ? ` ${holding.listingNote}` : ""
  const coverage =
    holding.analystTargets != null
      ? ` Yahoo Finance has ${holding.analystTargets} analyst price targets behind that average.`
      : ""
  const labelNote =
    gap < 0 && holding.recommendation
      ? ` The published recommendation is still ${holding.recommendation}; this rank uses the price gap instead.`
      : ""
  const comparison =
    scope === "candidates" && book
      ? ` ${bookComparison(implied, book)}`
      : ""

  return `The average target of ${formatUsd(holding.averageTarget)} is ${formatUsd(Math.abs(gap))} ${relation} the ${formatUsd(holding.lastPrice)} close (${formatUpside(implied)}).${listing} ${place}${coverage}${labelNote}${comparison}`
}

export function rankHoldings(
  holdings: HoldingInput[],
  options?: { scope?: "book" | "candidates"; book?: RankedHolding[] },
): RankedHolding[] {
  const scope = options?.scope ?? "book"
  const book = options?.book
  const scored = holdings.map((holding, givenOrder) => {
    const rated =
      holding.status === "rated" &&
      holding.lastPrice != null &&
      holding.lastPrice > 0 &&
      holding.averageTarget != null
    return {
      holding,
      givenOrder,
      implied: rated
        ? impliedUpside(holding.lastPrice as number, holding.averageTarget as number)
        : null,
    }
  })

  scored.sort((a, b) => {
    if (a.implied != null && b.implied != null) {
      if (b.implied !== a.implied) return b.implied - a.implied
      return a.givenOrder - b.givenOrder
    }
    if (a.implied != null) return -1
    if (b.implied != null) return 1
    return a.givenOrder - b.givenOrder
  })

  const ratedCount = scored.filter((row) => row.implied != null).length
  let nextRank = 1

  return scored.map((row, index) => {
    const rank = row.implied == null ? null : nextRank++
    return {
      ...row.holding,
      rank,
      impliedUpside: row.implied,
      reason: describe(row.holding, row.implied, index, ratedCount, scope, book),
    }
  })
}

export type RankedBook = {
  cap: number
  asOfLabel: string
  retrievedLabel: string
  holdings: RankedHolding[]
}

export function rankBook(): RankedBook {
  return {
    cap: BOOK_CAP,
    asOfLabel: PRICE_AS_OF_LABEL,
    retrievedLabel: RETRIEVED_LABEL,
    holdings: rankHoldings(HOLDINGS),
  }
}

export function rankCandidates(book: RankedHolding[] = rankHoldings(HOLDINGS)): RankedHolding[] {
  return rankHoldings(CANDIDATES, { scope: "candidates", book })
}
