"use client"
import { Fragment } from "react"
import { PostCardItem } from "./post-card-item"
import { ExploreModal } from "../../common/modals/explore-modal"

interface PostCardProps {
  id: string
  posterImage: string
  posterImageAlt: string
  posterImageOverlay: string
  posterImageOverlayAlt: string
  posterGradientBackground: string
  buttonText: string
  open: boolean
  setOpen: (open: boolean) => void
  exploreModalTitle: string
  exploreModalSubtitle: string
  exploreModalDescription: string
  exploreModalSideImage: string
  exploreModalGradientBackground: string
  exploreModalButtonColors: string
  exploreModalImages: string[]
}

export const PostCard = ({
  id,
  posterImage,
  posterImageAlt,
  posterImageOverlay,
  posterImageOverlayAlt,
  posterGradientBackground,
  buttonText,
  open,
  setOpen,
  exploreModalTitle,
  exploreModalSubtitle,
  exploreModalDescription,
  exploreModalSideImage,
  exploreModalGradientBackground,
  exploreModalButtonColors,
  exploreModalImages
}: PostCardProps) => {
  return (
    <Fragment>
      <PostCardItem
        id={id}
        posterImage={posterImage}
        posterImageAlt={posterImageAlt}
        posterImageOverlay={posterImageOverlay}
        posterImageOverlayAlt={posterImageOverlayAlt}
        posterGradientBackground={posterGradientBackground}
        buttonText={buttonText}
        setOpen={setOpen}
      />
      <ExploreModal
        isOpen={open}
        onClose={() => setOpen(false)}
        exploreModalTitle={exploreModalTitle}
        exploreModalSubtitle={exploreModalSubtitle}
        exploreModalDescription={exploreModalDescription}
        exploreModalSideImage={exploreModalSideImage}
        exploreModalGradientBackground={exploreModalGradientBackground}
        exploreModalButtonColors={exploreModalButtonColors}
        exploreModalImages={exploreModalImages}
      />
    </Fragment>
  )
}