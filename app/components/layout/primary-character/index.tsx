"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ZoomButton } from "@/app/components/ui/zoom-button"
import { IoMdClose } from "react-icons/io"

gsap.registerPlugin(ScrollTrigger)

interface PrimaryCharacterProps {
  id: string
  firstVideo: string
  secondVideo: string
  firstTitle: string
  firstSubtitle: string
  firstDescription: string
  secondTitle: string
  secondSubtitle: string
  secondDescription: string
  firstImage: string
  firstImageAlt: string
  secondImage: string
  secondImageAlt: string
  thirdImage: string
  thirdImageAlt: string
  fourthImage: string
  fourthImageAlt: string
  fifthImage: string
  fifthImageAlt: string
  sixthImage: string
  sixthImageAlt: string
}

export const PrimaryCharacter = ({
  id,
  firstVideo,
  secondVideo,
  firstTitle,
  firstSubtitle,
  firstDescription,
  secondTitle,
  secondSubtitle,
  secondDescription,
  firstImage,
  firstImageAlt,
  secondImage,
  secondImageAlt,
  thirdImage,
  thirdImageAlt,
  fourthImage,
  fourthImageAlt,
  fifthImage,
  fifthImageAlt,
  sixthImage,
  sixthImageAlt

}: PrimaryCharacterProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
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
      const video = firstVideoRef.current
      const content = firstVideoContentRef.current

      if (!video || !content) {
        return
      }

      gsap.set(content, { yPercent: 100 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true
        }
      })

      tl.fromTo(
        video,
        {
          currentTime: 0
        },
        {
          currentTime: video.duration,
          ease: "none",
          duration: 0.85,
        }
      )

      tl.to(
        content, {
          yPercent: 0,
          ease: "power3.out",
          duration: 0.6,
        }
      )
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

    gsap.set(
      content, {
        yPercent: 100
      }
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true
      }
    })

    tl.fromTo(
      video, {
        currentTime: 0
      },
      {
        currentTime: video.duration,
        ease: "none"
      }
    )

    tl.to(
      content, {
        yPercent: 0,
        ease: "power3.out"
      }, 0.5
    )
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

  return (
    <div>
      <section
        ref={sectionRef}
        id={id}
        className="relative w-full bg-black overflow-hidden"
      >
        <div className="absolute top-0 w-full h-dvh z-0">
          <video
            ref={firstVideoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src={firstVideo}
          />
        </div>
        <div
          ref={firstVideoContentRef}
          className="relative w-full flex flex-col lg:flex-row gap-7 pt-20 px-5 pb-40 lg:pt-30 lg:pb-60 2xl:pr-80"
        >
          <div className="order-2 lg:order-1 relative lg:flex-1 flex flex-col justify-end items-end gap-6 z-10">
            <div className="js-lightbox-trigger group relative hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src={secondImage}
                alt={secondImageAlt}
                width={1000}
                height={2000}
                className="w-full h-100 lg:w-full lg:h-250 object-cover"
              />
              <ZoomButton />
            </div>
            <div className="js-lightbox-trigger group relative w-fit hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src={thirdImage}
                alt={thirdImageAlt}
                width={1000}
                height={2000}
                className="w-full h-100 lg:w-125 lg:h-125 object-cover"
              />
              <ZoomButton />
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col gap-7 lg:flex-1 z-10">
            <div className="xl:pl-20">
              <h2 className="mb-18 font-gothic text-[40px] md:text-[80px] lg:text-[80px] xl:text-[100px] font-bold uppercase text-white">
               {firstTitle}
              </h2>
              <p className="mb-4 text-[25px] md:text-[35px] lg:text-[50px] font-bold md:leading-none text-[#FFB0C4]">
                {firstSubtitle}
              </p>
              <p className="mb-4 text-[18px] md:text-[22px] text-white">
                {firstDescription}
              </p>
            </div>
            <div className="js-lightbox-trigger group relative mt-28 hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src={firstImage}
                alt={firstImageAlt}
                width={1000}
                height={2000}
                className="w-full h-100 lg:h-180 xl:h-220 object-cover lg:object-center"
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
        <div className="absolute w-full h-dvh z-0">
          <video
            ref={secondVideoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src={secondVideo}
          />
        </div>
        <div
          ref={secondVideoContentRef}
          className="relative w-full flex flex-col lg:flex-row lg:items-center gap-6 pt-20 px-5 pb-30 2xl:pr-80 lg:pt-30 lg:pb-60 z-10"
        >
          <div className="relative lg:flex-1 z-10">
            <div className="lg:mt-32.5 xl:pl-25">
              <p className="mb-4 text-[25px] md:text-[30px] lg:text-[50px] font-bold md:leading-none text-[#FFB0C4]">
                {secondSubtitle}
              </p>
              <p className="mt-4 text-[18px] md:text-[22px] text-white">
                {secondDescription}
              </p>
            </div>
            <div className="js-lightbox-trigger group relative mt-28 hover:border-12 hover:border-white transition-all duration-500">
              <Image
                src={fourthImage}
                alt={fourthImageAlt}
                width={1000}
                height={2000}
                className="w-full h-100 lg:h-237.5 object-cover"
              />
              <ZoomButton />
            </div>
          </div>
          <div className="flex flex-col gap-7 lg:flex-1">
            <div className="mb-10 px-5">
              <h3 className="mb-6 lg:mb-12 font-gothic text-[40px] md:text-[50px] lg:text-[50px] xl:text-[64px] uppercase leading-none text-center text-[#FFB0C4]">
                <q>{secondTitle}</q>
              </h3>
            </div>
            <div className="flex flex-col justify-end items-start gap-6">
              <div className="js-lightbox-trigger group relative hover:border-12 hover:border-white transition-all duration-500">
                <Image
                  src={fifthImage}
                  alt={fifthImageAlt}
                  width={1000}
                  height={2000}
                  className="w-full h-100 lg:h-250 object-cover object-left"
                />
                <ZoomButton />
              </div>
              <div className="js-lightbox-trigger group relative w-fit hover:border-12 hover:border-white transition-all duration-500">
                <Image
                  src={sixthImage}
                  alt={sixthImageAlt}
                  width={1000}
                  height={2000}
                  className="w-full h-100 lg:w-125 lg:h-125 object-cover object-left"
                />
                <ZoomButton />
              </div>
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
    </div>
  )
}
