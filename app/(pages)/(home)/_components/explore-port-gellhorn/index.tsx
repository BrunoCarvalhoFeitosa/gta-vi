"use client"
import { useState } from "react"
import { PostCard } from "@/app/components/layout/post-card"

export const ExplorePortGellhornSection = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PostCard
      id="port-gellhorn"
      open={open}
      setOpen={setOpen}
      posterImage="/images/explore-modal/port-gellhorn/image-poster-port-gellhorn.webp"
      posterImageAlt="Explore Port Gellhorn"
      posterImageOverlay="/images/post-card/image-overlay-port-gellhorn.webp"
      posterImageOverlayAlt="Port Gellhorn"
      posterGradientBackground="from-[#2C4234] to-[#723A5F]"
      buttonText="Explore Port Gellhorn"
      exploreModalTitle="Viva intensamente"
      exploreModalSubtitle="O litoral esquecido de Leonida."
      exploreModalDescription="Motéis baratos, atrações fechadas e centros comerciais vazios não vão trazer os turistas de volta, mas há uma nova economia nesse destino de férias que já foi popular. Essa economia é movida a licor de malte, analgésicos e energéticos de paradas de caminhão. Suba em uma moto de trilha e segure sua carteira."
      exploreModalSideImage="/images/explore-modal/port-gellhorn/image-background.webp"
      exploreModalGradientBackground="linear-gradient(223.17deg,#c36267,#bd5f68 8.61%,#ae586a 17.21%,#9b4e69 25.82%,#874466 34.42%,#783d61 43.03%,#723a5f 51.63%)"
      exploreModalButtonColors="bg-[#ffc2d0] text-[#694775]"
      exploreModalImages={[
        "/images/explore-modal/port-gellhorn/image-01.webp",
        "/images/explore-modal/port-gellhorn/image-02.webp",
        "/images/explore-modal/port-gellhorn/image-03.webp",
        "/images/explore-modal/port-gellhorn/image-04.webp",
        "/images/explore-modal/port-gellhorn/image-05.webp"
      ]}
    />
  )
}
