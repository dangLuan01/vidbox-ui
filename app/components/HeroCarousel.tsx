"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEmblaAutoplay } from "@/app/hooks/useEmblaAutoplay"
import { Movie } from "../types/movie"
import { Image } from "../types/images"
import ImageNext from "next/image"

export default function HeroCarousel( { movies, logos } : { movies: Movie[], logos: Map<number, Image>}) {
  const [ref, api] = useEmblaCarousel({ 
    loop: true, duration: 100, dragFree: false, containScroll: "trimSnaps" 
  })
  useEmblaAutoplay(api, 6000)

  return (
    <section ref={ref} className="embla relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
      <div className="embla__container h-full">
        {movies.map((movie) => (
          <div key={movie.id} className="embla__slide relative h-full w-full flex-[0_0_100%]">
            <div className="relative h-full w-full">
              <ImageNext
                src={movie.backdrop_path}
                alt={movie.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ filter: "brightness(0.8)" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-opacity-50"></div>
              <div className="absolute bottom-[20%] left-0 right-0 z-10 text-white">
                <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
                  <div className="mb-6">
                    {logos.has(movie.id) && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${logos.get(movie.id)?.file_path}`}
                      alt={movie.title}
                      className="max-h-[100px] w-auto object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    )}
                  </div>
                  <div className="mx-auto mb-2 flex items-center">
                    <span className="mr-3 flex items-center capitalize text-gray-300">
                      {movie.media_type}
                    </span>
                    <span className="mr-2 flex items-center gap-x-1 text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-4 w-4 fill-white text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="ml-2 flex items-center gap-x-1 text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                      {movie.release_date.substring(0, 4)}
                    </span>
                  </div>
                  <p className="line-clamp-3 max-w-2xl text-lg">{movie.overview}</p>
                  <div className="mt-4">
                    <a href={`/watch/${movie.media_type}/${movie.id}`}>
                      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md mr-4 border border-white bg-white px-6 py-2 font-bold text-black transition-transform hover:scale-110 hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-black pr-1"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                        Play
                      </button>
                    </a>
                    <a href={`/${movie.media_type}/${movie.id}`}><button className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:bg-secondary/80 h-10 rounded-md border border-white bg-transparent px-6 py-2 font-bold text-white transition-transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info pr-1"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>See More</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}