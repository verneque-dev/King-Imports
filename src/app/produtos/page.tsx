import Image from "next/image"
import Link from "next/link"
import { Produto } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"

type Props = {
  searchParams: Promise<{ search: string }>
}

export default async function Produtos({ searchParams }: Props) {
  const { search } = await searchParams
  const query = search ? search : ""
  
  const res = await fetch(`${urlApi}/api/produtos/?search=${query}`, {
    cache: "no-store"
  })
  const produtos: Produto[] = await res.json()
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* cards */}
        {produtos.map((produto) => {
          return (
            <Link href={`/${produto.id_produtos}`} key={produto.id_produtos}>
              <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:scale-103 transition-transform">
                <div className="aspect-8/5 relative bg-gray-100">
                  <Image
                    src="/logo.jpeg"
                    alt=""
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 p-2">
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
        })}
      </div>
    </div>
  )
}