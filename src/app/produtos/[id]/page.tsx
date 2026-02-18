import { CarroselProdutos } from "@/components/carroselProdutos"
import { urlApi } from "@/lib/api"

export default async function produtoDetails(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const res = await fetch(`${urlApi}/api/produtos/${id}`, {
    cache: "no-store"
  })
  const produto = await res.json()

  return (
    <div className="max-w-[80%] mx-auto p-1 md:p-5  my-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-15 p-8">
        <div className="aspect-square">
          <CarroselProdutos produto={produto}/>
        </div>

        <div className="bg-blue-400">
          aa
        </div>
      </div>
    </div>
  )
}