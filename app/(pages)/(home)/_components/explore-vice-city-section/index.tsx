"use client"
import { useState } from "react"
import { PostCard } from "@/app/components/layout/post-card"

export const ExploreViceCitySection = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PostCard
      id="vice-city"
      open={open}
      setOpen={setOpen}
      posterImage="/images/explore-modal/vice-city/image-poster-vice-city.webp"
      posterImageAlt="Explore Vice City"
      posterImageOverlay="/images/post-card/image-overlay-vice-city.webp"
      posterImageOverlayAlt="Vice City"
      posterGradientBackground="from-blue-600 to-[#6F4D7F]"
      buttonText="Explore Vice City"
      exploreModalTitle="Tudo em excesso"
      exploreModalSubtitle="Os anos 80 já passaram faz tempo, mas Vice City ainda é a capital do sol e da diversão nos Estados Unidos."
      exploreModalDescription="O glamour, a malandragem e a ganância dos Estados Unidos condensados em uma só cidade. Cada bairro tem algo a oferecer, de hotéis com art déco em tons pasteis e areias brancas de Ocean Beach, até as movimentadas panaderías de Little Cuba e as marcas falsificadas do mercado de Tisha-Wocka, chegando ao Porto de Vice City, a capital mundial dos navios de cruzeiro."
      exploreModalSideImage="/images/explore-modal/vice-city/image-background.webp"
      exploreModalGradientBackground="linear-gradient(223.17deg,#8c7bc8,#8a77c2 8.61%,#866db2 17.21%,#7e619f 25.82%,#75548b 34.42%,#6d4b7b 43.03%,#694775 51.63%)"
      exploreModalButtonColors="bg-[#ffc2d0] text-[#694775]"
      exploreModalImages={[
        "/images/explore-modal/vice-city/image-01.webp",
        "/images/explore-modal/vice-city/image-02.webp",
        "/images/explore-modal/vice-city/image-03.webp",
        "/images/explore-modal/vice-city/image-04.webp",
        "/images/explore-modal/vice-city/image-05.webp",
        "/images/explore-modal/vice-city/image-06.webp",
        "/images/explore-modal/vice-city/image-07.webp",
        "/images/explore-modal/vice-city/image-08.webp",
        "/images/explore-modal/vice-city/image-09.webp"
      ]}
    />
  )
}
