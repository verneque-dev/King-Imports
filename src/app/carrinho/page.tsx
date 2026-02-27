"use client"

import { Carrinho } from "@/interfaces/carrinho"
import { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { IoCart } from "react-icons/io5"

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<Carrinho>()
  function getCarrinho() {
    fetch("/api/carrinho?token=true", {
      credentials: "include",
      cache: "no-store"
    })
      .then((res) => res.json())
      .then((data) => setCarrinho(data))
  }
  useEffect(() => {
    getCarrinho()
  }, [])

  async function handleDeletarItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const itemId = formData.get("itemId")
    async function deleteItem() {
      const response = await fetch("/api/carrinho", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_item: itemId
        })
      })
      if (!response.ok) {
        throw new Error("Erro ao deletar item")
      }
      getCarrinho()
    }
    toast.promise(deleteItem(), {
      loading: 'Deletando item...',
      success: 'Item Deletado com sucesso!',
      error: 'Não foi possível deletar o item do carrinho.',
    })
  }

  async function handleFinalizarPedido(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    async function finalizar() {
      const response = await fetch("/api/carrinho/finalizar", {
        method: "POST",
        credentials: "include",
        cache: "no-store"
      })
      if (!response.ok) {
        throw new Error("Não foi possivel finalizar o pedido")
      }
      return await response.json()
    }
    toast.promise(finalizar(), {
      loading: "Finalizando o pedido...",
      success: (data: { url: string }) => {
        setTimeout(() => {
          window.location.href = data.url
        }, 2000)

        return "Pedido finalizado! Redirecionando..."
      },
      error: "Não foi possivel finalizar o pedido"
    })
  }


  return (
    <div className="max-w-[95%] mx-auto px-4 py-8 my-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)] bg-white flex flex-col gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {carrinho?.carrinho_itens?.map((item) => {
          return (
            <div key={item.produtos.id_produtos} className="flex flex-col rounded-lg overflow-hidden shadow-lg transition-transform">
              <div className="aspect-8/5 relative bg-gray-100">
                <Image
                  src={item.produtos.produtos_images[0] ? item.produtos.produtos_images[0].images_url : "/logo.jpeg"}
                  alt=""
                  fill
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 p-2 bg-white">
                <p className="text-base font-medium line-clamp-2 min-h-11 max-h-11"> {item.produtos.nome_produtos} </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-1"> {item.produtos.desc_produtos} </p>

                <div className="mt-auto flex items-end">
                  <span className="text-sm font-bold text-green-700"> total - R$ {item.produtos.preco_produtos * item.quantidade_itens} </span>
                  <span className="text-md font-medium text-black ml-auto"> {item.quantidade_itens}x </span>
                </div>
                <form action="" onSubmit={handleDeletarItem} method="post">
                  <input type="hidden" name="itemId" value={item.id_itens} />
                  <button type="submit" className="h-7 w-full bg-[#FF0000] cursor-pointer
              text-white text-lg rounded-xl font-medium py-5 px-8 flex items-center
              justify-center mt-5"> Excluir </button>
                </form>
              </div>
            </div>
          )
        })}
      </div>
      {carrinho?.carrinho_itens && carrinho.carrinho_itens.length > 0 ? (
        <form action="" method="post" onSubmit={handleFinalizarPedido} className="flex w-full justify-center">
          <button type="submit" className="bg-yellow-300
      text-white font w-full md:w-1/2 h-10 rounded-lg text-lg cursor-pointer"> Finalizar pedido </button>
        </form>
      ) : (
        <div className="mb-10 flex justify-center gap-2">
          <IoCart size={32} className="text-gray-500"/>
          <p className="text-center text-gray-500 text-xl mt-1"> O seu carrinho está vazio </p>
        </div>
      )} 
    </div>
  )
}