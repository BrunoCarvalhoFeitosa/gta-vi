"use client"
import { useEffect, useState } from "react"
import { useVideoModalStore } from "@/app/store/video-modal-store"
import clsx from "clsx"
import Image from "next/image"
import { menuList } from "@/app/utils"
import { FaPlay } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

export const VideoModal = () => {
  const { openVideoModal, setOpenVideoModal } = useVideoModalStore()
  const [currentVideo, setCurrentVideo] = useState<string | null>("https://www.youtube.com/embed/VQRLujxTm3c")

  const handleVideoModalClose = () => {
    setOpenVideoModal(false)
    setCurrentVideo("https://www.youtube.com/embed/VQRLujxTm3c")
    document.body.style.overflow = ""
  }

  const handlePlayVideo = (src: string) => {
    setCurrentVideo(src)
  }

  useEffect(() => {
    if (!openVideoModal) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleVideoModalClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [openVideoModal, handleVideoModalClose])

  return (
    <div className={clsx(
      "fixed top-0 left-0 w-full h-dvh transition-transform duration-1000 bg-black z-9999",
      openVideoModal ? "translate-x-0" : "translate-x-full"
    )}>
      <div>
        <button
          type="button"
          className="absolute top-8 right-6 md:right-10 size-16 md:size-20 flex justify-center items-center bg-white rounded-full z-10000"
          onClick={handleVideoModalClose}
        >
          <IoMdClose className="text-black text-3xl" />
        </button>
      </div>
      <div className="mx-auto w-[90dvw] md:w-[80dvw] h-full flex flex-col">
        <div className="w-full h-[60dvh] md:h-[60dvh] lg:h-[70dvh] flex flex-col justify-center items-center bg-[#111]">
          {currentVideo ? (
            <iframe
              width="100%"
              height="100%"
              src={currentVideo}
              title="Grand Theft Auto VI Trailer 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              frameBorder="0"
            />
          ) : (
            <p className="text-2xl text-center text-white">
              Selecione um trailer para visualizar.
            </p>
          )}
        </div>
        <div className="md:px-16 flex items-center flex-1 bg-[#1D1D23]">
          <div className="flex gap-5">
            {menuList[2].items.map(item => (
              <button
                key={item.label}
                type="button"
                className="flex flex-col lg:flex-row outline-none cursor-pointer"
                onClick={() => handlePlayVideo(item.src)}
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
                  <div className="px-1 py-px absolute bottom-3 left-3 bg-white/90 font-sans text-sm font-bold">
                    {currentVideo === item.src ? "Na fila de reprodução" : item.time}
                  </div>
                  <div className="absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4">
                    <div
                      className="size-14 flex justify-center items-center rounded-full bg-white/80"
                    >
                      <FaPlay />
                    </div>
                  </div>
                </div>
                <div className="p-2 md:p-5 min-h-35 lg:min-h-auto h-auto flex flex-col gap-y-3 justify-center bg-[#333]">
                  {item.tag ? (
                    <span className="px-2 w-fit bg-white font-gothic text-sm md:text-base uppercase text-[#111117]">
                      Novo
                    </span>
                  ) : (
                    <span className="w-5 h-5 opacity-0 invisible" />
                  )}
                  <div className="flex flex-col justify-start gap-y-1 text-left">
                    <p className="font-sans text-xs md:text-base font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="font-sans text-xs md:text-base text-neutral-300">
                      {item.date}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}