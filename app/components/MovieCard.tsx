import { Movie } from "@/app/types/movie"

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="w-56 shrink-0 transition hover:scale-105">
      <img
        src={movie.poster}
        className="aspect-video rounded-lg object-cover"
        alt={movie.title}
      />
      <h3 className="mt-2 text-sm">{movie.title}</h3>
    </div>
  )
}
