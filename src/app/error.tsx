"use client"

import { useEffect } from "react"
import { BookFrame } from "@/components/book-frame"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Error({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <BookFrame>
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">
            The ranking didn’t load
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
          <p className="text-sm leading-relaxed text-pretty">
            The saved snapshot could not be shown. This is a problem with the
            page, not a new market print. The figures are an estimate from
            public data, not investment advice.
          </p>
          <Button type="button" size="lg" onClick={() => retry()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    </BookFrame>
  )
}
