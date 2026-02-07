import { prisma } from "@/prismaClient";

interface Avaliacao {
  nome_user: string
  nota_avaliacao: number
  comentario_avaliacao: string
  id_produto: number
}

export const AvaliacoesRepository = {
  getAvaliacoes: async function () {
    const avaliacoes = await prisma.produtos_avaliacoes.findMany()
    return avaliacoes
  },

  getAvaliacoesPorProduto: async function (id_produto: number) {
    const avaliacoes = await prisma.produtos_avaliacoes.findMany({
      where: {
        id_produto: id_produto
      }
    })
    return avaliacoes
  },

  getAvliacoesById: async function (id_avaliacao: number) {
    const avaliacao = await prisma.produtos_avaliacoes.findUnique({
      where: {
        id_avaliacao: id_avaliacao
      }
    })
    return avaliacao
  },

  getAvaliacoesByQuery: async function (aprovado: boolean) {
    const avaliacoes = await prisma.produtos_avaliacoes.findMany({
      where: {
        aprovado: aprovado
      }
    })
    return avaliacoes
  },

  createAvaliacao: async function (body: Avaliacao) {
    const avaliacao = await prisma.produtos_avaliacoes.create({
      data: {
        nome_user: body.nome_user,
        nota_avaliacao: body.nota_avaliacao,
        comentario_avaliacao: body.comentario_avaliacao,
        id_produto: body.id_produto
      }
    })
    return avaliacao
  },

  deleteAvaliacao: async function (id: number) {
    const avaliacao = await prisma.produtos_avaliacoes.delete({
      where: {
        id_avaliacao: id
      }
    })
    return avaliacao
  },

  setStatus: async function (id: number, aprovado: boolean) {
    const avaliacao = await prisma.produtos_avaliacoes.update({
      where: {
        id_avaliacao: id
      },
      data: {
        aprovado: aprovado
      }
    })
    return avaliacao
  }
}