import { prisma } from "@/prismaClient";

interface CarrinhoItem {
  id_produto: number
  quantidade_itens: number
  id_carrinho: number
}

export const CarrinhoRepository = {
  getCarrinho: async function () {
    const carrinho = await prisma.carrinho.findMany({
      include: {
        carrinho_itens: true
      }
    })
    return carrinho
  },

  getCarrinhoById: async function (id: number) {
    const carrinho = await prisma.carrinho.findUnique({
      include: {
        carrinho_itens: true
      },
      where: {
        id_carrinho: id
      }
    })
    return carrinho
  },

  getCarrinhoByToken: async function (token: string) {
    const carrinho = await prisma.carrinho.findUnique({
      include: {
        carrinho_itens: true
      },
      where: {
        token: token
      }
    })
    return carrinho
  },

  createCarrinho: async function (token: string) {
    const carrinho = await prisma.carrinho.create({
      data: {
        token: token
      }
    })
    return carrinho
  },

  createCarrinhoItem: async function (body: CarrinhoItem) {
    const item = await prisma.carrinho_itens.upsert({
      where: {
        id_carrinho_id_produto: {
          id_produto: body.id_produto,
          id_carrinho: body.id_carrinho
        }
      },
      update: {
        quantidade_itens: { increment: body.quantidade_itens }
      },
      create :{
        quantidade_itens: body.quantidade_itens,
        id_produto: body.id_produto,
        id_carrinho: body.id_carrinho
      }
    })
    return item
  },

  deleteCarrinho: async function (id: number) {
    const carrinho = await prisma.carrinho.delete({
      where: {
        id_carrinho: id
      }
    })
    return carrinho
  },

  deleteCarrinhoItem: async function (id_carrinho: number, id_item: number) {
    const item = await prisma.carrinho_itens.delete({
      where: {
        id_itens: id_item,
        id_carrinho: id_carrinho
      }
    })
    return item
  }
}