"use client"
import { useEffect, useRef } from "react"
import { useVideoModalStore } from "@/app/store/video-modal-store"
import { isMobile } from 'react-device-detect'
import gsap from "gsap"
import Image from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LogoVIOutline } from "@/app/components/common/vectors/logo-vi-outline"
import { VectorPS5 } from "@/app/components/vectors/vector-ps5"
import { VectorXbox } from "@/app/components/vectors/vector-xbox"
import { FaPlay } from "react-icons/fa6"
import { VectorArrowDown } from "@/app/components/vectors/vector-arrow-down"
import { GRADIENT_END, GRADIENT_START } from "@/app/utils"

gsap.registerPlugin(ScrollTrigger)

export const HeroSection = () => {
  const { setOpenVideoModal } = useVideoModalStore()
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const uiRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const blackContentRef = useRef<HTMLDivElement>(null)
  const gtaLogoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const platformsRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const handleVideoModalOpen = () => {
    setOpenVideoModal(true)
    document.body.style.overflow = "hidden"
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=500%",
          scrub: true,
          pin: true
        }
      })

      tl.fromTo(
        imageRef.current, {
          scale: 1.1
        },
        {
          scale: 1,
          ease: "none"
        }
      )

      tl.fromTo(
        arrowRef.current,
        {
          opacity: 1,
          y: 0
        },
        {
          opacity: 1,
          y: 0
        }, 0
      )

      tl.to(
        uiRef.current, {
          opacity: 0,
          y: -40,
          ease: "power2.out"
        }, "<"
      )

      tl.to(
        blackRef.current, {
          opacity: 1,
          ease: "none"
        }
      )

      tl.to(
        blackContentRef.current, {
          opacity: 1,
          ease: "none"
        }, "<"
      )

      tl.fromTo(
        gtaLogoRef.current, {
          scale: 2.2,
          opacity: 1
        },
        {
          scale: 0.5,
          y: -80,
          ease: "none"
        }
      )

      tl.fromTo(
        textRef.current, {
          opacity: 0,
          backgroundPosition: "50% 80%"
        },
        {
          opacity: 1,
          backgroundPosition: "50% 20%",
          y: isMobile ? -120 : -210,
          backgroundImage: GRADIENT_START,
          ease: "none"
        }
      )

      tl.fromTo(
        platformsRef.current, {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: isMobile ? -80 : -170,
          ease: "power2.out"
        }
      )

      tl.to(
        arrowRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.out"
        },
        ">"
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
    >
      <div className="w-full h-screen">
        <div
          ref={imageRef}
          className="absolute inset-0 scale-110 will-change-transform"
        >
          <Image
            src="/images/hero/image-hero.webp"
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div
          ref={uiRef}
          className="absolute inset-0 flex flex-col items-center justify-between py-14 lg:pt-0 lg:py-16 z-999"
        >
          <Image
            src="/svgs/logo-mask.svg"
            width={520}
            height={400}
            alt="GTA"
          />
          <button
            type="button"
            className="size-24 lg:size-30 rounded-full bg-white flex items-center justify-center outline-none transition-transform duration-500 hover:scale-125 cursor-pointer"
            onClick={handleVideoModalOpen}
          >
            <FaPlay className="text-3xl lg:text-4xl text-neutral-700" />
          </button>
          <div className="flex flex-col justify-center items-center">
            <div className="relative flex items-center justify-center w-125">
              <LogoVIOutline width="240" height="100" fill="#fff" />
              <h2 className="absolute top-[45%] -translate-y-[45%] font-sans text-base lg:text-lg font-bold uppercase tracking-[.35em] text-white">
                Veja o 2º trailer
              </h2>
            </div>
          </div>
        </div>
        <div
          ref={blackRef}
          className="absolute inset-0 z-20 bg-black opacity-0"
        />
        <div
          ref={blackContentRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0"
        >
          <div
            ref={gtaLogoRef}
            className="will-change-transform"
          >
            <Image
              src="/svgs/logo-mask.svg"
              width={900}
              height={600}
              alt="Grand Theft Auto"
              className="translate-y-8 lg:translate-y-27"
            />
          </div>
          <h3
            ref={textRef}
            className="font-gothic text-[40px] md:text-[60px] lg:text-[120px] font-semibold text-center uppercase leading-10 md:leading-16 lg:leading-30"
            style={{
              backgroundImage: GRADIENT_END,
              color: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 200%",
              backgroundPosition: "50% 80%",
            }}
          >
            Disponível em <br /> 19 de novembro <br /> de 2026
          </h3>
          <div
            ref={platformsRef}
            className="flex items-center gap-6 opacity-0"
          >
            <VectorPS5 width={isMobile ? "100" : "140"} height="30" fill="#fff" />
            <VectorXbox width={isMobile ? "200" : "240"} height="30" fill="#fff" />
          </div>
        </div>
      </div>
      <div
        ref={arrowRef}
        className="absolute bottom-4 left-1/2 -translate-x-2/4 arrow-down-animation z-99"
      >
        <VectorArrowDown width="40" height="20" fill="#ffb0c4" />
      </div>
    </section>
  )
}
