"use client"

import { useState } from "react"
import { urlApi } from "@/lib/api"

export function FormAddCarrinho({
  defaultValue = 1,
  min = 1,
  max = 99,
  produtoId = 0
}) {
  const [qtd, setQtd] = useState(defaultValue)
  function aumentar() {
    setQtd(Math.min(max, qtd + 1))
  }
  function diminuir() {
    setQtd(Math.max(min, qtd - 1))
  }
  async function handleAddCart() {
    await fetch(`${urlApi}/api/carrinho`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        quantidade_itens: qtd,
        id_produto: produtoId
      })
    })

  }
  return (
    <form onSubmit={handleAddCart} className="mt-auto w-full flex flex-col gap-5">
      <div className="flex justify-center items-center w-41 gap-6 border border-black rounded-lg p-1">
        <button type="button" onClick={aumentar} className="w-13 h-13 bg-black text-white rounded-lg
        text-xl cursor-pointer"> + </button>
        <span className="text-xl"> {qtd} </span>
        <button type="button" onClick={diminuir} className="w-13 h-13 bg-black text-white rounded-lg
        text-xl cursor-pointer"> - </button>
      </div>
      <button type="submit" className="bg-yellow-300 text-white mt-auto w-full h-10 rounded-lg text-lg cursor-pointer"> Adicionar ao carrinho </button>
    </form>
  )
}