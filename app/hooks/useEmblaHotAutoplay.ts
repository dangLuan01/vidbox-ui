import { useEffect, useRef } from "react"
import type { EmblaCarouselType } from "embla-carousel"

export function useEmblaHotAutoplay(
  emblaApi: EmblaCarouselType | undefined,
  delay = 4000
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!emblaApi) return

    const stop = () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }

    const play = () => {
      stop()
      timer.current = setTimeout(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext()
        }else {
          emblaApi.scrollTo(0)
        }
      }, delay)
    }

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
  }, [emblaApi, delay])
}
