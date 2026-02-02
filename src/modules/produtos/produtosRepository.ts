import { prisma } from "@/prismaClient";

interface Produto {
  nome_produto: string,
  desc_produto: string,
  preco_produto: number,
  categoria_id: number,
  produto_id?: number
}

export const ProdutosRepository = {
  getProdutos: async function () {
    const listProdutos = await prisma.produtos.findMany()
    return listProdutos
  },

  getProdutosById: async function (id: number) {
    const listProdutos = await prisma.produtos.findUnique({
      where: {
        id_produtos: id
      }
    })
    return listProdutos
  },

  getProdutosByName: async function (search: string) {
    const listProdutos = await prisma.produtos.findMany({
      where: {
        nome_produtos: {
          contains: search
        }
      }
    })
    return listProdutos
  },

  getProdutosPages: async function (page: number, limit: number) {
    const listProdutos = await prisma.produtos.findMany({
      skip: (page - 1) * limit, 
      take: limit,
      orderBy: {
        id_produtos: "asc"
      }
    })
    return listProdutos
  },

  createProdutos: async function (body: Produto) {
    const produto = await prisma.produtos.create({
      data: {
        nome_produtos: body.nome_produto,
        desc_produtos: body.desc_produto,
        preco_produtos: body.preco_produto,
        id_categoria: body.categoria_id
      }
    })
    return produto
  },

  deleteProdutos: async function (id: number) {
    const produto = await prisma.produtos.delete({
      where: {
        id_produtos: id
      }
    })
    return produto
  },

  updateProdutos: async function (body: Produto) {
   const produto = await prisma.produtos.update({
    where: {
      id_produtos: body.produto_id
    },
    data: {
      nome_produtos: body.nome_produto,
      desc_produtos: body.desc_produto,
      preco_produtos: body.preco_produto,
      id_categoria: body.categoria_id
    }
   })
   return produto
  }
}