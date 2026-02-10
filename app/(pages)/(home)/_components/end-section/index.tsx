"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Image from "next/image"
import Link from "next/link"
import { VectorRockstar } from "@/app/components/vectors/vector-rockstar"
import { VectorXbox } from "@/app/components/vectors/vector-xbox"
import { VectorPS5 } from "@/app/components/vectors/vector-ps5"

gsap.registerPlugin(ScrollTrigger)

const GRADIENT_START = "radial-gradient(circle at 50% 60vh, rgb(255, 212, 129) 0vh, rgb(237, 70, 108) 50vh, rgb(124, 34, 102) 90vh, rgba(32, 31, 66, 0) 120vh)"
const GRADIENT_MIDDLE = "radial-gradient(circle at 50% 20vh, rgb(255, 213, 132) 0vh, rgb(244, 75, 90) 50vh, rgb(138, 40, 104) 90vh, rgba(32, 31, 66, 0) 135vh)"
const GRADIENT_END = "radial-gradient(circle at 50% -30vh, rgb(255, 214, 135) 0vh, rgb(252, 82, 67) 50vh, rgb(157, 47, 106) 90vh, rgba(32, 31, 66, 0) 150vh)"

export const EndSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const videoWrapper = videoWrapperRef.current
    const pin = pinRef.current
    const img = imgRef.current
    const paragraph = paragraphRef.current

    if (!video || !videoWrapper || !pin || !img || !paragraph) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ScrollTrigger.create({
              trigger: videoWrapper,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              onUpdate: self => {
                video.currentTime = self.progress * video.duration
              }
            })

            const overlayTL = gsap.timeline({
              scrollTrigger: {
                trigger: pin,
                start: `top top`,
                end: "+=200%",
                pin: true,
                scrub: true,
                anticipatePin: 1
              }
            })

            overlayTL
              .fromTo(
                [img, paragraph], {
                  scale: 1
                },
                {
                  scale: 0.75,
                  ease: "none"
                }
              )
              .to(
                {},
                {
                  onUpdate: () => {
                    const progress = overlayTL.progress()

                    paragraph.style.backgroundImage =
                      progress < 0.33
                        ? GRADIENT_START
                        : progress < 0.66
                        ? GRADIENT_MIDDLE
                        : GRADIENT_END
                  }
                },
                0
              )

            observer.disconnect()
          }
        })
      },
      { threshold: 0.9 }
    )

    observer.observe(videoWrapper)

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div
        ref={videoWrapperRef}
        className="w-full h-dvh"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          src="/videos/video-end.mp4"
        />
      </div>
      <div
        ref={pinRef}
        className="w-screen h-screen flex flex-col justify-center items-center bg-black"
      >
        <Image
          ref={imgRef}
          src="/images/logo/image-logo-gradient.png"
          width={300}
          height={300}
          alt="Logo gradiente"
        />
        <p
          ref={paragraphRef}
          className="mt-12 text-[38px] md:text-[80px] lg:text-[130px] font-bold text-center uppercase leading-none"
          style={{
            backgroundImage: GRADIENT_START,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Disponível em <br /> 19 de novembro <br /> de 2026
        </p>
      </div>

      <div className="px-5">
        <div className="py-8 flex flex-col lg:flex-row justify-center items-center gap-8">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            Adicione à lista de desejos
          </h4>
          <div className="flex items-center gap-3 md:gap-6">
            <Link
              href="https://www.playstation.com/pt-br/games/grand-theft-auto-vi"
              target="_blank"
            >
              <div className="py-3 px-6 rounded-4xl bg-[#333]">
                <VectorPS5 width="90" height="30" fill="#fff" />
              </div>
            </Link>
            <Link
              href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9nl3wwnzlzzn"
              target="_blank"
            >
              <div className="py-3 px-6 rounded-4xl bg-[#333]">
                <VectorXbox width="160" height="30" fill="#fff" />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <Link
            href="https://signin.rockstargames.com/signin/user-form?cid=rsg&returnUrl=%2FVI%2F"
            target="_blank"
          >
            <div className="mx-auto py-7 px-8 flex flex-col lg:flex-row items-center gap-8 border border-white md:rounded-full md:max-w-2xl lg:max-w-5xl">
              <div className="flex flex-col md:flex-row items-center gap-3 lg:w-112.5">
                <VectorRockstar width="30" height="30" fill="#fff" />
                <p className="md:text-xl font-bold uppercase text-center md:text-left text-white">
                  Receber propaganda da Rockstar
                </p>
              </div>
              <div className="mx-auto md:w-2/3 lg:w-auto lg:flex-1">
                <p className="text-sm md:text-base text-center text-white">
                  Receba anúncios de jogo mais recentes, notícias sobre eventos especiais e promoções e muito mais da Rockstar Games.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="py-12 flex justify-center">
          <nav>
            <ul className="flex flex-col lg:flex-row items-center gap-5">
              <li className="font-bold text-center text-white hover:underline">
                <Link
                  href="https://www.rockstargames.com/br/corpinfo"
                  target="_blank"
                >
                  Corporativo
                </Link>
              </li>
              <li className="font-bold text-center text-white hover:underline">
                <Link
                  href="https://www.rockstargames.com/br/privacy"
                  target="_blank"
                >
                  Privacidade
                </Link>
              </li>
              <li className="font-bold text-center text-white hover:underline">
                <Link
                  href="/"
                  target="_blank"
                >
                  Configurações de cookie
                </Link>
              </li>
              <li className="font-bold text-center text-white hover:underline">
                <Link
                  href="https://www.rockstargames.com/br/cookies"
                  target="_blank"
                >
                  Política de cookies
                </Link>
              </li>
              <li className="font-bold text-center text-white hover:underline">
                <Link
                  href="https://www.rockstargames.com/br/legal"
                  target="_blank"
                >
                  Jurídico
                </Link>
              </li>
              <li className="font-bold text-center text-white hover:underline">
                <Link
                  href="https://www.rockstargames.com/br/ccpa"
                  target="_blank"
                >
                  Não vender nem compartilhar as minhas informações pessoais
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pb-20 mx-auto flex flex-col lg:flex-row justify-center items-center gap-8 lg:max-w-xl">
          <div className="">
            <p className="text-xs font-extrabold text-center uppercase leading-none text-white">
              Verifique a <br/> classificação <br/> indicativa
            </p>
          </div>
          <div className="mx-auto md:w-2/4 lg:w-auto">
            <p className="text-center text-white">
              Pode incluir conteúdo inapropriado para crianças. Acesse <Link href="https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1" target="_blank" className="font-bold underline">gov.br</Link> para ver informações da classificação indicativa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
