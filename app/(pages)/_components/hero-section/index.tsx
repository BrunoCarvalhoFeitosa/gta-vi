"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LogoVIOutline } from "@/app/components/common/vectors/logo-vi-outline"
import { FaPlay } from "react-icons/fa6"

gsap.registerPlugin(ScrollTrigger)

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const uiRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      })

      tl.fromTo(imageRef.current, {
        scale: 1.10
      }, {
        scale: 1,
        ease: "none"
      })

      tl.to(uiRef.current, {
        opacity: 0,
        y: -40,
        ease: "power2.out"
      })

      tl.fromTo(logoRef.current, {
        opacity: 0,
        scale: 2.5,
      },
      {
        opacity: 1,
        scale: 1,
        ease: "power1.out",
      })

      tl.fromTo(
        blackRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "power1.out",
        },
      )

      tl.to(
        logoRef.current,{
          scale: 0.5,
          opacity: 1,
          ease: "power1.out"
        }
      )

      tl.to(logoRef.current, {
        WebkitMaskImage: "none",
        maskImage: "none",
        color: "white",
        ease: "none",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="w-full h-[400vh] relative overflow-hidden">
      <div className="sticky top-0 w-full h-screen">
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full scale-110"
        >
          <Image
            src="/images/hero/image-hero.webp"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          ref={uiRef}
          className="absolute inset-0 z-10 flex flex-col justify-between items-center py-5"
        >
          <Image
            src="/images/hero/image-logo-grand-theft-auto-white.webp"
            width={328}
            height={200}
            alt="GTA"
          />

          <button className="size-24 rounded-full bg-white flex items-center justify-center">
            <FaPlay className="text-3xl text-neutral-500" />
          </button>

          <div className="relative w-[500px] flex justify-center items-center">
            <LogoVIOutline width="190" height="72" fill="#fff" />
            <h2 className="absolute text-sm font-bold uppercase tracking-[.35em] text-white">
              Veja o 2º trailer
            </h2>
          </div>
        </div>
        <div
          ref={blackRef}
          className="absolute inset-0 bg-black z-20 opacity-0"
        />

        <div
          ref={logoRef}
          className="absolute inset-0 bg-black z-30 flex items-center justify-center font-bold uppercase text-transparent opacity-0">
            <img src="/svgs/logo-mask.svg" />
          </div>
        
        {/* <div
          ref={logoRef}
          className="absolute inset-0 z-30 flex items-center justify-center font-bold uppercase text-transparent"
          style={{
            fontSize: "15vw",
            lineHeight: 1,
            WebkitMaskImage: "url(/svgs/logo-mask.svg)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            maskImage: "url(/svgs/logo-mask.svg)",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
            transformOrigin: "50% 50%",
          }}
        >
          GRAND THEFT AUTO
        </div> */}
      </div>
    </section>
  )
}
