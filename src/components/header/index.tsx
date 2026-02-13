import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <div className="w-full bg-black h-18 gap-[5%] flex items-end-safe justify-end-safe pr-[6%] pl-[4%]">
      <div className="bg-white mr-auto h-17 w-17 self-center">
        <Image
          src="/logo.jpeg"
          alt="Logo"
          width={500}
          height={500}
          className="w-full h-full" 
        />
      </div>
      <Link href="/" className="text-white text-[100%] mb-2"> home </Link>
      <Link href="/" className="text-white text-[100%] mb-2"> produtos </Link>
      <Link href="/" className="text-white text-[100%] mb-2"> sobre </Link>
    </div>
  )
}