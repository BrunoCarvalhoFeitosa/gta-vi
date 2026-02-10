import { create } from "zustand"

interface VideoModalState {
  openVideoModal: boolean
  setOpenVideoModal: (openVideoModal: boolean) => void
}

export const useVideoModalStore = create<VideoModalState>((set) => ({
  openVideoModal: false,
  setOpenVideoModal: (openVideoModal) => set({ openVideoModal })
}))
