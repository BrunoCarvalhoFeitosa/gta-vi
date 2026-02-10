"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ZoomButton } from "@/app/components/ui/zoom-button"
import { GRADIENT_START, GRADIENT_END } from "@/app/utils"
import { IoMdClose } from "react-icons/io"

gsap.registerPlugin(ScrollTrigger)

export const PrimaryCharacterJasonDuval = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const initialTextRef = useRef<HTMLDivElement>(null)
  const firstVideoWrapperRef = useRef<HTMLDivElement>(null)
  const firstVideoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const firstVideoContentRef = useRef<HTMLDivElement>(null)
  const secondVideoPinRef = useRef<HTMLDivElement>(null)
  const secondVideoContentRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const lightboxImgRef = useRef<HTMLImageElement>(null)
  const animImgRef = useRef<HTMLImageElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const firstVideo = firstVideoRef.current
      const firstVideoWrapper = firstVideoWrapperRef.current

      if (!firstVideo || !firstVideoWrapper) {
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: pinRef.current
        }
      })

      tl.to(
        initialTextRef.current, {
          scale: 0.95
        }
      )

      tl.to(
        initialTextRef.current, {
          backgroundImage: GRADIENT_END
        }, 0
      )

      tl.to(
        initialTextRef.current, {
          opacity: 0
        }, 0
      )

      tl.fromTo(
        firstVideoWrapper, {
          opacity: 0,
          visibility: "hidden"
        },
        {
          opacity: 1,
          visibility: "visible"
        }
      )

      tl.fromTo(
        firstVideo, {
          opacity: 0,
          visibility: "hidden"
        },
        {
          opacity: 1,
          visibility: "visible"
        }
      )

      tl.to(firstVideo, {
        currentTime: firstVideo.duration,
        ease: "none",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const video = secondVideoRef.current
    const pin = secondVideoPinRef.current
    const content = secondVideoContentRef.current

    if (!video || !pin || !content) {
      return
    }

    const init = () => {
      gsap.set(
        content, {
          yPercent: 100
        }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=350%",
          scrub: true,
          pin: true,
        },
      })

      tl.fromTo(
        video,
        {
          currentTime: 0
        },
        {
          currentTime: video.duration,
          ease: "none",
          duration: 1,
        }
      )

      tl.to(
        content, {
          yPercent: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      )
    }

    if (video.readyState >= 1) {
      init()
    } else {
      video.addEventListener("loadedmetadata", init, { once: true })
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.2 && firstVideoContentRef.current) {
            firstVideoContentRef.current.style.transition = "background-color 0.5s ease-in-out"
            firstVideoContentRef.current.style.backgroundColor = "#000"
          }
        })
      },
      {
        threshold: 0.2
      }
    )

    if (firstVideoContentRef.current) {
      observer.observe(firstVideoContentRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.2 && secondVideoContentRef.current) {
            secondVideoContentRef.current.style.transition = "background-color 0.5s ease-in-out"
            secondVideoContentRef.current.style.backgroundColor = "#000"
          }
        })
      },
      {
        threshold: 0.2
      }
    )

    if (secondVideoContentRef.current) {
      observer.observe(secondVideoContentRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const lightbox = lightboxRef.current
    const lightboxImg = lightboxImgRef.current
    const animImg = animImgRef.current
    const closeButton = closeButtonRef.current

    if (!lightbox || !lightboxImg || !animImg || !closeButton) {
      return
    }

    let isAnimating = false
    let isLightboxOpen = false
    let currentThumbnail: HTMLImageElement | null = null

    const openLightbox = (img: HTMLImageElement) => {
      if (isAnimating || isLightboxOpen) {
        return
      }

      isAnimating = true
      isLightboxOpen = true
      currentThumbnail = img

      const rect = img.getBoundingClientRect()

      animImg.src = img.src
      animImg.style.position = "fixed"
      animImg.style.top = rect.top + "px"
      animImg.style.left = rect.left + "px"
      animImg.style.width = rect.width + "px"
      animImg.style.height = rect.height + "px"
      animImg.style.opacity = "1"
      animImg.style.pointerEvents = "none"

      document.body.style.overflow = "hidden"
      lightboxImg.style.opacity = "0"
      lightboxImg.style.pointerEvents = "none"

      lightbox.classList.remove("hidden")
      lightbox.classList.add("flex")

      gsap.to(animImg, {
        top: 0,
        left: "5dvw",
        width: "90dvw",
        height: "100dvh",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          lightboxImg.src = img.src
          lightboxImg.style.opacity = "1"
          animImg.style.opacity = "0"
          isAnimating = false
        },
      })
    }

    const closeLightbox = () => {
      if (!currentThumbnail || isAnimating) {
        return
      }

      isAnimating = true

      gsap.killTweensOf(animImg)

      const rect = currentThumbnail.getBoundingClientRect()

      animImg.src = lightboxImg.src
      animImg.style.opacity = "1"
      animImg.style.pointerEvents = "none"
      lightboxImg.style.opacity = "0"
      document.body.style.overflow = ""

      gsap.to(animImg, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          lightbox.classList.add("hidden")
          animImg.style.opacity = "0"

          isAnimating = false
          isLightboxOpen = false
          currentThumbnail = null
        },
      })
    }

    document.addEventListener("keyup", (e) => e.key === "Escape" && closeLightbox())

    closeButton.addEventListener("click", (e) => {
      e.stopPropagation()
      closeLightbox()
    })

    document.querySelectorAll(".js-lightbox-trigger").forEach((el) => {
      const img = el.querySelector("img") as HTMLImageElement
      const btn = el.querySelector("button")

      btn?.addEventListener("click", (e) => {
        e.stopPropagation()
        openLightbox(img)
      })
    })
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="jason-duval"
        className="relative w-full bg-black overflow-hidden"
      >
        <div
          ref={firstVideoWrapperRef}
          className="fixed top-0 w-dvw h-dvh invisible opacity-0"
        >
          <video
            ref={firstVideoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src="/videos/video-jason-duval-01.mp4"
          />
        </div>
        <div
          ref={pinRef}
          className="relative z-10"
        >
          <div
            ref={initialTextRef}
            className="flex flex-col justify-center items-center w-dvw h-dvh px-6 bg-black"
            style={{
              backgroundImage: GRADIENT_START,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <div className="mx-auto lg:w-2/3">
              <h3 className="font-gothic text-[50px] md:text-[80px] font-semibold leading-none">
                Vice City, USA.
              </h3>
              <p className="mt-12 text-[16px] md:text-[28px] lg:text-[40px] font-semibold leading-6 md:leading-10">
                Jason e Lucia sempre souberam que tudo estava contra eles. Mas, depois que um serviço simples dá errado, eles vão parar no lado mais sombrio do lugar mais ensolarado dos Estados Unidos, em meio a uma conspiração criminosa se estendendo por todo o estado de Leonida – e são forçados a depender um do outro mais do que nunca para saírem dessa vivos.
              </p>
            </div>
          </div>
        </div>
        <div
          ref={firstVideoContentRef}
          className="relative w-full flex flex-col lg:flex-row gap-7 pt-20 px-5 pb-40 lg:pt-30 lg:pb-60 2xl:pl-80"
        >
          <div className="relative lg:flex-1 z-10">
            <div className="xl:pr-40">
              <h2 className="mb-18 font-gothic text-[40px] md:text-[80px] lg:text-[80px] xl:text-[100px] font-bold uppercase text-white">
                Jason Duval
              </h2>
              <p className="mb-4 text-[25px] md:text-[35px] lg:text-[50px] font-bold md:leading-none text-[#FFB0C4]">
                O Jason quer uma vida fácil, mas as coisas ficam cada vez mais difíceis.
              </p>
              <p className="mb-4 text-[18px] md:text-[22px] text-white">
                Jason cresceu entre golpistas e vigaristas. Após um período no exército tentando deixar sua adolescência conturbada para trás, ele se viu nas Keys usando o máximo das suas habilidades a serviço dos traficantes locais. Talvez seja a hora de tentar algo novo.
              </p>
            </div>
            <div className="js-lightbox-trigger group relative mt-28 hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src="/images/jason-duval/image-jason-duval-01.webp"
                alt="Jason Duval"
                width={1000}
                height={2000}
                className="w-full h-100 lg:h-237.5 object-cover"
              />
              <ZoomButton />
            </div>
          </div>
          <div className="flex flex-col gap-7 lg:flex-1 z-10">
            <div className="js-lightbox-trigger group relative hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src="/images/jason-duval/image-jason-duval-02.webp"
                alt="Jason Duval"
                width={1000}
                height={2000}
                className="w-full h-100 lg:h-250 object-cover"
              />
              <ZoomButton />
            </div>
            <div className="js-lightbox-trigger group relative w-fit hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src="/images/jason-duval/image-jason-duval-03.webp"
                alt="Jason Duval"
                width={1000}
                height={2000}
                className="w-full h-100 lg:w-125 lg:h-125 object-cover"
              />
              <ZoomButton />
            </div>
          </div>
        </div>
      </section>
      <section
        ref={secondVideoPinRef}
        className="relative w-full bg-black overflow-hidden"
      >
        <div className="fixed w-full h-dvh z-0">
          <video
            ref={secondVideoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src="/videos/video-jason-duval-02.mp4"
          />
        </div>
        <div
          ref={secondVideoContentRef}
          className="relative w-full flex flex-col lg:flex-row lg:items-center gap-6 pt-20 px-5 pb-30 2xl:pr-80 lg:pt-30 lg:pb-60 z-10"
        >
          <div className="flex flex-col gap-7 lg:flex-1">
            <h3 className="mb-6 lg:mb-12 font-gothic text-[40px] md:text-[50px] lg:text-[58px] xl:text-[64px] uppercase leading-none text-center text-[#FFB0C4]">
              <q>Se acontecer algo,<br /> tô logo atrás de você</q>
            </h3>
            <div className="flex flex-col justify-end items-center lg:items-end gap-6">
              <div className="js-lightbox-trigger group relative hover:border-12 hover:border-white transition-all duration-500">
                <Image
                  src="/images/jason-duval/image-jason-duval-04.webp"
                  alt="Jason Duval"
                  width={1000}
                  height={2000}
                  className="w-full h-100 lg:h-250 object-cover object-left"
                />
                <ZoomButton />
              </div>
              <div className="js-lightbox-trigger group relative w-fit hover:border-12 hover:border-white transition-all duration-500">
                <Image
                  src="/images/jason-duval/image-jason-duval-05.webp"
                  alt="Jason Duval"
                  width={1000}
                  height={2000}
                  className="w-full h-100 lg:w-125 lg:h-125 object-cover object-left"
                />
                <ZoomButton />
              </div>
            </div>
          </div>
          <div className="relative lg:w-175 lg:flex-1 z-10">
            <div className="lg:mt-32.5 xl:pl-25">
              <p className="mb-6 lg:mb-12 text-[25px] md:text-[36px] lg:text-[50px] font-bold leading-none text-[#FFB0C4]">
                Mais um dia no <br />paraíso, certo?
              </p>
              <p className="mb-4 text-[22px] text-white">
                Conhecer a Lucia pode ser a melhor ou a pior coisa que já aconteceu com ele. Jason sabe como ele gostaria que as coisas fossem, mas, como tudo está agora, é difícil dizer.
              </p>
            </div>
            <div className="js-lightbox-trigger group relative mt-28 hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src="/images/jason-duval/image-jason-duval-06.webp"
                alt="Jason Duval"
                width={1000}
                height={2000}
                className="w-full h-100 lg:h-180 xl:h-220 object-cover lg:object-center"
              />
              <ZoomButton />
            </div>
          </div>
        </div>
      </section>
      <div
        ref={lightboxRef}
        className="fixed inset-0 hidden items-center justify-center bg-black z-9999"
      >
        <img
          ref={lightboxImgRef}
          className="w-[90dvw] h-auto md:h-[40dvh] xl:h-dvh opacity-0"
        />
        <img
          ref={animImgRef}
          className="fixed opacity-0 object-cover z-10"
        />
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute top-8 right-6 md:right-10 size-16 md:size-20 flex justify-center items-center bg-white rounded-full z-10000"
        >
          <IoMdClose className="text-black text-3xl" />
        </button>
      </div>
    </>
  )
}
