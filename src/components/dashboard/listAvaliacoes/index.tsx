"use client"

import { ProdutoAvaliacoes } from "@/interfaces/produto"
import { MdDeleteForever } from "react-icons/md"
import { ImCheckboxChecked } from "react-icons/im"
import { urlApi } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function ListAvaliacoes(props: { avaliacoes: ProdutoAvaliacoes[] }) {
  const router = useRouter()
  function handleDelete(id: number) {
    async function deleteAvaliacao() {
      const res = await fetch(`${urlApi}/api/produtos/avaliacoes/${id}`, {
        method: "DELETE",
        credentials: "include"
      })

      if (!res.ok) {
        throw new Error("Falha ao deletar avaliação.")
      }
      router.refresh()
    }
    toast.promise(deleteAvaliacao(), {
      success: "Avaliação deletada com sucesso.",
      error: "Erro ao deletar avaliação.",
      loading: "Deletando avaliação..."
    })
  }

  function handleAprovar(id: number) {
    async function aprovar() {
      const res = await fetch(`${urlApi}/api/produtos/avaliacoes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          aprovado: true,
          id: id
        })
      })

      if (!res.ok) {
        throw new Error("Erro ao aprovar avaliação.")
      }
      router.refresh()
    }

    toast.promise(aprovar(), {
      success: "Avaliação aprovada com sucesso.",
      error: "Falha ao aprovar avaliação.",
      loading: "Aprovando avaliação..."
    })
  }
  return (
    <div className="flex flex-col w-full p-10">
      {props.avaliacoes.map((avaliacao, i) => {
        const dataObj = new Date(avaliacao.created_at);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
          timeZone: 'UTC'
        })
        return (
          <div className={`flex w-full border-x border-black p-3 rounded-lg 
                  ${i === 0 ? "border-y" : "border-b"} items-center gap-10`}
            key={avaliacao.id_avaliacao}>

            <div className="flex flex-col flex-wrap w-full break-all gap-3">
              <p className=""> {avaliacao.comentario_avaliacao} </p>
              <p className="font-semibold"> produto: {avaliacao.produtos.nome_produtos} </p>
              <p className="font-semibold"> {dataFormatada} </p>
            </div>
            <div className="ml-auto flex gap-6">
              {!avaliacao.aprovado && (
                <button className="cursor-pointer" onClick={() => handleAprovar(avaliacao.id_avaliacao)}>
                  <ImCheckboxChecked size={32} color="black" className="" />
                </button>
              )}

              <button className="cursor-pointer" onClick={() => handleDelete(avaliacao.id_avaliacao)}>
                <MdDeleteForever size={32} color="white" className="bg-black p-1 rounded-lg" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}