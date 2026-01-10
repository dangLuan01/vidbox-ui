import { useEffect, useRef } from "react"
import type { EmblaCarouselType } from "embla-carousel"

export function useEmblaAutoplay(
  emblaApi: EmblaCarouselType | undefined,
  delay = 6000
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
        emblaApi.scrollNext()
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
