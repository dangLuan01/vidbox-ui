"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEmblaControls } from "@/app/hooks/useEmblaControls"
import MovieCard from "./MovieCard"
import { Movie } from "../types/movie"

export default function MovieRow({movies, media_type}: {movies: Movie[], media_type: string}) {
 const [emblaRef, emblaApi] = useEmblaCarousel({
          align: "start",
          loop: false,
          slidesToScroll: 1,
  })
  const {canPrev, canNext} = useEmblaControls(emblaApi)

  return (
    <div className="relative flex items-center pt-4">
        <div className="pointer-events-auto absolute -top-8 right-0 z-20 flex items-center rounded-xl overflow-hidden justify-center gap-[1px]">
          <button onClick={() => emblaApi && emblaApi.scrollPrev()} disabled={!canPrev} aria-label="Previous slide" className="w-8 h-7 sm:w-8 sm:h-7 md:w-9 md:h-8 bg-black/10 hover:bg-black/20 active:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/20 flex items-center justify-center smoothie disabled:bg-black/5 dark:disabled:bg-white/5 dark:shadow-[0_4px_20px_rgba(255,255,255,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[1.1rem]"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            <span className="sr-only">Previous slide</span>
          </button>
          <button onClick={() => emblaApi && emblaApi.scrollNext()} disabled={!canNext} aria-label="Next slide" className="w-8 h-7 sm:w-8 sm:h-7 md:w-9 md:h-8 bg-black/10 hover:bg-black/20 active:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/20 flex items-center justify-center smoothie disabled:bg-black/5 dark:disabled:bg-white/5 dark:shadow-[0_4px_20px_rgba(255,255,255,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[1.1rem]"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            <span className="sr-only">Next slide</span>
          </button>
        </div>
        <div className="relative w-full min-w-[350px] overflow-hidden xl:overflow-visible">
            <div ref={emblaRef} className="embla">
                <div className="embla__container flex">
                  {movies.map((movie) => 
                  <div key={movie.id} className="embla__slide !w-auto duration-100 ease-linear">
                      <div className="group relative">
                        <MovieCard movie={movie} media_type={media_type}/>
                      </div>
                  </div>
                  )}
                </div>
            </div>
        </div>
    </div>
  )
}
