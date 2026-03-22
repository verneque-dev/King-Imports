import { FiltroAvaliacoes } from "@/components/dashboard/filtroAvaliacoes"
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
  const avaliaoes = await res.json()

  return (
    <div>
      <FiltroAvaliacoes />
    </div>
  )
}