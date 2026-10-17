import { BookFrame } from "@/components/book-frame"
import { RankingSkeleton } from "@/components/ranking-view"

export default function Loading() {
  return (
    <BookFrame>
      <RankingSkeleton />
    </BookFrame>
  )
}
