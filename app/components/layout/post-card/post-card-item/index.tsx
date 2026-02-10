"use client"
import clsx from "clsx"
import Image from "next/image"

interface PostCardItemProps {
  id: string
  posterImage: string
  posterImageAlt: string
  posterImageOverlay: string
  posterImageOverlayAlt: string
  posterGradientBackground: string
  buttonText: string
  setOpen: (open: boolean) => void
}

export const PostCardItem = ({
  id,
  posterImage,
  posterImageAlt,
  posterImageOverlay,
  posterImageOverlayAlt,
  posterGradientBackground,
  buttonText,
  setOpen
}: PostCardItemProps) => {
  return (
    <section
      id={id}
      className={clsx(
        "relative py-20 md:py-40 lg:py-70 w-full bg-linear-to-b",
        posterGradientBackground
      )}
    >
      <div
        className="group relative mx-auto w-full lg:max-w-4xl xl:max-w-6xl h-120 md:h-auto 2xl:max-w-350 border-12 md:border-25 border-white overflow-hidden transition-all duration-1000 hover:rotate-2 hover:shadow-2xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="w-250 h-187.5">
          <Image
            src={posterImage}
            alt={posterImageAlt}
            width={1000}
            height={1000}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <Image
          src={posterImageOverlay}
          alt={posterImageOverlayAlt}
          width={500}
          height={320}
          className="absolute top-5 left-1/2 -translate-x-1/2 w-40 h-16 md:w-80 md:h-40 object-contain lg:w-auto lg:h-auto"
        />
        <Image
          src="/images/post-card/image-overlay-visit-leonida.webp"
          alt="Visite Grass Rivers"
          width={220}
          height={100}
          className="absolute bottom-5 left-5 w-30 h-12.5 md:w-auto md:h-auto"
        />
        <div className="py-4 px-10 absolute w-[90%] md:w-fit bottom-35 md:bottom-1/2 lg:bottom-8 left-1/2 md:translate-y-1/2 lg:translate-y-0 -translate-x-1/2 rounded-4xl font-gothic text-xl md:text-2xl text-center bg-white group-hover:bg-[#FFF8CB] transition-all duration-1000">
          {buttonText}
        </div>
      </div>
    </section>
  )
}
