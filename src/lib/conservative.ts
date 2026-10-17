/**
 * A second voice on the same snapshot.
 *
 * The letter ranks by the gap between the average analyst target and the last
 * close. These notes keep that close and that target, and name the weight a
 * more conservative book would give the seat. They do not reorder the page.
 */

import {
  formatUsd,
  formatUpside,
  type RankedHolding,
} from "@/lib/rankings"

export const CONSERVATIVE_SUMMARY =
  "Under each name, a conservative book comments on the same close and the same average target, and names the weight that gap can bear. A wide gap, or a listing with only a few public months, takes a small seat. A modest gap on a franchise the company already operates takes an ordinary or full weight. A close above the average target is a hold. Those weights leave the upside order unchanged."

export type ConservativeStance =
  | "Full weight"
  | "Ordinary weight"
  | "Modest seat"
  | "Small seat"
  | "Hold"
  | "As a replacement"
  | "Preferred addition"
  | "Unmarked"

export type ConservativeReading = {
  stance: ConservativeStance
  body: string
}

function cents(value: number): number {
  return Math.round(value * 100) / 100
}

type GapFacts = {
  price: string
  target: string
  gap: string
  upside: string
  targets: string
  aboveTarget: boolean
}

function gapFacts(holding: RankedHolding): GapFacts | null {
  if (
    holding.lastPrice == null ||
    holding.averageTarget == null ||
    holding.impliedUpside == null
  ) {
    return null
  }
  const gap = cents(cents(holding.averageTarget) - cents(holding.lastPrice))
  const targets =
    holding.analystTargets != null
      ? `${holding.analystTargets} analyst price targets`
      : "the published average"
  return {
    price: formatUsd(holding.lastPrice),
    target: formatUsd(holding.averageTarget),
    gap: formatUsd(Math.abs(gap)),
    upside: formatUpside(holding.impliedUpside),
    targets,
    aboveTarget: gap < 0,
  }
}

function gapClause(facts: GapFacts): string {
  if (facts.aboveTarget) {
    return `The ${facts.price} close stands ${facts.gap} above the ${facts.target} average (${facts.upside}), on ${facts.targets}.`
  }
  return `The gap is ${facts.gap} (${facts.upside}), from the ${facts.price} close to the ${facts.target} average, on ${facts.targets}.`
}

const NOTES: Record<string, (facts: GapFacts) => ConservativeReading> = {
  NVDA: (facts) => ({
    stance: "Small seat",
    body: `${gapClause(facts)} The rank puts NVIDIA first because that gap is the widest in the book, and the recommendation is Strong Buy. A conservative book reads a gap that wide as a forecast the price has not accepted, and it keeps the seat smaller than first place. The holding stays, at a size the book can carry if AI accelerator orders cool.`,
  }),
  SPCX: (facts) => ({
    stance: "Small seat",
    body: `${gapClause(facts)} Trading began on June 12, 2026, so the public record is a few months old, and the gap is nearly as wide as NVIDIA’s. A conservative book gives a listing this new a small seat until more reported quarters are on file.`,
  }),
  AMZN: (facts) => ({
    stance: "Ordinary weight",
    body: `${gapClause(facts)} Retail, cloud, and advertising are businesses already in operation, which is what a conservative holding rests on. The Strong Buy label asks for the average target. The seat takes an ordinary weight, sized so the book stands if that target is late.`,
  }),
  MSFT: (facts) => ({
    stance: "Full weight",
    body: `${gapClause(facts)} That is the narrowest positive gap among the five holdings, on software and cloud services the company already sells at large scale. The Strong Buy label and the modest gap agree. A conservative book gives Microsoft a full weight.`,
  }),
  AAPL: (facts) => ({
    stance: "Hold",
    body: `${gapClause(facts)} The published recommendation is still Buy. A conservative book keeps the shares it already owns and waits to add until the close is back at or under that average.`,
  }),
  AVGO: (facts) => ({
    stance: "Small seat",
    body: `${gapClause(facts)} That is the widest gap on the page. The quarter ended August 2, 2026 already produced $13.7 billion of free cash flow, so the franchise is operating. A conservative book, using Broadcom in NVIDIA’s seat, still keeps that seat small, because both names depend on the same AI spending.`,
  }),
  GOOGL: (facts) => ({
    stance: "As a replacement",
    body: `${gapClause(facts)} Search and cloud are established lines, which a conservative book can own. The book is already five technology companies. This Jared pick comes in by selling another technology seat, so the list stays five platforms.`,
  }),
  PANW: (facts) => ({
    stance: "Modest seat",
    body: `${gapClause(facts)} Security subscriptions are a steadier business than a chip cycle, and the gap is narrower than the AI names at the top of the page. A conservative book can give this Jared pick a modest seat, paid for by a sale inside the current technology list.`,
  }),
  META: (facts) => ({
    stance: "As a replacement",
    body: `${gapClause(facts)} Advertising at this scale is an established franchise, and the gap is modest beside the names above 50%. The book already holds several consumer platforms. A conservative reading uses Meta as the replacement for one of those platforms, at an ordinary weight.`,
  }),
  LLY: (facts) => ({
    stance: "Preferred addition",
    body: `${gapClause(facts)} The upside rank places Lilly last among the candidates. A conservative book treats that as the point in its favor: the close already sits near the published average, and the company sits outside the five technology names. This is the candidate a conservative book would add, in exchange for a more speculative technology seat.`,
  }),
}

function fallback(holding: RankedHolding, facts: GapFacts): ConservativeReading {
  if (facts.aboveTarget) {
    return {
      stance: "Hold",
      body: `${gapClause(facts)} The published average sits under the price. A conservative book keeps the shares it already owns and waits to add until the close is back at or under that average.`,
    }
  }
  const upside = holding.impliedUpside ?? 0
  if (upside >= 0.4) {
    return {
      stance: "Small seat",
      body: `${gapClause(facts)} A gap that wide is a forecast the price has not accepted. A conservative book keeps the seat small.`,
    }
  }
  if (upside >= 0.15) {
    return {
      stance: "Ordinary weight",
      body: `${gapClause(facts)} A conservative book can own this at an ordinary weight, with the operating franchise carrying the position.`,
    }
  }
  return {
    stance: "Full weight",
    body: `${gapClause(facts)} The price already sits near the published average. A conservative book can give this seat a full weight.`,
  }
}

export function conservativeReading(holding: RankedHolding): ConservativeReading {
  const facts = gapFacts(holding)
  if (!facts) {
    return {
      stance: "Unmarked",
      body: `${holding.name} has no public price in this letter. A conservative book leaves it unmarked until a close and an average target are on file.`,
    }
  }
  const symbol = holding.symbol
  const write = symbol ? NOTES[symbol] : undefined
  return write ? write(facts) : fallback(holding, facts)
}
