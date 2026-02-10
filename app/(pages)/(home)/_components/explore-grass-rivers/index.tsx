"use client"
import { useState } from "react"
import { PostCard } from "@/app/components/layout/post-card"

export const ExploreGrassRiversSection = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PostCard
      id="grass-rivers"
      open={open}
      setOpen={setOpen}
      posterImage="/images/explore-modal/grass-rivers/image-poster-grass-rivers.webp"
      posterImageAlt="Explore Grass Rivers"
      posterImageOverlay="/images/post-card/image-overlay-grass-rivers.webp"
      posterImageOverlayAlt="Grass Rivers"
      posterGradientBackground="from-[#2B3859] to-[#2C4234]"
      buttonText="Explore Grass Rivers"
      exploreModalTitle="Boas-vindas à região pantanosa"
      exploreModalSubtitle="A joia indomável da coroa de Leonida."
      exploreModalDescription="Nunca se sabe o que está debaixo da superfície nessa vastidão primordial. Os jacarés podem até ser as atrações mais famosas, mas há predadores muito mais mortais e descobertas muito mais estranhas em meio aos mangues."
      exploreModalSideImage="/images/explore-modal/grass-rivers/image-background.webp"
      exploreModalGradientBackground="linear-gradient(223.17deg,#515d47,#4e5b45 8.61%,#45563f 17.21%,#3a5039 25.82%,#324936 34.42%,#2e4435 43.03%,#2c4234 51.63%)"
      exploreModalButtonColors="bg-[#ffed95] text-[#694775]"
      exploreModalImages={[
        "/images/explore-modal/grass-rivers/image-01.webp",
        "/images/explore-modal/grass-rivers/image-02.webp",
        "/images/explore-modal/grass-rivers/image-03.webp",
        "/images/explore-modal/grass-rivers/image-04.webp"
      ]}
    />
  )
}
