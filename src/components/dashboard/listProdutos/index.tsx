"use client"

import { Produto, ProdutoUnico } from "@/interfaces/produto"
import { urlApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { toast } from "sonner"

export function ListProdutos(props: { produtos: Produto }) {
  const router = useRouter()
  const [produtoMenu, setProdutoMenu] = useState(0)
  const [produto, setProduto] = useState<ProdutoUnico | null>(null)
  useEffect(() => {
    if (produtoMenu > 0) {
      fetch(`${urlApi}/api/produtos/${produtoMenu}`)
      .then(res => res.json())
      .then(produto => setProduto(produto))
    }
  }, [produtoMenu])

  function handleDelete(id: number) {
    async function deleteProduto() {
      const res = await fetch(`${urlApi}/api/produtos/${id}`, {
        method: "DELETE"
      })
      if (!res.ok) {
        throw new Error("Falha ao deletar produto")
      }

      router.refresh()
    }

    toast.promise(deleteProduto(), {
      success: "Produto deletado com sucesso.",
      error: "Falha ao deletar produto.",
      loading: "Deletando produto..."
    })
  }

  return (
    <div className="flex flex-col w-full px-5 pb-10">
      {props.produtos.data.map((produto, i) => {
        return (
          <div className={`flex w-full border-x border-black p-3 rounded-lg 
          ${i === 0 ? "border-y" : "border-b"} items-center gap-2`}
            key={produto.id_produtos}>

            <p className="truncate w-28 sm:w-36 min-h-0"> {produto.nome_produtos} </p>
            <p className="text-sm sm:text-base"> {produto.preco_produtos} R$ </p>

            <div className="ml-auto flex gap-6">
              <button onClick={() => setProdutoMenu(produto.id_produtos)} className="cursor-pointer">
                <MdEdit size={32} color="white" className="bg-black p-1 rounded-lg" />
              </button>
              <button onClick={() => handleDelete(produto.id_produtos)} className="cursor-pointer">
                <MdDeleteForever size={32} color="white" className="bg-black p-1 rounded-lg" />
              </button>
            </div>
          </div>
        )
      })}
      {produtoMenu > 0 && (
        <div>
          <div onClick={() => setProdutoMenu(0)} className="fixed inset-0 bg-black/50 z-40 overflow-hidden"></div>

          <div className="flex flex-col fixed bg-black h-100 shadow-2xl rounded-2xl
          p-10 items-center md:w-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">

            <form method="post" className="flex flex-col gap-5">
              <input type="text" name="name" placeholder="nome" required 
              className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.nome_produtos ?? ""}/>

              <input type="text" name="desc" placeholder="descrição" required 
              className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.desc_produtos ?? ""}/>

              <input type="text" name="price" placeholder="preço" required 
              className="bg-white h-10 p-4 rounded-lg w-64" defaultValue={produto?.preco_produtos ?? ""}/>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}