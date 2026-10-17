import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  CONSERVATIVE_SUMMARY,
  conservativeReading,
} from "@/lib/conservative"
import {
  BOOK_CAP,
  METHOD_SUMMARY,
  PRICE_AS_OF_LABEL,
  RETRIEVED_LABEL,
  SOURCES,
  formatUsd,
  formatUpside,
  rankBook,
  rankCandidates,
  type RankedBook,
  type RankedHolding,
} from "@/lib/rankings"

function SeatMeter({ filled, cap }: { filled: number; cap: number }) {
  const label = `${filled} of ${cap} seats filled`
  return (
    <div className="min-w-0 flex-1">
      <p className="text-sm text-foreground">{label}</p>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {Array.from({ length: cap }, (_, index) => (
          <span
            key={index}
            className={
              index < filled
                ? "h-1.5 flex-1 rounded-full bg-primary"
                : "h-1.5 flex-1 rounded-full bg-border"
            }
          />
        ))}
      </div>
    </div>
  )
}

function BookStatus({
  filled,
  cap,
  asOfLabel,
}: {
  filled: number
  cap: number
  asOfLabel: string
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SeatMeter filled={filled} cap={cap} />
      <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:text-right">
        <dt className="text-muted-foreground">Signal</dt>
        <dd>Consensus upside</dd>
        <dt className="text-muted-foreground">Price as of</dt>
        <dd>{asOfLabel}</dd>
      </dl>
    </div>
  )
}

function upsideClass(value: number | null): string {
  if (value == null) return "text-muted-foreground"
  if (value > 0) return "text-[oklch(0.38_0.09_155)]"
  if (value < 0) return "text-[oklch(0.47_0.15_27)]"
  return "text-foreground"
}

