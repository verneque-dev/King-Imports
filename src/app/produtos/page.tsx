import Image from "next/image"
import Link from "next/link"
import { Produto } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"
import { FiltroCategoria } from "@/components/filtroCategorias"

type Props = {
  searchParams: Promise<{
    search: string
    categoria: string
    page: string
    limit: string
  }>
}

export default async function Produtos({ searchParams }: Props) {
  const {
    categoria = "",
    search = "",
    page = "1",
    limit = "20"
  } = await searchParams

  const params = new URLSearchParams()
  if (categoria) {
    params.append("categoria", categoria)
  }
  if (search) {
    params.append("search", search)
  }
  if (page) {
    params.append("page", page)
    params.append("limit", limit)
    console.log(limit)
  }
  const query = params.toString()

  const res = await fetch(`${urlApi}/api/produtos/?${query}`, {
    cache: "no-store"
  })
  const produtos: Produto = await res.json()

  const resCategorias = await fetch(`${urlApi}/api/categorias`, {
    cache: "no-store"
  })
  const categorias = await resCategorias.json()
  return (
    <div className="flex flex-col min-h-[85vh]">
      <FiltroCategoria categoria={categoria} categorias={categorias} />
      <div className="w-[95%] mx-auto px-4 py-8 my-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)] bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* cards */}
          {Array.isArray(produtos.data) && produtos.data.length > 0 ? (
            produtos.data.map((produto) => {
              return (
                <Link href={`/produtos/${produto.id_produtos}`} key={produto.id_produtos}>
                  <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:scale-103 transition-transform">
                    <div className="aspect-8/5 relative bg-gray-100">
                      <Image
                        src={produto.produtos_images[0] ? produto.produtos_images[0].images_url : "/logo.jpeg"}
                        alt=""
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1 p-2 bg-white">
                      <p className="text-base font-medium line-clamp-2 min-h-11 max-h-11"> {produto.nome_produtos} </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-1"> {produto.desc_produtos} </p>

                      <div className="mt-auto flex items-end">
                        <span className="text-sm font-bold text-green-700"> R$ {produto.preco_produtos} </span>
                        <div className="ml-auto">
                          <div className="flex gap-0.5">
                            <div className="h-3.5 w-3.5">
                              <Image
                                src="/star.png"
                                alt="star"
                                height={100}
                                width={100}
                                className="w-full h-full"
                              />
                            </div>
                            <span className="text-xs font-bold text-amber-300"> {produto.media}({produto.quantidade}) </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : <p> Nenhum produto encontrado... </p>}
        </div>
      </div>

      <div className="flex w-full justify-center mt-auto p-5">
        <div className="flex justify-center items-center gap-6 border border-black rounded-lg p-1 top-20">
          <form action="/produtos" method="get">
            {search && <input type="hidden" name="search" value={search} />}
            {categoria && <input type="hidden" name="categoria" value={categoria} />}
            <input type="hidden" name="page" value={Number(page) - 1} />
            <input type="hidden" name="limit" value={limit} />
            <button type="submit" className={`w-24 h-12 bg-black text-white rounded-lg
        text-base cursor-pointer ${Number(page) === 1 ? "hidden" : "block"}`}> Anterior </button>
          </form>

          <span className="text-xl"> {page} </span>

          <form action="/produtos" method="get">
            {search && <input type="hidden" name="search" value={search} />}
            {categoria && <input type="hidden" name="categoria" value={categoria} />}
            <input type="hidden" name="page" value={Number(page) + 1} />
            <input type="hidden" name="limit" value={limit} />
            <button type="submit" className={`w-24 h-13 bg-black text-white rounded-lg
        text-base cursor-pointer ${Number(page) === produtos.pages ? "hidden" : "block"}`}> Proxima </button>
          </form>
        </div>
      </div>
    </div>
  )
}