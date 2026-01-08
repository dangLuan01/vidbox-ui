"use client"
import { useEffect, useRef, useState } from "react"

export function LazyBackground({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 scale-[1.2] opacity-60"
      style={{
        backgroundImage: loaded ? `url(${src})` : "none",
        backgroundSize: "90% 90%",
        backgroundPosition: "center",
        filter: "brightness(1.2) blur(12px)",
      }}
    />
  )
}
