"use-client"

import { Movie } from "@/app/types/movie"

export default function MovieCard({ movie }: { movie: Movie }) {
  
  return (
    <a href="/movie/83533">
        <div className="relative mr-2 h-52 w-32 overflow-hidden rounded-sm transition-transform duration-300 will-change-transform sm:h-52 sm:w-32 md:h-48 md:w-32 lg:h-[185px] lg:w-[122px] xl:h-[285px] xl:w-[189px] 2xl:h-[285px] 2xl:w-[189px]">
          <img src={movie.poster_path} alt={movie.title} className="h-full w-full bg-gray-500/10 object-cover opacity-100" 
          loading="lazy" decoding="async" fetchPriority="high"
                style={{aspectRatio:"2/3", objectFit:"cover", opacity:"1", visibility:"visible", display:"block", transition:"opacity 0.1s ease", transform:"translateZ(0)", backfaceVisibility:"hidden", willChange:"opacity"}} data-preload="true"
                data-cached="false" />
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bookmark-plus h-5 w-5"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path><line x1="12" x2="12" y1="7" y2="13"></line><line x1="15" x2="9" y1="10" y2="10"></line></svg>
          </button>
          <div className="absolute right-0 top-2 flex gap-1 rounded-l bg-black/50 pl-1 text-xs font-semibold text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star border-0 fill-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
    </a>
  )
}
