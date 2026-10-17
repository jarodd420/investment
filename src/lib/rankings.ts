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
    ],
  },
  {
    id: "stockanalysis",
    label: "StockAnalysis, citing S&P Global",
    detail:
      "Forecast pages retrieved October 17, 2026. Each page shows the same average price target, to the cent. StockAnalysis attributes consensus targets to S&P Global Market Intelligence. Those pages poll a different analyst count than Yahoo’s target count, so that count is not used in the rank.",
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

function describe(
  holding: HoldingInput,
  implied: number | null,
  index: number,
  ratedCount: number,
): string {
  if (
    holding.status !== "rated" ||
    holding.lastPrice == null ||
    holding.averageTarget == null ||
    implied == null
  ) {
    return `${holding.name} stays on the book and is not rated. It has no public share price, so there is no consensus upside and no ROI score.`
  }

  const gap = cents(cents(holding.averageTarget) - cents(holding.lastPrice))
  const relation = gap >= 0 ? "above" : "below"
  const place =
    index === 0
      ? "This is the widest estimated upside in the book."
      : `It ranks ${ordinal(index + 1)} of ${ratedCount} rated names on this measure.`
  const listing = holding.listingNote ? ` ${holding.listingNote}` : ""
  const coverage =
    holding.analystTargets != null
      ? ` Yahoo Finance has ${holding.analystTargets} analyst price targets behind that average.`
      : ""
  const labelNote =
    gap < 0 && holding.recommendation
      ? ` The published recommendation is still ${holding.recommendation}; this rank uses the price gap instead.`
      : ""

  return `The average target of ${formatUsd(holding.averageTarget)} is ${formatUsd(Math.abs(gap))} ${relation} the ${formatUsd(holding.lastPrice)} close (${formatUpside(implied)}).${listing} ${place}${coverage}${labelNote}`
}

export function rankHoldings(holdings: HoldingInput[]): RankedHolding[] {
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
      reason: describe(row.holding, row.implied, index, ratedCount),
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
