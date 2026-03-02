import { prisma } from "@/prismaClient";

interface Produto {
  nome_produto: string
  desc_produto: string
  preco_produto: number
  categoria_id: number
  produto_id?: number
}

export const ProdutosRepository = {
  getProdutos: async function (page: number = 1, limit: number = 20) {
    const listProdutos = await prisma.produtos.findMany({
      include: {
        produtos_images: {
          where: {
            principal: true
          },
          take: 1
        },
        produtos_avaliacoes: {
          where: {
            aprovado: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        produtos_avaliacoes: {
          _count: "desc"
        }
      }
    })

    return listProdutos
  },

  getProdutosById: async function (id: number) {
    const listProdutos = await prisma.produtos.findUnique({
      include: {
        produtos_images: {
          orderBy: {
            principal: "desc"
          }
        }
      },
      where: {
        id_produtos: id
      }
    })
    return listProdutos
  },

  getProdutosByName: async function (search: string, page: number = 1, limit: number = 20) {
    const listProdutos = await prisma.produtos.findMany({
      include: {
        produtos_images: {
          where: {
            principal: true
          },
          take: 1
        },
        produtos_avaliacoes: {
          where: {
            aprovado: true
          }
        }
      },
      where: {
        nome_produtos: {
          contains: search,
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        produtos_avaliacoes: {
          _count: "desc"
        }
      }
    })
    return listProdutos
  },

  getProdutosByCategoria: async function (id: number, page: number = 1, limit: number = 20, search: string = "") {
    const listProdutos = await prisma.produtos.findMany({
      where: {
        id_categoria: id,
        nome_produtos: {
          contains: search
        }
      },
      include: {
        produtos_images: {
          where: {
            principal: true
          },
          take: 1
        },
        produtos_avaliacoes: {
          where: {
            aprovado: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        produtos_avaliacoes: {
          _count: "desc"
        }
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
  },

  totalProdutos: async function () {
    const total = await prisma.produtos.count()
    return total
  },

  totalProdutosCategoria: async function (categoria: number, search: string = "") {
    const total = await prisma.produtos.count({
      where: {
        nome_produtos: {
          contains: search
        },
        id_categoria: categoria
      }
    })
    return total
  },

  totalProdutosSearch: async function (search: string) {
    const total = await prisma.produtos.count({
      where: {
        nome_produtos: {
          contains: search
        }
      }
    })
    return total
  }
}