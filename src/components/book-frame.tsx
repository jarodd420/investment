import type { ReactNode } from "react"

export function BookFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-y-2 border-foreground pb-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-foreground/30 py-2 text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          <p>Jared Rodriguez</p>
          <p>Issue 1</p>
        </div>
        <h1 className="mt-4 text-center font-heading text-4xl leading-[0.95] tracking-tight text-balance sm:text-6xl">
          The Rodriguez Letter
        </h1>
        <p className="mt-3 text-center font-heading text-lg text-foreground/80 italic sm:text-xl">
          A short note on the book
        </p>
        <div className="mt-4 flex flex-col gap-1 border-t border-foreground/30 pt-3 text-center text-xs tracking-[0.14em] text-muted-foreground uppercase sm:flex-row sm:justify-between sm:text-left">
          <p>October 17, 2026</p>
          <p>Prices as of October 16</p>
        </div>
        <p className="mt-5 font-heading text-lg leading-relaxed text-pretty sm:text-xl">
          The book is five names: Apple, Amazon, NVIDIA, SpaceX, and Microsoft.
          They are ordered by one figure, the gap between the average analyst
          target and the last close. Five other companies are written up as
          replacements, not as positions. Broadcom gets a longer note, three
          points on the business itself. This is an estimate, not advice, and
          it is not a read of the chart.
        </p>
      </header>
      <div className="mt-10 flex flex-1 flex-col gap-12">{children}</div>
    </div>
  )
}
