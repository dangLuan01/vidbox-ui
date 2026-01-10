"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEmblaHotAutoplay } from "@/app/hooks/useEmblaHotAutoplay"
import { Movie } from "@/app/types/movie"
import { Genre } from "@/app/types/genre"

export default function HotCarousel({movies, genres}: {movies: Movie[], genres:Genre[]}) {
    const options = {
        align: 'start' as const, 
        slidesToScroll: 1,
        duation: 40,
        loop: true,
    }
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const getGenreName = (id: number) => { 
        const g = genres.find((genre) => genre.id === id) 
        return g ? g.name : "Unknown" 
    }
    useEmblaHotAutoplay(emblaApi, 3500)

    return (
    <div className="absolute -bottom-20 left-0 right-0 pointer-events-none">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div ref={emblaRef} className="embla swiper mx-auto h-full pointer-events-auto">
                <div className="embla__container">
                    {movies.map((movie)=>
                    <div key={movie.id} className="embla__slide swiper-slide grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:max-w-[320px] lg:max-w-[267px] xl:max-w-[300px] md:mr-[10px]">
                        <a href={`/movie/${movie.id}`}>
                            <div className="relative h-52 md:max-w-[320px] lg:max-w-[267px] xl:max-w-[300px] overflow-hidden rounded-xl sm:h-40 md:h-32 lg:h-32 xl:h-44">
                                <img 
                                    src={movie.backdrop_path} 
                                    alt={movie.title} 
                                    className="object-cover w-full h-full transition-all duration-300 hover:scale-105" 
                                    loading="lazy" decoding="async" fetchPriority="auto"
                                    style={{filter:"brightness(0.8)", aspectRatio:"16/9", objectFit:"cover"}} 
                                    data-preload="true" data-cached="false" />
                                <div className="absolute inset-0 h-full w-full items-center justify-center rounded-2xl px-5 text-white transition duration-300 ease-in-out hover:text-red-500 hover:backdrop-blur-[2px]">
                                    <div className="absolute inset-0 left-2 right-2 top-1/2 flex flex-col truncate font-semibold md:text-xl"><span className="truncate">{movie.title}</span>
                                        <div className="flex gap-x-2 text-[10px] text-gray-400">
                                            {movie.genre_ids.map((id) => 
                                            <span key={id} className="truncate">{getGenreName(id)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
