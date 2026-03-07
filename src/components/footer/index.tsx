import Link from "next/link";

export function Footer() {
  return (
    <div className="flex flex-col w-full bg-black text-white p-6 gap-5">
      <div className="flex gap-20">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg"> Acesse </p>
          <Link href="/"> Inicio </Link>
          <Link href="/produtos"> Produtos </Link>
          <Link href="#"> Sobre </Link>
          <Link href="/carrinho"> Carrinho </Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg"> Contatos </p>
        </div>
      </div>
      <div className="mx-auto">
        <p className="text-base"> © 2026 King Imports. Todos os direitos reservados. </p>
      </div>
    </div>
  )
}