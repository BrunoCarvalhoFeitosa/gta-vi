"use client"
import { useEffect, useRef, useState } from "react"
import { useMenuStore } from "@/app/store/menu-store"
import { useVideoModalStore } from "@/app/store/video-modal-store"
import { isDesktop } from "react-device-detect"
import gsap from "gsap"
import clsx from "clsx"
import { ScrollToPlugin } from "gsap/all"
import Image from "next/image"
import Link from "next/link"
import { VectorVI } from "../../vectors/vector-vi"
import { MenuActiveImageType, MenuActiveLabelType } from "@/app/types"
import { menuList } from "@/app/utils" 
import { AiOutlineClose } from "react-icons/ai"
import { FaPlay } from "react-icons/fa6"
import { IoMdArrowForward } from "react-icons/io"

gsap.registerPlugin(ScrollToPlugin)

export const Menu = () => {
  const { open, setOpen } = useMenuStore()
  const { setOpenVideoModal } = useVideoModalStore()
  const [activeLabel, setActiveLabel] = useState<MenuActiveLabelType>("Pessoas")
  const [activeImage, setActiveImage] = useState<MenuActiveImageType>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const parallaxTween = useRef<gsap.core.Tween | null>(null)

  const startParallax = () => {
    if (!imageRef.current) return

    parallaxTween.current?.kill()
    gsap.set(imageRef.current, { x: "0%" })

    parallaxTween.current = gsap.to(imageRef.current, {
      x: "-40%",
      duration: 40,
      ease: "none"
    })
  }

  const resetImage = () => {
    parallaxTween.current?.kill()

    if (!imageRef.current) return

    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        setActiveImage(null)
      }
    })
  }

  const handleCloseMenu = () => {
    setOpen(false)
  }

  const handleVideoModalOpen = () => {
    setOpenVideoModal(true)
    document.body.style.overflow = "hidden"
  }

  const handleScrollTo = (scrollToId: string) => {
    const element = document.querySelector(scrollToId)

    if (!element) {
      return
    }

    gsap.to(window, {
      scrollTo: { y: element, offsetY: isDesktop ? -200 : -40 },
      duration: 12,
      ease: "power2.inOut"
    })

    handleCloseMenu()
  }

  useEffect(() => {
    if (!imageRef.current || !activeImage) {
      return
    }

    const tl = gsap.timeline()

    tl.fromTo(
      imageRef.current,
      {
        opacity: 0,
        x: "2%",
        scale: 1.05
      },
      {
        opacity: 1,
        x: "0%",
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        onComplete: startParallax
      }
    )

    return () => {
      tl.kill()
      parallaxTween.current?.kill()
    }
  }, [activeImage])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseMenu()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, handleCloseMenu])

  return (
    <div className={clsx(
      "fixed inset-0 transition-transform duration-1000 z-999",
      open ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="w-full h-full flex">
        <div className="hidden relative w-[15%] md:w-[20%] lg:flex xl:w-full h-full overflow-hidden bg-linear-to-br from-[#ffd583] to-[#8a2868]">
          <div className="hidden xl:block xl:w-full xl:h-full">
            {activeImage ? (
              <img
                ref={imageRef}
                key={activeImage.image}
                src={activeImage.image}
                alt={activeImage.label}
                className="absolute inset-0 w-[112%] h-full object-cover"
              />
            ) : (
              <div className="w-[15%] md:w-[40%] xl:w-[53%] h-full flex justify-center items-center">
                <VectorVI width="600" height="270" fill="#fff" />
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full xl:w-[47%] h-full bg-black text-white">
          <div className="py-6 px-8 md:py-12 md:px-16 h-full flex flex-col">
            <nav className="relative pb-12 flex justify-start md:justify-between items-center">
              <ul className="flex flex-col md:flex-row gap-x-2">
                {menuList.map(item => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={clsx(
                        "py-3 px-5 rounded-full font-semibold transition-colors",
                        activeLabel === item.title
                          ? "bg-white text-black"
                          : "text-white/80 hover:text-[#fff9cb]"
                      )}
                      onClick={() => setActiveLabel(item.title)}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="size-10 md:size-16 flex justify-center items-center rounded-full bg-white absolute top-0 md:-top-4 lg:top-0 -right-4 md:-right-8"
                onClick={handleCloseMenu}
              >
                <AiOutlineClose className="size-7 text-black" />
              </button>
            </nav>

            <div className="h-full flex flex-1 flex-col justify-center overflow-y-auto hide-scrollbar">
              {activeLabel === "Pessoas" && (
                <ul
                  className="w-fit flex flex-col gap-y-2"
                  onMouseLeave={resetImage}
                >
                  {menuList[0].items.map((item, index) => (
                    <li
                      key={item.label}
                      onMouseEnter={() => setActiveImage(item)}
                       onClick={() => handleScrollTo(item.scrollTo)}
                      className="group w-fit cursor-pointer"
                    >
                      <p className="font-gothic text-3xl md:text-5xl uppercase font-semibold tracking-wider transition-colors group-hover:text-[#fff9cb]">
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              {activeLabel === "Lugares" && (
                <ul
                  className="w-fit flex flex-col gap-y-2"
                  onMouseLeave={resetImage}
                >
                  {menuList[1].items.map((item, index) => (
                    <li
                      key={item.label}
                      onMouseEnter={() => setActiveImage(item)}
                       onClick={() => handleScrollTo(item.scrollTo)}
                      className="group w-fit cursor-pointer"
                    >
                      <p className="font-gothic text-3xl md:text-5xl uppercase font-semibold tracking-wider transition-colors group-hover:text-[#fff9cb]">
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              {activeLabel === "Trailers" && (
                <div className="flex flex-col gap-y-5">
                  {menuList[2].items.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={handleVideoModalOpen}
                      className="flex outline-none cursor-pointer"
                    >
                      <div className="relative">
                        <div className="overflow-hidden h-full">
                          <Image
                            src={item.image}
                            width={280}
                            height={280}
                            alt={item.label}
                            className="h-full object-cover"
                          />
                        </div>
                        <div className="px-1 py-px absolute bottom-3 left-3 bg-[#333]/90 font-sans text-sm font-bold">
                          {item.time}
                        </div>
                        <div className="absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4">
                          <div className="size-14 flex justify-center items-center rounded-full bg-[#333]/80">
                            <FaPlay />
                          </div>
                        </div>
                      </div>
                      <div className="p-5 h-auto flex flex-col gap-y-3 justify-center bg-[#333]">
                        {item.tag && (
                          <span className="px-2 w-fit bg-white font-gothic uppercase text-[#111117]">
                            Novo
                          </span>
                        )}
                        <div className="flex flex-col gap-y-1 text-left">
                          <p className="font-sans font-semibold text-white">
                            {item.label}
                          </p>
                          <p className="font-sans text-neutral-300">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {activeLabel === "Downloads" && (
                <ul className="flex flex-col gap-y-5">
                  {menuList[3].items.map(item => (
                    <li
                      key={item.label}
                      className="group relative flex outline-none cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        width={760}
                        height={200}
                        alt={item.label}
                        className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-300"
                      />
                      <div className="px-5 absolute bottom-4 w-full flex justify-between items-center">
                        <p className="font-gothic text-xl md:text-3xl font-bold uppercase text-white">
                          {item.label}
                        </p>
                        <Link
                          href={"/"}
                          className="size-10 flex justify-center items-center rounded-full bg-[#333] group-hover:bg-white transition-all duration-300"
                        >
                          <IoMdArrowForward className="text-lg text-pink-300 group-hover:text-[#111117] transition-all duration-300" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
