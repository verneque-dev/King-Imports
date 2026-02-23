"use client"

import React, { useEffect, useState } from "react"
import { FaStar, FaRegStar } from "react-icons/fa"
import { StarsBar } from "../starsMedia"
import { MdAccountCircle } from "react-icons/md"
import { ProdutoAvaliacoes } from "@/interfaces/produto"

export function FormAvaliacao(props: { produtoId: number }) {
  const [avaliacoesUser, setAvaliacoesUser] = useState([])
  const [nota, setNota] = useState(1)
  useEffect(() => {
    fetch(`/api/produtos/avaliacoes/${props.produtoId}/?token=true`, {
      credentials: "include",
      cache: "no-store"
    })
      .then(res => res.json())
      .then(data => setAvaliacoesUser(data))
  }, [props.produtoId])

  async function handleAvaliar(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const nome = formData.get("name")
    const coment = formData.get("coment")
    
    await fetch("/api/produtos/avaliacoes", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        nome_user: nome,
        nota_avaliacao: nota,
        comentario_avaliacao: coment,
        id_produto: props.produtoId
      })
    })
  }

  async function handleDeleteAvaliacao(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const avaliacaoId = formData.get("avaliacaoId")
    await fetch(`/api/produtos/avaliacoes/${avaliacaoId}`, {
      credentials: "include",
      method: "DELETE"
    })
  }

  return (
    <div>
      <form method="post" onSubmit={handleAvaliar} className="flex flex-col items-center gap-5 shadow-lg py-8 px-5 mb-15">
        <input type="text" name="name" required placeholder="Nome(obrigatório)" className="border h-10 w-full md:w-1/2 
        p-3 rounded-lg focus:outline-none focus:border-yellow-300"/>
        <input type="text" name="coment" placeholder="Comentário(opcional)" className="border h-9 w-full md:w-1/2 
        p-3 rounded-lg focus:outline-none focus:border-yellow-300"/>
        <div className="flex gap-1 text-yellow-300">
          {[1, 2, 3, 4, 5].map((n) => {
            let comp = <FaRegStar size={28} onClick={() => setNota(n)} className="cursor-pointer"/>
            if (nota >= n) {
              comp = <FaStar size={28} onClick={() => setNota(n)} className="cursor-pointer"/>
            }
            return (
              <div key={n}>
                {comp}
              </div>
            )
          })}
        </div>
        <button type="submit" className="bg-yellow-300 text-white mt-auto 
        md:w-1/2 w-full h-10 rounded-lg text-lg cursor-pointer"> Avaliar produto </button>
      </form>

      <div className="w-full bg-yellow-300 rounded-lg flex mb-8 items-center
      justify-center mx-auto p-3">
        <p className="text-[100%] sm:text-[120%] font-bold text-center text-white"> Confira as avaliações do produto </p>
      </div>

      {avaliacoesUser.map((avaliacao: ProdutoAvaliacoes) => {
        const dataObj = new Date(avaliacao.created_at);

        const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
          timeZone: 'UTC'
        });
        return (
          <div className="flex flex-col w-full justify-center mb-8" key={avaliacao.id_avaliacao}>
            <div className="flex items-center gap-2">
              <MdAccountCircle size={40} />
              <p className="text-xl font-semibold"> {avaliacao.nome_user} </p>
            </div>
            <div className="flex gap-2">
              <StarsBar media={avaliacao.nota_avaliacao} />
              <p> {dataFormatada} </p>
            </div>
            <div className="flex items-center mt-2 pl-1">
              <p className="text-lg"> {avaliacao.comentario_avaliacao} </p>
            </div>
            <form action="" method="post" onSubmit={handleDeleteAvaliacao}>
              <input type="hidden" name="avaliacaoId" value={avaliacao.id_avaliacao}/>
              <button type="submit" className="h-8 bg-[#FF0000] cursor-pointer
              text-white text-lg rounded-xl font-medium py-5 px-8 flex items-center
              justify-center mt-5"> Excluir </button>
            </form>
          </div>
        )
      })}
    </div>
  )
}