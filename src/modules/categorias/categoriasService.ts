import { CategoriasRepository } from "./categoriasRepository";
import { CategoriasSchema } from "./categorias.schema";
import { AppError } from "@/shared/errors/AppError";
import { NextRequest } from "next/server";

export const CategoriasService = {
  getCategorias: async function (context?: { params: Promise<{ id: string }> }) {
    if (context) {
      const { id } = await context.params
      const parsed = CategoriasSchema.getCategoriasById.safeParse({ id })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const categoria = CategoriasRepository.getCategoriasById(parsed.data.id)
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
    const parsed = CategoriasSchema.createCategorias.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const categoria = await CategoriasRepository.createCategorias(parsed.data.nome_categoria)
    return categoria
  },

  deleteCategorias: async function (context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const parsed = CategoriasSchema.deleteCategorias.safeParse({ id })
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }

    const verifyId = await CategoriasRepository.getCategoriasById(parsed.data.id)
    if (!verifyId) {
      throw new AppError("Categoria não encontrada", 404)
    }
    const categoria = await CategoriasRepository.deleteCategorias(parsed.data.id)
    return categoria
  },

  updateCategorias: async function (req: NextRequest) {
    const body = await req.json()
    const parsed = CategoriasSchema.updateCategoria.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const { nome_categoria, id } = parsed.data
    const verifyId = await CategoriasRepository.getCategoriasById(id)
    if (!verifyId) {
      throw new AppError("Categoria não encontrada", 404)
    }
    const categoria = await CategoriasRepository.updateCategorias(nome_categoria, id)
    return categoria
  }
}