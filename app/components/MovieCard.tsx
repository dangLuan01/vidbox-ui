"use-client"

import { Movie } from "@/app/types/movie"
import { BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function MovieCard({ movie, media_type }: { movie: Movie, media_type: string }) {
  const [hovered, setHovered] = useState(false) 
  const [side, setSide] = useState<"left" | "right">("right") 
  const cardRef = useRef<HTMLDivElement>(null) 
  const popupWidth = 360 
  const handleEnter = () => { 
    if (cardRef.current) { 
      const rect = cardRef.current.getBoundingClientRect()
      if (rect.right + popupWidth > window.innerWidth) { 
        setSide("left") 
      } else { 
        setSide("right") 
      } 
    } 
    setHovered(true) 
  } 
  const handleLeave = () => setHovered(false)

  return (
    <div ref={cardRef}
      className="relative inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
    <Link href={`/${movie.media_type ? movie.media_type : media_type}/${movie.id}`}>
        <div className="relative mr-2 h-52 w-32 overflow-hidden rounded-sm transition-transform duration-300 will-change-transform sm:h-52 sm:w-32 md:h-48 md:w-32 lg:h-[185px] lg:w-[122px] xl:h-[285px] xl:w-[189px] 2xl:h-[285px] 2xl:w-[189px]">
          <img
            src={movie.poster_path}
            alt={movie.title}
            loading="lazy"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full bg-gray-500/10 object-cover transition-opacity duration-100"
            style={{aspectRatio:"2/3", objectFit:"cover",filter:"brightness(1)"}}
          />

          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-sm bg-gray-900/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"><img src="/icon-play.png" alt="play" width="25" height="25" loading="lazy" className="transform transition-transform duration-300" />
            <div className="absolute bottom-2 px-1 text-center text-sm font-semibold leading-snug sm:text-base">
              <h3 className="mb-2 line-clamp-2 text-xs font-semibold text-white">
                {movie.title}
              </h3>
              <p className="-mt-2 text-[10px] text-gray-400 uppercase">
                {movie.media_type} / {movie.release_date.substring(0,4)} / {movie.original_language}
              </p>
            </div>
          </div>
          <button className="absolute top-2 left-0.5 z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 active:scale-95 bg-black/50 text-white/70 hover:bg-blue-500/50 hover:text-white" aria-label="Add to watchlist" style={{willChange: "transform, opacity"}}>
            <BookmarkPlus className="h-5 w-5"/>
          </button>
          <div className="absolute right-0 top-2 flex gap-1 rounded-l bg-black/50 pl-1 text-xs font-semibold text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star border-0 fill-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
    </Link>
    {hovered && (
        <div className={`absolute top-0 ${side === "right" ? "left-full ml-0" : "right-full mr-2"} z-50 w-[360px] rounded-xl bg-black shadow-2xl ring-1 ring-white/10`} >
          <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
            <img src={movie.backdrop_path} alt={movie.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            <div
                className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round"
                  className="lucide lucide-star fill-yellow-500 text-yellow-500">
                  <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                  </polygon>
                </svg>
                {movie.vote_average.toFixed(1)}
            </div>
            <div className="absolute left-3 right-3 bottom-3">
                <div className="mb-2">
                  {/* <img alt={movie.title} className="max-h-10 w-auto object-contain"
                  loading="lazy" src={movie.title}/> */}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-200">
                  <span className="flex items-center gap-1 capitalize">{movie.media_type}</span>
                  <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round"
                        className="lucide lucide-star h-3.5 w-3.5 fill-white text-white">
                        <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                        </polygon>
                      </svg>
                      {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path
                            d="M6.75 3A.75.75 0 0 0 6 3.75V5h12V3.75a.75.75 0 0 0-1.5 0V5h-9V3.75A.75.75 0 0 0 6.75 3z">
                        </path>
                        <path fill-rule="evenodd"
                            d="M3 7.5A2.25 2.25 0 0 1 5.25 5.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V7.5zm3 3a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10.5zm0 3.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75z"
                            clip-rule="evenodd"></path>
                      </svg>
                      {movie.release_date.substring(0, 4)}
                  </span>
                  <span className="flex items-center gap-1 uppercase">{movie.original_language}</span>
                </div>
            </div>
          </div>
          <div className="p-2">
            <h3 className="line-clamp-1 mb-1 text-lg font-bold text-white">{movie.title}</h3>
            <div className="mb-2 min-h-[40px]">
              <p className="line-clamp-2 text-sm text-gray-300">{movie.overview}</p>
            </div>
            <div className="flex items-center gap-2">
                <Link
                  className="flex flex-1 items-center justify-center gap-2 rounded-[6px] bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-200"
                  href={movie.media_type === "movie" ? `/watch/${movie.media_type}/${movie.id}` : `/watch/${movie.media_type}/${movie.id}?season=1&episode=1`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round"
                      stroke-linejoin="round" className="lucide lucide-play">
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                  Watch Now
                </Link>
                <div className="relative">
                  <button aria-label="Add to watchlist"
                  className="flex h-9 w-9 items-center justify-center rounded-[6px] border backdrop-blur-md shadow-sm transition-colors bg-white/15 text-white border-white/25 hover:bg-white/25"
                  style={{backgroundImage: "radial-gradient(120% 120% at 0% 0%, rgba(255, 183, 197, 0.22), transparent 40%), radial-gradient(120% 120% at 100% 0%, rgba(152, 206, 255, 0.2), transparent 45%), radial-gradient(120% 120% at 0% 100%, rgba(166, 255, 203, 0.2), transparent 45%)"}}>
                  <svg
                      xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round"
                      className="lucide lucide-plus">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                  </svg>
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
