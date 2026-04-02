import { FiltroAvaliacoes } from "@/components/dashboard/filtroAvaliacoes"
import { ListAvaliacoes } from "@/components/dashboard/listAvaliacoes"
import { urlApi } from "@/lib/api"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function Avaliacoes({ searchParams }: { searchParams: Promise<{ aprovado: string }> }) {
  const query = await searchParams
  const aprovado = query.aprovado ? `?aprovado=${query.aprovado}` : ""

  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const res = await fetch(`${urlApi}/api/produtos/avaliacoes/${aprovado}`, {
    headers: {
      "Cookie": cookieHeader
    },
    cache: "no-store"
  })
  const avaliacoes = await res.json()

  return (
    <div>
      <FiltroAvaliacoes />
      <div className="flex gap-5 mx-auto flex-wrap justify-center mt-10">
        <Link href="/dashboard" className="w-36 py-3 bg-yellow-300 text-white
                font-bold cursor-pointer rounded-lg text-lg flex justify-center items-center h-14"> inicio </Link>

        <Link href="/dashboard/categorias" className="w-36 py-3 bg-yellow-300 text-white
                font-bold cursor-pointer rounded-lg mb-10 text-lg flex justify-center items-center h-14"> categorias </Link>
      </div>
      <ListAvaliacoes avaliacoes={avaliacoes} />
    </div>
  )
}