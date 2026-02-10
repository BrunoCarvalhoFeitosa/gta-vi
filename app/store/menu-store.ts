import { create } from "zustand"

interface MenuState {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  open: false,
  setOpen: (open) => set({ open })
}))
