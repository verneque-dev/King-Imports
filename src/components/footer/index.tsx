import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

export function Footer() {
  return (
    <div className="flex flex-col w-full bg-black text-white p-6 gap-5 mt-auto">
      <div className="flex gap-15 md:gap-24">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-lg"> Acesse </p>
          <Link href="/"> Inicio </Link>
          <Link href="/produtos"> Produtos </Link>
          <Link href="#"> Sobre </Link>
          <Link href="/carrinho"> Carrinho </Link>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-semibold text-lg"> Contatos </p>
          <Link href="https://www.instagram.com/king.importss01" className="flex gap-2">
            <FaInstagram size={20} className="mt-px"/>
            <span> Instagram </span>
          </Link>

          <Link href="https://wa.me/5511998406942" className="flex gap-2">
            <FaWhatsapp size={20} className="mt-px"/>
            <span> WhatsApp </span>
          </Link>

          <div className="flex gap-2">
            <BsTelephone size={20} className="mt-px"/>
            <span> (11) 99840-6942 </span>
          </div>

          <div className="flex gap-2">
            <MdOutlineEmail size={20} className="mt-px"/>
            <span> king.importss01@gmail.com </span>
          </div>
        </div>
      </div>
      <div className="mx-auto border-t border-white pt-2 w-full text-center">
        <p className="text-sm"> © 2026 King Imports. Todos os direitos reservados. </p>
      </div>
    </div>
  )
}