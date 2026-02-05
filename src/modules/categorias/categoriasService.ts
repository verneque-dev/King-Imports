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
      const categoria = CategoriasRepository.getCategoriasById(parse.data.id)
      if (!categoria) {
        throw new AppError("Categoria não encontrada", 404)
      }
      return categoria
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
    await CategoriasRepository.createCategorias(parse.data.nome_categoria)
  },

  deleteCategorias: async function (context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const parse = CategoriasSchema.deleteCategorias.safeParse({ id })
    if (!parse.success) {
      throw new AppError("Dados inválidos", 400)
    }

    const categoria = CategoriasRepository.getCategoriasById(parse.data.id)
    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404)
    }
    await CategoriasRepository.deleteCategorias(parse.data.id)
  },

  updateCategorias: async function (req: NextRequest) {
    const body = await req.json()
    const parse = CategoriasSchema.updateCategoria.safeParse(body)
    if (!parse.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const { nome_categoria, id } = parse.data
    const categoria = CategoriasRepository.getCategoriasById(id)
    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404)
    }
    await CategoriasRepository.updateCategorias(nome_categoria, id)
  }
}