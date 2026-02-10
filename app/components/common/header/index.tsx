"use client"
import { useMenuStore } from "@/app/store/menu-store"
import { Logo } from "../logo"

export const Header = () => {
  const { setOpen } = useMenuStore()

  const handleMenuOpen = () => {
    setOpen(true)
  }

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center py-5 px-4 lg:py-15 lg:px-10 z-99">
      <div>
        <Logo width="32" height="32" fill="#fff" />
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="flex flex-col gap-y-1.5 outline-none"
          onClick={handleMenuOpen}
        >
          <div className="w-7 h-1.5 bg-white" />
          <div className="w-7 h-1.5 bg-white" />
        </button>
      </div>
    </header>
  )
}
