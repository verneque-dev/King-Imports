import { FiltroAvaliacoes } from "@/components/dashboard/filtroAvaliacoes"
import { ListAvaliacoes } from "@/components/dashboard/listAvaliacoes"
import { ProdutoAvaliacoes } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"
import { cookies } from "next/headers"

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
      <ListAvaliacoes avaliacoes={avaliacoes}/>
    </div>
  )
}