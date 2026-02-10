"use client"
import { useState } from "react"
import { PostCard } from "@/app/components/layout/post-card"

export const ExploreMountKalagaSection = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PostCard
      id="monte-kalaga"
      open={open}
      setOpen={setOpen}
      posterImage="/images/explore-modal/mount-kalaga/image-poster-mount-kalaga.webp"
      posterImageAlt="Explore Mount Kalaga"
      posterImageOverlay="/images/post-card/image-overlay-mount-kalaga.webp"
      posterImageOverlayAlt="Mount Kalaga"
      posterGradientBackground="from-[#000] to-[#1C1C1C]"
      buttonText="Explore Mount Kalaga"
      exploreModalTitle="País mais que selvagem"
      exploreModalSubtitle="Espaço para respirar nos rincões mais ao norte do estado."
      exploreModalDescription="Um marco nacional na fronteira norte do estado, o Monte Kalaga oferece excepcionais pontos de caça, pesca e trilhas off-road. Nas exuberantes matas ao redor, caipiras místicos e radicais paranoicos vivem longe dos olhos enxeridos do governo."
      exploreModalSideImage="/images/explore-modal/mount-kalaga/image-background.webp"
      exploreModalGradientBackground="linear-gradient(223.17deg,#515d47,#4e5b45 8.61%,#45563f 17.21%,#3a5039 25.82%,#324936 34.42%,#2e4435 43.03%,#2c4234 51.63%)"
      exploreModalButtonColors="bg-[#ffed95] text-[#694775]"
      exploreModalImages={[
        "/images/explore-modal/mount-kalaga/image-01.webp",
        "/images/explore-modal/mount-kalaga/image-02.webp",
        "/images/explore-modal/mount-kalaga/image-03.webp",
        "/images/explore-modal/mount-kalaga/image-04.webp",
        "/images/explore-modal/mount-kalaga/image-05.webp",
        "/images/explore-modal/mount-kalaga/image-06.webp"
      ]}
    />
  )
}
