"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import clsx from "clsx"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { isDesktop } from "react-device-detect"
import Image from "next/image"
import { ZoomButton } from "@/app/components/ui/zoom-button"
import { VectorReload } from "@/app/components/vectors/vector-reload"

gsap.registerPlugin(ScrollTrigger)

interface SecondaryCharacterLayoutProps {
  id: string
  isFirst?: boolean
  isInverted?: boolean
  firstTitle: string
  firstSubtitle: string
  firstDescription: string
  secondTitle: string
  secondDescription: string
  background: string
  gradientBackground: string
  imageBackgroundCover: string
  imageBackgroundCharacter: string
  firstImage: string
  firstImageAlt: string
  secondImage: string
  secondImageAlt: string
  thirdImage: string
  thirdImageAlt: string
  fourthImage: string
  fourthImageAlt: string
  border: string
  video: string
  phrase: string
}

export const SecondaryCharacterLayout = ({
  id,
  isFirst,
  isInverted,
  firstTitle,
  firstSubtitle,
  firstDescription,
  secondTitle,
  secondDescription,
  background,
  gradientBackground,
  imageBackgroundCover,
  imageBackgroundCharacter,
  firstImage,
  firstImageAlt,
  secondImage,
  secondImageAlt,
  thirdImage,
  thirdImageAlt,
  fourthImage,
  fourthImageAlt,
  border,
  video,
  phrase
}: SecondaryCharacterLayoutProps) => {
  const pinRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoTimelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pinEl = pinRef.current
    const video = videoRef.current
    const timelineWrapper = videoTimelineRef.current
    const timelineFill = timelineWrapper?.querySelector(".timeline-fill")
    const replayIcon = timelineWrapper?.querySelector(".replay-icon")
    const outerBar = timelineWrapper?.querySelector(".relative.w-6")

    if (!pinEl || !video || !timelineFill || !replayIcon || !outerBar || !timelineWrapper) {
      return
    }

    let tl: gsap.core.Timeline | null = null

    const setup = () => {
      if (tl) {
        return
      }

      video.pause()
      video.currentTime = 0

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const t = self.progress

            if (t < 1) {
              gsap.to(
                timelineFill, {
                  scaleY: t,
                  opacity: 1,
                  ease: "none",
                  overwrite: "auto",
                }
              )

              gsap.to(
                outerBar, {
                  width: 24,
                  height: 112,
                  borderRadius: "30px",
                  ease: "power2.out",
                }
              )

              gsap.to(
                replayIcon, {
                  opacity: 0,
                  pointerEvents: "none",
                  ease: "power2.out"
                }
              )
            }

            if (t >= 1) {
              gsap.to(
                timelineFill, {
                  opacity: 0,
                  ease: "power2.out"
                }
              )

              gsap.to(
                outerBar, {
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  ease: "power2.out"
                }
              )

              gsap.to(
                replayIcon, {
                  opacity: 1,
                  pointerEvents: "auto",
                  ease: "power2.out"
                }
              )
            }
          },
        },
      })

      tl.to(
        video, {
          currentTime: video.duration || 1,
          ease: "none"
        }, 0
      )

      tl.fromTo(
        pinEl.querySelector("p"),
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4
        }, 0.15
      )

      timelineWrapper.onclick = () => {
        video.currentTime = 0
        video.play()
      }

      ScrollTrigger.refresh()
    }

    video.addEventListener("canplaythrough", setup)
    const fallback = setTimeout(setup, 100)

    return () => {
      video.removeEventListener("canplaythrough", setup)
      clearTimeout(fallback)
      tl?.scrollTrigger?.kill()
      tl?.kill()
    }
  }, [])

  return (
    <>
      <section
        id={id}
        className={clsx(
          "relative w-full z-10",
          isFirst ? "bg-black" : background
        )}
      >
        <div
          className="relative w-full min-h-dvh lg:min-h-[165dvh] overflow-hidden"
          style={{
            clipPath: isDesktop ? "polygon(0 0, 100% 10%, 100% 100%, 0 100%)" : "",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src={imageBackgroundCover}
              alt="Imagem de fundo"
              width={1920}
              height={1300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 w-full h-full">
            <Image
              src={imageBackgroundCharacter}
              alt={firstImageAlt}
              width={1620}
              height={700}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={clsx(
            "absolute top-2/4 -translate-y-2/4 p-5 md:p-10 lg:p-0 w-full h-full flex flex-col justify-end lg:justify-center bg-linear-to-r z-10",
            gradientBackground,
            isInverted && "items-end"
          )}>
            <div className={clsx(
              "lg:max-w-2xl",
              isInverted ? "lg:pr-18 xl:pr-40" : "lg:pl-18 xl:pl-40"
            )}>
              <h3 className="font-gothic text-[60px] md:text-[90px] uppercase leading-none text-white">
                {firstTitle}
              </h3>
              <p className="my-7 font-sans text-[25px] md:text-[35px] lg:text-[60px] font-bold leading-none text-[#FFF8CB]">
                {firstSubtitle}
              </p>
              <p className="mb-4 text-[18px] lg:text-[24px] xl:text-[22px] text-white">
                {firstDescription}
              </p>
            </div>
          </div>
        </div>
        <div
          ref={sectionRef}
          className={clsx(
            "relative lg:-mt-20 h-auto flex gap-6 pt-20 pb-20 lg:pt-30 lg:pb-6 z-10",
            background
          )}
        >
          {isInverted ? (
            <div className="px-5 w-full flex flex-col lg:flex-row gap-6 z-10">
              <div className="flex flex-col gap-7 lg:flex-1 lg:-translate-y-70">
                <div className="flex">
                  <div className={clsx(
                    "js-lightbox-trigger group relative border-white hover:border-12 transition-all duration-500",
                    border
                  )}>
                    <Image
                      src={firstImage}
                      alt={firstImageAlt}
                      width={1000}
                      height={2000}
                      className="w-full h-100 lg:h-200 object-cover object-right"
                    />
                    <ZoomButton />
                  </div>
                </div>
              </div> 
              <div className="relative flex flex-col lg:flex-1 gap-6 z-10">
                <div className={clsx(
                  "js-lightbox-trigger group relative xl:w-175 border-white hover:border-12 transition-all duration-500",
                  border
                )}>
                  <Image
                    src={secondImage}
                    alt={secondImageAlt}
                    width={1000}
                    height={2000}
                    className="w-full h-100 xl:w-175 lg:h-200 object-cover"
                  />
                  <ZoomButton />
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 w-full flex flex-col lg:flex-row gap-6 z-10">
              <div className="relative flex flex-col lg:flex-1 lg:items-end gap-6 z-10">
                <div className={clsx(
                  "js-lightbox-trigger group relative border-white hover:border-12 transition-all duration-500",
                  border
                )}>
                  <Image
                    src={firstImage}
                    alt={firstImageAlt}
                    width={1000}
                    height={2000}
                    className="w-full h-100 xl:w-175 lg:h-200 object-cover"
                  />
                  <ZoomButton />
                </div>
              </div>
              <div className="flex flex-col gap-7 lg:flex-1 lg:-translate-y-70">
                <div className="flex">
                  <div className={clsx(
                    "js-lightbox-trigger group relative border-white hover:border-12 transition-all duration-500",
                    border
                  )}>
                    <Image
                      src={secondImage}
                      alt={secondImageAlt}
                      width={1000}
                      height={2000}
                      className="w-full h-100 lg:h-200 object-cover object-right"
                    />
                    <ZoomButton />
                  </div>
                </div>
              </div> 
            </div>
          )}
        </div>
      </section>
      <section className="relative z-10">
        {isInverted ? (
          <div
            ref={pinRef}
            className={clsx(
              "relative min-h-screen flex flex-col xl:flex-row gap-6",
              background
            )}
          >
            <div className="py-30 lg:py-0 lg:flex-1 flex flex-col justify-center items-center">
              <p className="font-gothic text-[40px] md:text-[60px] lg:text-[90px] font-bold uppercase leading-none text-center text-white">
                <q className="w-full">
                  {phrase}
                </q>
              </p>
            </div>
            <div className="relative flex-1">
              <video
                ref={videoRef}
                muted
                playsInline
                preload="metadata"
                autoPlay={false}
                className="w-full h-full object-cover"
                src={video}
              />
              <div
                ref={videoTimelineRef}
                className="absolute bottom-6 right-6 z-10 cursor-pointer"
              >
                <div
                  className="relative w-6 h-28 rounded-xl bg-black/60 flex items-center justify-center overflow-hidden"
                  style={{ width: 24, height: 112, borderRadius: "30px" }}
                >
                  <div className="absolute inset-1 rounded-xl overflow-hidden">
                    <div
                      className="timeline-fill absolute bottom-0 w-full h-full rounded-xl bg-white"
                      style={{ transformOrigin: "bottom" }}
                    />
                  </div>
                  <div className="replay-icon absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
                    <VectorReload width="40" height="40" fill="#fff" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={pinRef}
            className={clsx(
              "relative min-h-screen flex flex-col xl:flex-row gap-6",
              background
            )}
          >
            <div className="relative flex-1">
              <video
                ref={videoRef}
                muted
                playsInline
                preload="metadata"
                autoPlay={false}
                className="w-full h-full object-cover"
                src={video}
              />
              <div
                ref={videoTimelineRef}
                className="absolute bottom-6 right-6 z-10 cursor-pointer"
              >
                <div
                  className="relative w-6 h-28 rounded-xl bg-black/60 flex items-center justify-center overflow-hidden"
                  style={{ width: 24, height: 112, borderRadius: "30px" }}
                >
                  <div className="absolute inset-1 rounded-xl overflow-hidden">
                    <div
                      className="timeline-fill absolute bottom-0 w-full h-full rounded-xl bg-white"
                      style={{ transformOrigin: "bottom" }}
                    />
                  </div>
                  <div className="replay-icon absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
                    <VectorReload width="40" height="40" fill="#fff" />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-30 lg:py-0 lg:flex-1 flex flex-col justify-center items-center">
              <p className="font-gothic text-[40px] md:text-[60px] lg:text-[90px] font-bold uppercase leading-none text-center text-white">
                <q className="w-full">
                  {phrase}
                </q>
              </p>
            </div>
          </div>
        )}
        {isInverted ? (
          <div className={clsx(
            "pt-6 w-full flex flex-col lg:flex-row gap-6",
            background
          )}>
            <div className="lg:mt-30 relative flex flex-col lg:flex-1 lg:items-end gap-6 z-10">
              <div className={clsx(
                "js-lightbox-trigger group relative xl:w-162.5 border-white hover:border-12 transition-all duration-500",
                border
              )}>
                <Image
                  src={thirdImage}
                  alt={thirdImageAlt}
                  width={1000}
                  height={2000}
                  className="w-full h-100 lg:h-130 object-cover"
                />
                <ZoomButton />
              </div>
              <div className="mt-5 lg:mt-22 px-5 lg:pl-10 xl:pl-20 flex flex-col xl:w-162.5">
                <h3 className="mb-4 text-[22px] md:text-[30px] lg:text-[50px] font-bold leading-none text-white">
                  {secondTitle}
                </h3>
                <p className="text-[18px] md:text-[22px] text-white">
                  {secondDescription}
                </p>
              </div>
            </div>
            <div className="relative flex flex-col lg:flex-1 lg:items-start gap-6 z-10">
              <div className={clsx(
                "js-lightbox-trigger group relative border-white hover:border-12 transition-all duration-500",
                border
              )}>
                <Image
                  src={fourthImage}
                  alt={fourthImageAlt}
                  width={1000}
                  height={2000}
                  className="w-full h-100 xl:w-180 lg:h-200 object-cover object-center"
                />
                <ZoomButton />
              </div>
            </div>
          </div>
        ) : (
          <div className={clsx(
            "pt-6 w-full flex flex-col lg:flex-row gap-6",
            background
          )}>
            <div className="relative flex flex-col lg:flex-1 lg:items-end gap-6 z-10">
              <div className={clsx(
                "js-lightbox-trigger group relative border-white hover:border-12 transition-all duration-500",
                border
              )}>
                <Image
                  src={thirdImage}
                  alt={thirdImageAlt}
                  width={1000}
                  height={2000}
                  className="w-full h-100 xl:w-180 lg:h-200 object-cover object-center"
                />
                <ZoomButton />
              </div>
            </div>
            <div className="lg:mt-30 relative flex flex-col lg:flex-1 gap-6 z-10">
              <div className={clsx(
                "js-lightbox-trigger group relative xl:w-162.5 border-white hover:border-12 transition-all duration-500",
                border
              )}>
                <Image
                  src={fourthImage}
                  alt={fourthImageAlt}
                  width={1000}
                  height={2000}
                  className="w-full h-100 lg:h-130 object-cover"
                />
                <ZoomButton />
              </div>
              <div className="mt-5 lg:mt-22 px-5 lg:pl-10 xl:pl-20 flex flex-col xl:w-162.5">
                <h3 className="mb-4 text-[22px] md:text-[30px] lg:text-[50px] font-bold leading-none text-white">
                  {secondTitle}
                </h3>
                <p className="text-[18px] md:text-[22px] text-white">
                  {secondDescription}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
