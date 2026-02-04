import { coerce, string, z } from "zod"

export const CategoriasSchema = {
  getCategoriasById: z.object({
    id: coerce.number().int().positive()
  }),

  createCategorias: z.object({
    nome_categoria: string().max(50)
  }),

  deleteCategorias: z.object({
    id: coerce.number().int().positive()
  }),
  
  updateCategoria: z.object({
    nome_categoria: string().max(50),
    id: coerce.number().int().positive()
  })
}