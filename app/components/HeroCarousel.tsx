"use client"

import useEmblaCarousel from "embla-carousel-react"
import { movies } from "@/app/data/movies"
import { useEmblaAutoplay } from "@/app/hooks/useEmblaAutoplay"
import { Play, Info } from "lucide-react" // Hoặc dùng thẻ <i className="..."> nếu bạn dùng FontAwesome

export default function HeroCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true, duration: 40 })
  useEmblaAutoplay(api, 8000)

  return (
    <section ref={ref} className="embla relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
      <div className="embla__container h-full">
        {movies.map((movie) => (
          <div key={movie.id} className="embla__slide relative h-full w-full flex-[0_0_100%]">
            
            {/* 1. BACKGROUND IMAGE */}
            <div className="absolute inset-0">
              <img 
                src={movie.backdrop} 
                alt={movie.title}
                className="h-full w-full object-cover object-center"
              />
              {/* Lớp phủ màu vàng/nâu để tạo chất phim "Vintage/Action" giống ảnh mẫu */}
              <div className="absolute inset-0 bg-yellow-900/20 mix-blend-overlay" />
            </div>

            {/* 2. GRADIENT OVERLAYS */}
            {/* Bóng đổ từ trái sang để làm nổi bật chữ */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
            {/* Bóng đổ từ dưới lên để nối liền với section bên dưới */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent" />

            {/* 3. CONTENT CONTAINER */}
            <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 lg:px-20 pt-10 max-w-5xl">
              
              {/* Title: Size cực lớn, font dày */}
              <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
                {movie.title}
              </h1>
              
              {/* Metadata row */}
              <div className="mt-6 flex items-center gap-4 text-sm md:text-base font-semibold text-gray-200">
                <span className="rounded bg-white/20 px-2 py-0.5 text-xs backdrop-blur-sm">Movie</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  {movie.rating}
                </span>
                <span>•</span>
                <span>{movie.year}</span>
                <span>•</span>
                <span className="text-gray-400">Action / Thriller</span>
              </div>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-300 line-clamp-3 leading-relaxed font-light">
                {movie.title || "Returning to the house where his family was brutally murdered during the war, the man who refuses to die dismantles it, loads it on a truck..."}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center gap-4">
                {/* Nút Play: Trắng đặc, chữ đen */}
                <button className="group flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-bold text-black transition-all hover:bg-gray-200 active:scale-95">
                  <Play className="w-5 h-5 fill-black" />
                  Play
                </button>
                
                {/* Nút Details: Glassmorphism (Kính mờ) */}
                <button className="group flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50 active:scale-95">
                  <Info className="w-5 h-5" />
                  More Info
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}