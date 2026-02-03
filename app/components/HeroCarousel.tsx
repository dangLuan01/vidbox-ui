"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEmblaAutoplay } from "@/app/hooks/useEmblaAutoplay"
import { Movie } from "../types/movie"
import { Image } from "../types/images"
import ImageNext from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, Info, Star } from "lucide-react"
import { useEffect, useRef } from "react"

export default function HeroCarousel( { movies, logos } : { movies: Movie[], logos: Map<number, Image>}) {
  const router      = useRouter()
  const [ref, api]  = useEmblaCarousel({ 
    loop: true, 
    duration: 30, 
    dragFree: false, 
    containScroll: "trimSnaps"
  })

  const sectionRef      = useRef<HTMLElement | null>(null)
  const { play, stop }  = useEmblaAutoplay(api, 5000)

  useEffect(() => { 
    if (!sectionRef.current) return 
    const observer = new IntersectionObserver( 
      ([entry]) => { 
        entry.isIntersecting ? play() : stop() 
      }, 
      { threshold: 0.5 } 
    ) 
    observer.observe(sectionRef.current) 
    return () => observer.disconnect() 
  }, [play, stop])

  useEffect(() => { 
    const handleVisibility = () => 
      document.hidden ? stop() : play() 
    document.addEventListener("visibilitychange", handleVisibility) 
    return () => document.removeEventListener("visibilitychange", handleVisibility) 
  }, [play, stop])

  return (
    <section ref={(node) => {
      ref(node)
      sectionRef.current = node
    }} className="embla relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
      <div className="embla__container h-full transition-[transform] ease-out">
        {movies.map((movie) => (
          <div key={movie.id} className="embla__slide relative h-full w-full flex-[0_0_100%]">
            <div className="relative h-full w-full">
              <ImageNext
                src={movie.backdrop_path}
                alt={movie.title}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ filter: "brightness(0.8)" }}
              />
              <div className="absolute inset-0 bg-opacity-50"></div>
              <div className="absolute bottom-[20%] left-0 right-0 z-10 text-white">
                <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
                  <div className="mb-6">
                    {logos.has(movie.id) && (
                    <img
                      src={`${logos.get(movie.id)?.file_path}`}
                      alt={movie.title}
                      className="max-h-[100px] w-auto object-contain"
                      decoding="async"
                    />
                    )}
                  </div>
                  <div className="mx-auto mb-2 flex items-center">
                    <span className="mr-3 flex items-center capitalize text-gray-300">
                      {movie.media_type}
                    </span>
                    <span className="mr-2 flex items-center gap-x-1 text-gray-300">
                      <Star className="h-4 w-4 fill-white text-white"/>
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="ml-2 flex items-center gap-x-1 text-gray-300">
                      <Calendar className="h-4 w-4"/>
                      {movie.release_date.substring(0, 4)}
                    </span>
                  </div>
                  <p className="line-clamp-3 max-w-2xl text-lg">{movie.overview}</p>
                  <div className="mt-4">
                    <button  onClick={() => router.push(`/review/${movie.media_type}/${movie.id}`)} className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md mr-4 border border-white bg-white px-6 py-2 font-bold text-black transition-transform hover:scale-110 hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-black pr-1"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                      Play
                    </button>
                    <Link href={`/${movie.media_type}/${movie.id}`}>
                      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:bg-secondary/80 h-10 rounded-md border border-white bg-transparent px-6 py-2 font-bold text-white transition-transform hover:scale-110">
                        <Info  width="24" height="24" className="pr-1"/>
                        See More
                      </button>
                    </Link>
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