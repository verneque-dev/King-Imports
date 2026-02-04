import { CategoriasRepository } from "./categoriasRepository";
import { CategoriasSchema } from "./categorias.schema";
import { AppError } from "@/shared/errors/AppError";
import { NextRequest } from "next/server";

export const CategoriasService = {
  getCategorias: async function (context?: { params: Promise<{ id: string }> }) {
    if (context) {
      const { id } = await context.params
      const parse = CategoriasSchema.getCategoriasById.safeParse({ id })
      if (!parse.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const categorias = await CategoriasRepository.getCategoriasById(parse.data.id)
      return categorias
    }
    const categorias = await CategoriasRepository.getCategorias()
    return categorias
  },

  createCategorias: async function (req: NextRequest) {
    const body = await req.json()
    const parse = CategoriasSchema.createCategorias.safeParse(body)
    if (!parse.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const categoria = await CategoriasRepository.createCategorias(parse.data.nome_categoria)
    return categoria
  },

  deleteCategorias: async function (context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const parse = CategoriasSchema.deleteCategorias.safeParse({ id })
    if (!parse.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const categoria = await CategoriasRepository.deleteCategorias(parse.data.id)
    return categoria
  },

  updateCategorias: async function (req: NextRequest) {
    const body = await req.json()
    const parse = CategoriasSchema.updateCategoria.safeParse(body)
    if (!parse.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const { nome_categoria, id } = parse.data
    const categoria = await CategoriasRepository.updateCategorias(nome_categoria, id)
    return categoria
  }
}