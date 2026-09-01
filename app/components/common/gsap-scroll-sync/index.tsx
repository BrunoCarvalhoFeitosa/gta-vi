"use client"
import { useEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const GsapScrollSync = () => {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })

    const refresh = () => ScrollTrigger.refresh()

    document.fonts?.ready.then(refresh)
    window.addEventListener("load", refresh)

    return () => {
      window.removeEventListener("load", refresh)
    }
  }, [])

  return null
}
