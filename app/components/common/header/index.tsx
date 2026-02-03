"use client"
import { useMenuStore } from "@/app/store"
import { Logo } from "../logo"

export const Header = () => {
  const { setOpen } = useMenuStore()

  const handleMenuOpen = () => {
    setOpen(true)
  }

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center lg:py-15 lg:px-10 z-99">
      <div>
        <Logo width="80" height="28" fill="#fff" />
      </div>
      <div>
        <button
          type="button"
          onClick={handleMenuOpen}
          className="flex flex-col gap-y-1.5"
        >
          <div className="w-7 h-1.5 bg-white" />
          <div className="w-7 h-1.5 bg-white" />
        </button>
      </div>
    </header>
  )
}
