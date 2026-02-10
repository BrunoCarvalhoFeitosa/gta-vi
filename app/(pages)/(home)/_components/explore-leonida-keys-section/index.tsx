"use client"
import { useState } from "react"
import { PostCard } from "@/app/components/layout/post-card"

export const ExploreLeonidaKeysSection = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PostCard
      id="leonida-keys"
      open={open}
      setOpen={setOpen}
      posterImage="/images/explore-modal/leonida-keys/image-poster-leonida-keys.webp"
      posterImageAlt="Explore Leonida Keys"
      posterImageOverlay="/images/post-card/image-overlay-leonida-keys.webp"
      posterImageOverlayAlt="Leonida Keys"
      posterGradientBackground="from-[#6F4D7F] to-[#2B3859]"
      buttonText="Explore Leonida Keys"
      exploreModalTitle="Portal para o paraíso"
      exploreModalSubtitle="O traje é casual e os bares estão cheios."
      exploreModalDescription="A vida nesse arquipélago tropical não é ostentosa, mas é fácil. Aprecie a vibe e pegue uma espreguiçadeira, mas cuidado – você está diante das águas que estão entre as mais belas e perigosas dos Estados Unidos."
      exploreModalSideImage="/images/explore-modal/leonida-keys/image-background.webp"
      exploreModalGradientBackground="linear-gradient(223.17deg,#237287,#246c84 8.61%,#265f7c 17.21%,#274f72 25.82%,#284367 34.42%,#283a5f 43.03%,#28375c 51.63%)"
      exploreModalButtonColors="bg-[#91dfec] text-[#694775]"
      exploreModalImages={[
        "/images/explore-modal/leonida-keys/image-01.webp",
        "/images/explore-modal/leonida-keys/image-02.webp",
        "/images/explore-modal/leonida-keys/image-03.webp",
        "/images/explore-modal/leonida-keys/image-04.webp",
        "/images/explore-modal/leonida-keys/image-05.webp"
      ]}
    />
  )
}
