import { prisma } from "@/prismaClient";

interface Produto {
  nome_produto: string,
  desc_produto: string,
  preco_produto: number,
  categoria_id: number,
  produto_id?: number
}

interface Images {
  url_image: string,
  produto_id: number,
  principal: boolean,
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
  },

  getImages: async function () {
    const images = await prisma.produtos_images.findMany()
    return images
  },

  getImagesById: async function (id: number) {
    const images = await prisma.produtos_images.findUnique({
      where: {
        id_images: id
      }
    })
    return images
  },

  uploadImage: async function (body: Images) {
    const image = await prisma.produtos_images.create({
      data: {
        images_url: body.url_image,
        id_produto: body.produto_id,
        principal: body.principal
      }
    })
    return image
  },

  deleteImage: async function (id: number) {
    const image = await prisma.produtos_images.delete({
      where: {
        id_images: id
      }
    })
    return image
  }
}