import { useEffect, useState } from "react"
import type { EmblaCarouselType } from "embla-carousel"

export function useEmblaControls(emblaApi: EmblaCarouselType | undefined) {
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return

    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    emblaApi.on("select", updateButtons)
    updateButtons()

    return () => {
      emblaApi.off("select", updateButtons)
    }
  }, [emblaApi])

  return { canPrev, canNext }
}
