import { z } from "zod"

export const GetProdutoByIdSchema = z.object({
  id: z.coerce.number().int().positive()
})

export const GetProdutoByNameSchema = z.object({
  search: z.string()
})