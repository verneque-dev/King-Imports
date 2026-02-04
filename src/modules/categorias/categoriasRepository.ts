import { prisma } from "@/prismaClient";

export const CategoriasRepository = {
  getCategorias: async function () {
    const categorias = await prisma.categorias.findMany()
    return categorias
  },

  getCategoriasById: async function (id: number) {
    const categoria = await prisma.categorias.findUnique({
      where: {
        id_categorias: id
      }
    })
    return categoria
  },

  createCategorias: async function (name: string) {
    const categoria = await prisma.categorias.create({
      data: {
        nome_categorias: name
      }
    })
    return categoria
  },

  deleteCategorias: async function (id: number) {
    const categoria = await prisma.categorias.delete({
      where: {
        id_categorias: id
      }
    })
    return categoria
  },

  updateCategorias: async function (name: string, id: number) {
    const categoria = await prisma.categorias.update({
      where: {
        id_categorias: id
      },
      data: {
        nome_categorias: name
      }
    })
    return categoria
  }
}