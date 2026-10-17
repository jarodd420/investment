import type { ReactNode } from "react"

export function BookFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-foreground/15 pb-6">
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Jared Rodriguez
        </p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
          The book, by estimated ROI
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-foreground/80">
          Five holdings, ordered by how far the average analyst target sits from
          the last close. The same math applies to every public name. There is
          room for ten. This is an estimate, not investment advice.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Named in this order: Apple, Amazon, NVIDIA, SpaceX, and Microsoft.
        </p>
      </header>
      <div className="mt-8 flex flex-1 flex-col gap-10">{children}</div>
    </div>
  )
}
