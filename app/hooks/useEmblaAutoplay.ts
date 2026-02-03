import { useCallback, useEffect, useRef } from "react"
import type { EmblaCarouselType } from "embla-carousel"

export function useEmblaAutoplay(
  emblaApi: EmblaCarouselType | undefined,
  delay = 6000
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stop = useCallback(() => { 
    if (timer.current) { 
      clearTimeout(timer.current) 
      timer.current = null 
    } 
  }, [])

  const play = useCallback(() => { 
    if (!emblaApi) return 
    stop() 
    timer.current = setTimeout(() => { 
      emblaApi.scrollNext()
    }, delay) 
  }, [emblaApi, delay, stop])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("pointerDown", stop)
    emblaApi.on("pointerUp", play)
    emblaApi.on("select", play)

    play()

    return () => {
      stop()
      emblaApi.off("pointerDown", stop)
      emblaApi.off("pointerUp", play)
      emblaApi.off("select", play)
    }
  }, [emblaApi, play, stop])

  return {play, stop}
}
