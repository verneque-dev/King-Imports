import { prisma } from "@/prismaClient"

export const DashBoardRepository = {
  produtosCount: async function () {
    return await prisma.produtos.count()
  },

  categoriasCount: async function () {
    return await prisma.categorias.count()
  },

  carrinhosCount: async function () {
    return await prisma.carrinho.count()
  },

  avaliacoesCount: async function () {
    return await prisma.produtos_avaliacoes.count()
  }
}