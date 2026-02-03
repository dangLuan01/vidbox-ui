"use-client"

import { Movie } from "@/app/types/movie"
import { BookmarkPlus, Calendar, Play, Plus, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function MovieCard({ movie, media_type }: { movie: Movie, media_type: string }) {
  const router                = useRouter()
  const [hovered, setHovered] = useState(false) 
  const [side, setSide]       = useState<"left" | "right">("right") 
  const cardRef               = useRef<HTMLDivElement>(null) 
  const popupWidth            = 360 
  const handleEnter           = () => { 
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
            <Star height={16} width={16} className="border-0 fill-yellow-500" strokeWidth="0.5"/>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
    </Link>
    {hovered && (
        <div className={`absolute top-0 ${side === "right" ? "left-full ml-0" : "right-full mr-2"} z-50 w-[360px] rounded-xl bg-black shadow-2xl ring-1 ring-white/10`} >
          <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
            <img src={movie.backdrop_path} alt={movie.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                <Star className="fill-yellow-500 text-yellow-500" width={14} height={14}/>
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
                      <Star className="h-3.5 w-3.5 fill-white text-white" />
                      {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
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
                <button
                  onClick={() => router.push(`/review/${movie.media_type ? movie.media_type : media_type}/${movie.id}`)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[6px] bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-200">
                  <Play width={16} height={16}/>
                  Watch Now
                </button>
                <div className="relative">
                  <button aria-label="Add to watchlist"
                  className="flex h-9 w-9 items-center justify-center rounded-[6px] border backdrop-blur-md shadow-sm transition-colors bg-white/15 text-white border-white/25 hover:bg-white/25"
                  style={{backgroundImage: "radial-gradient(120% 120% at 0% 0%, rgba(255, 183, 197, 0.22), transparent 40%), radial-gradient(120% 120% at 100% 0%, rgba(152, 206, 255, 0.2), transparent 45%), radial-gradient(120% 120% at 0% 100%, rgba(166, 255, 203, 0.2), transparent 45%)"}}>
                  <Plus height={18} width={18}/>
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
