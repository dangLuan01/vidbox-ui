"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEmblaControls } from "@/app/hooks/useEmblaControls"
import { Provider } from "../types/provider"
import { LazyBackground } from "./IntersectionObserver"

export default function ProviderCarousel({providers}:{providers:Provider[]} ) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        slidesToScroll: 1,
    })
    const {canPrev, canNext} = useEmblaControls(emblaApi)
    
    return (
    <div className="mt-5">
      <div className="relative mb-4">
        <div className="flex items-center gap-2">
          <h1 className="inline-block text-lg font-bold text-black dark:bg-gradient-to-r dark:from-cyan-400 dark:to-cyan-800 dark:bg-clip-text dark:text-transparent sm:text-2xl">
            Providers
          </h1>
          <span className="text-gray-400">|</span>
          <a className="text-xs font-medium text-[rgb(2_120_253/var(--tw-text-opacity,1))] dark:text-[rgb(2_120_253/var(--tw-text-opacity,1))] hover:opacity-90"
            href="/providers">
            View All
          </a>
        </div>

        {/* Nút Prev/Next */}
        <div className="pointer-events-auto absolute top-1/2 -translate-y-1/2 right-0 z-20 flex items-center rounded-xl overflow-hidden justify-center gap-[1px]">
         <button onClick={() => emblaApi && emblaApi.scrollPrev()} disabled={!canPrev} aria-label="Previous slide" className="w-8 h-7 sm:w-8 sm:h-7 md:w-9 md:h-8 bg-black/10 hover:bg-black/20 active:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/20 flex items-center justify-center smoothie disabled:bg-black/5 dark:disabled:bg-white/5 dark:shadow-[0_4px_20px_rgba(255,255,255,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-[1.1rem]"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            <span className="sr-only">Previous slide</span>
          </button>
          <button onClick={() => emblaApi && emblaApi.scrollNext()} disabled={!canNext} aria-label="Next slide" className="w-8 h-7 sm:w-8 sm:h-7 md:w-9 md:h-8 bg-black/10 hover:bg-black/20 active:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/20 flex items-center justify-center smoothie disabled:bg-black/5 dark:disabled:bg-white/5 dark:shadow-[0_4px_20px_rgba(255,255,255,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-[1.1rem]"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            <span className="sr-only">Next slide</span>
          </button>
        </div>
      </div>

      {/* Embla wrapper */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {providers.map((provider) => (
            <div key={provider.provider_id} className="embla__slide !w-auto mr-2">
              <a className="group block h-[111px] w-[111px] overflow-hidden rounded-xl border border-gray-300/30 dark:border-gray-700/30 hover:border-gray-400/50 dark:hover:border-gray-600/50 hover:opacity-90 transition-all relative shadow-sm hover:shadow-md"
                href={`/search?page=1&watch_provider=${provider.provider_id}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-900"></div>
                <LazyBackground src={provider.logo_path} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[75px] w-[75px] rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <img
                      src={provider.logo_path}
                      alt={provider.provider_name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
