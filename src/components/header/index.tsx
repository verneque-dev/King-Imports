"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FiMenu } from "react-icons/fi"
import { IoHome } from "react-icons/io5"
import { PiShoppingBagOpenFill } from "react-icons/pi"
import { FaPeopleGroup } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export function Header() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const search = pathname !== "/produtos" ? "" : searchParams.get("search") || ""
  const [searchBar, setSearchBar] = useState(search)
  
  useEffect(() => {
    setSearchBar(search)
  }, [search])


  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (searchBar) {
      params.set("search", searchBar.trim())
    }
    else {
      params.delete("search")
    }

    // pesquisa na pagina dashboard
    if (pathname === "/dashboard") {
      return router.push(`/dashboard?${params.toString()}`)
    }

    // pesquisa na pagina produtos
    const limit = params.get("limit") || "20"
    params.set("page", "1")
    params.set("limit", limit)
    router.push(`/produtos?${params.toString()}`)
  }

  const [open, setOpen] = useState(false)
  return (
    <div className="w-full bg-black h-20 flex items-end-safe gap-[3%] justify-end-safe px-[4%]">
      <Link href="/" className="mr-auto h-16 w-16 self-center">
        <Image
          src="/logo.jpeg"
          alt="Logo"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </Link>
      <form action="" onSubmit={handleSearch} method="GET" className="bg-white mb-2 h-8 md:w-[40%] w-[60%] flex relative
      border border-white focus-within:border-amber-300 mx-auto rounded-full">
        <input className="h-full w-full pl-3 focus:outline-none focus:ring-0" type="text" placeholder="buscar..." name="search"
          value={searchBar}
          onChange={(e) => {setSearchBar(e.target.value)}}
        />
        
        <div className="h-full w-8 bg-white mr-2 p-1.5">
          <Image
            src="/search.png"
            alt="cart"
            width={500}
            height={500}
            className="w-full h-full"
          />
        </div>
      </form>
      <nav className="items-end-safe w-[35%] justify-between ml-auto md:flex hidden">
        <Link href="/" className="text-white text-[100%] mb-2"> inicio </Link>
        <Link href="/produtos?page=1&limit=20" className="text-white text-[100%] mb-2"> produtos </Link>
        <Link href="/sobre" className="text-white text-[100%] mb-2"> sobre </Link>
        <Link href="/carrinho" className="h-8 w-8 mb-2">
          <Image
            src="/bag.png"
            alt="cart"
            width={300}
            height={300}
            className="w-full h-full"
          />
        </Link>
      </nav>
      <button onClick={() => setOpen(true)} className="md:hidden p-2">
        <FiMenu size={32} className="text-white" />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)}></div>
      )}
      <div className={`fixed top-0 right-0 h-full w-5/8 bg-linear-to-b from-white to-gray-100 z-50 transform
        transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}
        flex flex-col items-start font-medium gap-8`}>

        <div className="bg-[#FFC13B] h-1/4 w-full relative">
          <Image
            src="/banner-menu.png"
            alt="menu"
            fill
            className="object-cover"
          />
        </div>
        <div className="pl-8 flex flex-col gap-10 text-black text-xl">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-1"> <IoHome /> inicio </Link>
          <Link href="/produtos?page=1&limit=20" onClick={() => setOpen(false)} className="flex items-center gap-1"> <PiShoppingBagOpenFill /> produtos </Link>
          <Link href="/sobre" onClick={() => setOpen(false)} className="flex items-center gap-1"> <FaPeopleGroup />  sobre </Link>
          <Link href="/carrinho" onClick={() => setOpen(false)} className="flex items-center gap-1"> <AiFillShopping /> carrinho </Link>
        </div>
      </div>
    </div>
  )
}