import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <div className="w-full bg-black h-18 gap-[5%] flex items-end-safe justify-end-safe pr-[6%] pl-[4%]">
      <div className="mr-auto h-17 w-17 self-center">
        <Image
          src="/logo.jpeg"
          alt="Logo"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>
      <form action="/produtos" method="GET" className="bg-white mb-2 h-7 w-[40%] flex relative
      border border-white focus-within:border-amber-300">
        <input className="h-full w-full pl-2 focus:outline-none focus:ring-0" type="text" placeholder="buscar..." name="search" />
        <div className="h-full w-7 bg-white mr-2 p-0.5">
          <Image
            src="/search.png"
            alt="cart"
            width={500}
            height={500}
            className="w-full h-full"
          />
        </div>
      </form>
      <Link href="/" className="text-white text-[100%] mb-2"> home </Link>
      <Link href="/produtos" className="text-white text-[100%] mb-2"> produtos </Link>
      <Link href="/" className="text-white text-[100%] mb-2"> sobre </Link>
      <Link href="/" className="h-8 w-8 mb-2">
        <Image
          src="/bag.png"
          alt="cart"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </Link>
    </div>
  )
}