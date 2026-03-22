import { urlApi } from "@/lib/api"
import { ListCategorias } from "@/components/dashboard/listCategorias"

export default async function CategoriaPage() {
  const res = await fetch(`${urlApi}/api/categorias`, {
    cache: "no-store"
  })
  const categorias = await res.json()
  return (
    <div className="flex flex-col w-full px-5 py-10">
      <ListCategorias categorias={categorias}/>
    </div>
  )
}