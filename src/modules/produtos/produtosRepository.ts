import { prisma } from "@/prismaClient";

export const ProdutosRepository = {
  getProdutos: async function() {
    const listProdutos = await prisma.produtos.findMany()
    return listProdutos
  },

  getProdutosById: async function(id: number) {
    const listProdutos = await prisma.produtos.findUnique({
      where: { id_produtos: id }
    })
  }
}