function CompanyThesis({ holding }: { holding: RankedHolding }) {
  if (!holding.thesis) return null
  const thesis = holding.thesis
  return (
    <div className="border-t border-foreground/15 pt-4">
      <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        Company fundamentals
      </p>
      <h4 className="mt-2 font-heading text-2xl leading-tight">{thesis.headline}</h4>
      <p className="mt-3 font-heading text-base leading-relaxed text-pretty">
        {thesis.intro}
      </p>
      <ol className="mt-4 flex list-none flex-col gap-4">
        {thesis.points.map((point, index) => (
          <li key={point.title} className="flex gap-3">
            <span className="font-heading text-xl leading-none text-primary tabular-nums">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="font-heading text-lg leading-snug">{point.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-pretty">{point.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {thesis.sourceNote}
      </p>
    </div>
  )
}

function ConservativeNote({ holding }: { holding: RankedHolding }) {
  const reading = conservativeReading(holding)
  return (
    <aside
      className="border-t border-foreground/15 pt-4"
      aria-label={`Conservative book on ${holding.name}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          Conservative book
        </p>
        <p className="text-[11px] tracking-[0.16em] text-primary uppercase">
          {reading.stance}
        </p>
      </div>
      <p className="mt-2 font-heading text-base leading-relaxed text-pretty">
        {reading.body}
      </p>
    </aside>
  )
}

function HoldingCard({ holding }: { holding: RankedHolding }) {
  const rated = holding.impliedUpside != null && holding.rank != null
  return (
    <Card className="rounded-none bg-transparent shadow-none ring-0">
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-heading text-2xl leading-tight">
              <span className="mr-2 tabular-nums text-muted-foreground">
                {rated ? holding.rank : "–"}
              </span>
              {holding.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {holding.symbol ? holding.symbol : "No ticker"}
              {holding.exchange ? ` · ${holding.exchange}` : ""}
              {holding.legalName !== holding.name
                ? ` · ${holding.legalName}`
                : ""}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {holding.rank === 1 && holding.picker == null ? (
                <Badge>Highest estimate</Badge>
              ) : null}
              {holding.picker === "jared" ? <Badge>Jared&apos;s pick</Badge> : null}
              {holding.picker === "suggested" ? (
                <Badge variant="secondary">Suggested</Badge>
              ) : null}
              {holding.recommendation ? (
                <Badge variant="outline">{holding.recommendation}</Badge>
              ) : null}
              {holding.status === "unrated" ? (
                <Badge variant="secondary">Not rated</Badge>
              ) : null}
            </div>
          </div>
          <p
            className={`shrink-0 text-right font-heading text-3xl leading-none tabular-nums sm:text-4xl ${upsideClass(holding.impliedUpside)}`}
          >
            {holding.impliedUpside == null
              ? "—"
              : formatUpside(holding.impliedUpside)}
          </p>
        </div>
        {holding.pickNote ? (
          <p className="text-sm leading-relaxed text-pretty">{holding.pickNote}</p>
        ) : null}
        <p className="font-heading text-base leading-relaxed text-pretty">
          {holding.reason}
        </p>
        <CompanyThesis holding={holding} />
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Last close</dt>
            <dd className="mt-1 text-sm font-medium tabular-nums">
              {holding.lastPrice == null ? "—" : formatUsd(holding.lastPrice)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Average target</dt>
            <dd className="mt-1 text-sm font-medium tabular-nums">
              {holding.averageTarget == null
                ? "—"
                : formatUsd(holding.averageTarget)}
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-xs text-muted-foreground">Analyst targets</dt>
            <dd className="mt-1 text-sm font-medium tabular-nums">
              {holding.analystTargets == null ? "—" : holding.analystTargets}
            </dd>
          </div>
        </dl>
        <ConservativeNote holding={holding} />
      </CardContent>
      <CardFooter className="px-0 text-xs text-muted-foreground">
        {rated
          ? `Inputs as of the ${PRICE_AS_OF_LABEL} close. Targets retrieved ${RETRIEVED_LABEL}.`
          : "No public price or consensus target is on file, so this name has no ROI score."}
      </CardFooter>
    </Card>
  )
}

export function EmptyBook() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="ranked-heading">
      <div>
        <h2 id="ranked-heading" className="font-heading text-3xl tracking-tight">
          In the book
        </h2>
      </div>
      <BookStatus filled={0} cap={BOOK_CAP} asOfLabel={PRICE_AS_OF_LABEL} />
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">The book is empty</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-pretty">
            Nothing to rank yet. This list holds up to {BOOK_CAP} names. A
            public stock is scored on consensus upside. A private company stays
            on the list and is marked not rated, with no invented ticker, price,
            or ROI score.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

export function RankingSkeleton() {
  return (
    <section className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the ranking</span>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-40 w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-7 w-56" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }, (_, index) => (
          <Skeleton key={index} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    </section>
  )
}

function RankingList({ book }: { book: RankedBook }) {
  const overCap = book.holdings.length > book.cap
  return (
    <section className="flex flex-col gap-6" aria-labelledby="ranked-heading">
      <div>
        <h2 id="ranked-heading" className="font-heading text-3xl tracking-tight">
          In the book
        </h2>
        <p className="mt-2 font-heading text-base leading-relaxed text-pretty text-muted-foreground">
          Five seats are filled, and the cap is ten. Sorted by estimated
          upside. The recommendation is printed for context and does not set
          the order.
        </p>
      </div>
      <BookStatus
        filled={Math.min(book.holdings.length, book.cap)}
        cap={book.cap}
        asOfLabel={book.asOfLabel}
      />
      {overCap ? (
        <p className="text-sm text-muted-foreground">
          This book is past the {book.cap}-name cap. Every name currently on
          file is still listed.
        </p>
      ) : null}
      <ol className="flex list-none flex-col gap-4">
        {book.holdings.map((holding) => (
          <li key={holding.symbol ?? holding.name}>
            <HoldingCard holding={holding} />
          </li>
        ))}
      </ol>
    </section>
  )
}

function CandidateList({ candidates }: { candidates: RankedHolding[] }) {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="candidates-heading">
      <div>
        <h2
          id="candidates-heading"
          className="font-heading text-3xl tracking-tight"
        >
          Under consideration
        </h2>
        <p className="mt-2 font-heading text-base leading-relaxed text-pretty text-muted-foreground">
          Not held. Jared named Palo Alto Networks and Google. Broadcom, Meta,
          and Eli Lilly are suggested so a swap has a chip alternative, a
          mega-cap platform that is not already owned, and one company outside
          technology. Adding all five without a sale would fill the ten-seat
          book, so they stay off the book. Same upside math, ranked among
          themselves. Broadcom’s longer note is about the company, not the
          tape.
        </p>
      </div>
      <ol className="flex list-none flex-col gap-4">
        {candidates.map((holding) => (
          <li key={holding.symbol ?? holding.name}>
            <HoldingCard holding={holding} />
          </li>
        ))}
      </ol>
    </section>
  )
}

export function RankingResults() {
  const book = rankBook()
  const candidates = rankCandidates(book.holdings)
  return (
    <>
      {book.holdings.length === 0 ? <EmptyBook /> : <RankingList book={book} />}
      <CandidateList candidates={candidates} />
    </>
  )
}

export function MethodNotes() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="method-heading">
      <Separator />
      <div>
        <h2 id="method-heading" className="font-heading text-3xl tracking-tight">
          How the figure is made
        </h2>
        <p className="mt-3 font-heading text-base leading-relaxed text-pretty">
          {METHOD_SUMMARY}
        </p>
        <p className="mt-3 font-heading text-base leading-relaxed text-pretty">
          SpaceX was checked against its June 2026 Nasdaq listing. It trades as
          SPCX, so it is rated with the same figure as Apple, Amazon, NVIDIA,
          and Microsoft.
        </p>
        <p className="mt-3 font-heading text-base leading-relaxed text-pretty">
          The names under consideration use that same figure and are not
          holdings. Google is scored as Alphabet Class A, ticker GOOGL. Class
          C, ticker GOOG, was checked and is not the share used here. Broadcom,
          Meta, and Eli Lilly were suggested for the seat they could fill. That
          suggestion is why they are on the list. Their order is still the
          upside figure. The Broadcom note beside that figure is a separate
          write-up of the company’s reported results.
        </p>
        <p className="mt-3 font-heading text-base leading-relaxed text-pretty">
          {CONSERVATIVE_SUMMARY}
        </p>
        <p className="mt-3 font-heading text-base leading-relaxed text-pretty">
          Closes are the {PRICE_AS_OF_LABEL} regular session. Average targets
          were retrieved {RETRIEVED_LABEL}. These numbers are a dated snapshot,
          not a live quote, and they are not investment advice.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Sources</h3>
        <ul className="mt-3 flex flex-col gap-4">
          {SOURCES.map((source) => (
            <li key={source.id}>
              <p className="text-sm font-medium">{source.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {source.detail}
              </p>
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {source.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
