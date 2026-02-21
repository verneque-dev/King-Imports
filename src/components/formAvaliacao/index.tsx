"use client"

import { urlApi } from "@/lib/api"
import { useEffect, useState } from "react"

export function FormAvaliacao(props: { produtoId: number }) {
  const [avaliacoesUser, setAvaliacoes] = useState([])
  useEffect(() => {
    fetch(`/api/produtos/avaliacoes/${props.produtoId}/?token=true`, {
      credentials: "include",
      cache: "no-store"
    })
    .then(res => res.json())
    .then(data => setAvaliacoes(data))
  }, [props.produtoId])

  async function handleAvaliar(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
  }
  return (
    <div>
      <form onSubmit={handleAvaliar} className="flex bg-amber-200">
        <input type="text" placeholder="Nome" className=""/>
        <button type="submit"> para </button>
      </form>
    </div>
  )
}