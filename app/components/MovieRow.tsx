"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEmblaAutoplay } from "@/app/hooks/useEmblaAutoplay"
import MovieCard from "./MovieCard"
import { Movie } from "@/app/types/movie"

export default function MovieRow({
  title,
  movies,
}: {
  title: string
  movies: Movie[]
}) {
  const [ref, api] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  })

  useEmblaAutoplay(api, 3500)

  return (
    <section className="px-10 py-6">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <div ref={ref} className="embla">
        <div className="embla__container gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
}
