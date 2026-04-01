import { FiltroCategoria } from "@/components/dashboard/filtroCategoria"
import { ListProdutos } from "@/components/dashboard/listProdutos"
import { Categoria } from "@/interfaces/categoria"
import { Dashboard } from "@/interfaces/dashboard"
import { Produto } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"
import { cookies } from "next/headers"

export default async function DashBoard({ searchParams }: { searchParams: Promise<{ categoria: string, search: string }> }) {
  const query = await searchParams
  const categoria = query.categoria || ""
  const search = query.search || ""

  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const resProdutos = await fetch(`${urlApi}/api/produtos?categoria=${categoria}&search=${search}`, {
    cache: "no-store"
  })
  const resCategorias = await fetch(`${urlApi}/api/categorias`, {
    cache: "no-store"
  })
  const resDashBoardData = await fetch(`${urlApi}/api/dashboard`, {
    headers: {
      "Cookie": cookieHeader
    },
    cache: "no-store"
  })

  const produtos: Produto = await resProdutos.json()
  const categorias: Categoria[] = await resCategorias.json()
  const stats: Dashboard = await resDashBoardData.json()

  return (
    <div className="flex flex-col items-center">
      <FiltroCategoria categorias={categorias} categoria={categoria} />
      <div className="grid grid-cols-2 sm:grid-cols-4 p-10 place-items-center gap-8">
        <div className="flex justify-center items-center h-16 w-36 bg-black rounded-lg shadow-lg">
          <p className="text-white font-bold"> {stats.produtos} produtos </p>
        </div>

        <div className="flex justify-center items-center h-16 w-36 bg-black rounded-lg shadow-lg">
          <p className="text-white font-bold"> {stats.categorias} categorias </p>
        </div>

        <div className="flex justify-center items-center h-16 w-36 bg-black rounded-lg shadow-lg">
          <p className="text-white font-bold"> {stats.avaliacoes} avaliações </p>
        </div>

        <div className="flex justify-center items-center h-16 w-36 bg-black rounded-lg shadow-lg">
          <p className="text-white font-bold"> {stats.carrinhos} carrinhos </p>
        </div>
      </div>

      <ListProdutos produtos={produtos} categorias={categorias} />
    </div>
  )
}