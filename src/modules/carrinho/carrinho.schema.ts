import { z } from "zod"

export const SchemaCarrinho = {
  deleteCarrinho: z.object({
    token: z.string(),
    id_item: z.coerce.number()
  }),

  id: z.object({
    id: z.coerce.number().positive()
  }),

  postCarrinho: z.object({
    quantidade_itens: z.number().positive(),
    id_produto: z.number().positive(),
    token: z.string().optional()
  })
}