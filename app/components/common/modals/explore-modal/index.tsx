"use client"
import { useEffect, useRef } from "react"
import clsx from "clsx"
import gsap from "gsap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Pagination, Navigation, Keyboard, EffectCoverflow } from "swiper/modules"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { VectorArrowBack } from "../../../vectors/vector-arrow-back"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"

gsap.registerPlugin(ScrollTrigger)

interface ExploreModalProps {
  isOpen: boolean
  onClose: () => void
  exploreModalTitle: string
  exploreModalSubtitle: string
  exploreModalDescription: string
  exploreModalSideImage: string
  exploreModalGradientBackground: string
  exploreModalButtonColors: string
  exploreModalImages: string[]
}

export const ExploreModal = ({
  isOpen,
  onClose,
  exploreModalTitle,
  exploreModalSubtitle,
  exploreModalDescription,
  exploreModalSideImage,
  exploreModalGradientBackground,
  exploreModalButtonColors,
  exploreModalImages
}: ExploreModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const modal = modalRef.current
    const track = trackRef.current

    if (!isOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    if (!modal || !track) {
      return
    }

    const trackWidth = track.scrollWidth - modal.clientWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -trackWidth,
        ease: "none",
        scrollTrigger: {
          trigger: modal,
          start: "top top",
          end: `+=${trackWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, modal)

    return () => {
      ctx.revert()
      document.body.style.overflow = ""
    }
  }, [isOpen, exploreModalImages.length])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div
      className={clsx(
        "fixed inset-0 transition-transform duration-1000 overflow-hidden z-999",
        isOpen ? "translate-x-0" : "translate-x-full",
    )}
      style={{ background: exploreModalGradientBackground }}
    >
      <button
        type="button"
        className={clsx(
          "absolute top-5 md:top-20 left-5 md:left-12 xl:left-20 py-4 px-8 flex items-center gap-2 text-lg font-semibold tracking-wide rounded-4xl z-50",
          exploreModalButtonColors
        )}
        onClick={onClose}
      >
        <VectorArrowBack width="18" height="18" fill="#694775" />
        Voltar
      </button>
      <div
        ref={modalRef}
        className="relative w-full h-screen"
      >
        <div className="w-full pt-12 flex flex-col justify-center text-white">
          <div className="absolute bottom-0 left-0 w-full lg:w-300 h-full">
            <Image
              src={exploreModalSideImage}
              alt="Imagem de fundo"
              width={1200}
              height={1200}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative mt-18 md:mt-36 lg:mt-45 lg:pr-10 xl:mt-0 mb-12 flex justify-center xl:justify-end">
            <div className="px-5 md:px-0 md:max-w-2xl lg:max-w-4xl">
              <h2 className="font-gothic text-3xl md:text-6xl uppercase">
                {exploreModalTitle}
              </h2>
              <h3 className="mt-4 text-xl md:text-2xl lg:text-3xl">
                {exploreModalSubtitle}
              </h3>
              <p className="mt-2 font-sans text-sm md:text-lg">
                {exploreModalDescription}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <Swiper
              effect={"coverflow"}
              direction={"horizontal"}
              spaceBetween={0}
              mousewheel={true}
              loop={true}
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              grabCursor={true}
              centeredSlides={true}
              navigation={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: true,
              }}
              breakpoints={{
                1366: {
                  slidesPerView: 2,
                  spaceBetween: 30
                }
              }}
              modules={[Mousewheel, Pagination, Navigation, Keyboard, EffectCoverflow]}
            >
              {exploreModalImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    width={1000}
                    height={1000}
                    alt={"Imagem da cidade"}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}
