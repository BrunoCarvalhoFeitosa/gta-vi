"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { isDesktop } from "react-device-detect"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export const LeonidaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const gradients = [
    "radial-gradient(at 80% 40%, rgb(252, 82, 67) 0%, rgb(223, 58, 147) 50%, transparent 100%)",
    "radial-gradient(at 79.7143% 40.8571%, rgb(252, 85, 70) 0%, rgb(224, 63, 149) 51.4286%)",
    "radial-gradient(at 77.1746% 48.4762%, rgb(253, 111, 92) 0%, rgb(232, 112, 163) 64.127%)",
    "radial-gradient(at 74.6349% 56.0952%, rgb(254, 137, 115) 0%, rgb(240, 160, 177) 76.8254%)",
    "radial-gradient(at 70% 70%, rgb(255, 185, 156) 0%, rgb(255, 249, 203) 100%)",
  ]

  useEffect(() => {
    const imageEl = imageRef.current
    const textEl = textRef.current
    const sectionEl = sectionRef.current

    if (!imageEl || !textEl || !sectionEl) {
      return
    }

    const tlImage = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    tlImage.fromTo(
      imageEl,
      { y: 50, scale: 1.05, rotateX: 3 },
      { y: -30, scale: 1, rotateX: 0, ease: "power1.out" },
      0
    )

    tlImage.to(
      imageEl,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)",
        ease: "power1.out",
      },
      0
    )

    const tlText = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    gradients.forEach((grad, i) => {
      tlText.to(
        textEl,
        {
          backgroundImage: grad,
          duration: 1,
          ease: "none",
        },
        i / (gradients.length - 1)
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
    >
      <div
        ref={imageRef}
        className="w-full h-[80vh] lg:h-[125dvh] overflow-hidden"
        style={{
          clipPath: isDesktop ? "polygon(0 0, 100% 0, 100% 90%, 0 100%)" : "",
        }}
      >
        <Image
          src="/images/leonida/image-leonida.webp"
          alt="Leonida"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <div
        ref={textRef}
        className="mx-auto py-28 md:py-40 lg:py-60 px-5 w-full lg:max-w-7xl flex flex-col xl:flex-row items-center gap-10 md:gap-20 text-white"
        style={{
          backgroundImage: gradients[0],
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <div className="flex-1">
          <p className="font-gothic text-[70px] md:text-[90px] lg:text-[140px] font-bold text-center xl:text-left leading-none">
            Só em <br /> Leonida
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[20px] md:text-[36px] lg:text-[40px] leading-none text-center xl:text-left font-bold">
            Quando o sol vai embora e o neon começa a brilhar, todo mundo tem algo a ganhar – e mais ainda a perder.
          </p>
        </div>
      </div>
    </section>
  )
}
