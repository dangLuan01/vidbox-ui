import Header from "@/app/components/Header"
import HeroCarousel from "@/app/components/HeroCarousel"
import MovieRow from "@/app/components/MovieRow"
import { movies } from "@/app/data/movies"

export default function Home() {
  return (
    <>
      <Header />
      <HeroCarousel />
      <MovieRow title="Trending" movies={movies} />
      <MovieRow title="Recommended" movies={movies} />
    </>
  )
}
