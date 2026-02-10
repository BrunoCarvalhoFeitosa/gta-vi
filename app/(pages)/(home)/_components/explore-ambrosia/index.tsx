"use client"
import { useState } from "react"
import { PostCard } from "@/app/components/layout/post-card"

export const ExploreAmbrosiaSection = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PostCard
      id="ambrosia"
      open={open}
      setOpen={setOpen}
      posterImage="/images/explore-modal/ambrosia/image-poster-ambrosia.webp"
      posterImageAlt="Explore Ambrosia"
      posterImageOverlay="/images/post-card/image-overlay-ambrosia.webp"
      posterImageOverlayAlt="Ambrosia"
      posterGradientBackground="from-[#723A5F] to-[#000]"
      buttonText="Explore Ambrosia"
      exploreModalTitle="Mantendo Leonida açucarada"
      exploreModalSubtitle="A batalha pelas belezas e riquezas de Leonida começa aqui."
      exploreModalDescription="No coração de Leonida, a indústria americana e os valores tradicionais ainda predominam – a qualquer custo. A refinaria de açúcar Allied Crystal oferece os empregos enquanto a gangue de motoqueiros local oferece quase todo o resto."
      exploreModalSideImage="/images/explore-modal/ambrosia/image-background.webp"
      exploreModalGradientBackground="linear-gradient(223.17deg,#545b75,#515872 8.61%,#4a526c 17.21%,#424964 25.82%,#3a415c 34.42%,#343b56 43.03%,#323953 51.63%)"
      exploreModalButtonColors="bg-[#e1e160] text-[#694775]"
      exploreModalImages={[
        "/images/explore-modal/ambrosia/image-01.webp",
        "/images/explore-modal/ambrosia/image-02.webp",
        "/images/explore-modal/ambrosia/image-03.webp",
        "/images/explore-modal/ambrosia/image-04.webp",
        "/images/explore-modal/ambrosia/image-05.webp"
      ]}
    />
  )
}
