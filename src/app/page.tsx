import { BookFrame } from "@/components/book-frame"
import { MethodNotes, RankingResults } from "@/components/ranking-view"

export default function Home() {
  return (
    <BookFrame>
      <RankingResults />
      <MethodNotes />
    </BookFrame>
  )
}
