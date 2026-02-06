import { z } from "zod"

export const SchemaProdutos = {
  getProdutoByNameSchema: z.object({
    search: z.string()
  }),

  getProdutoByIdSchema: z.object({
    id: z.coerce.number().int().positive()
  }),

  getProdutoByPageSchema: z.object({
    page: z.coerce.number().int().positive(),
    limit: z.coerce.number().int().positive()
  }),

  createProdutoSchema: z.object({
    nome_produto: z.string().max(100),
    desc_produto: z.string(),
    preco_produto: z.coerce.number().positive(),
    categoria_id: z.coerce.number().positive()
  }),

  deleteProdutoSchema: z.object({
    id: z.coerce.number().int().positive()
  }),

  updateProdutoSchema: z.object({
    nome_produto: z.string().max(100),
    desc_produto: z.string(),
    preco_produto: z.coerce.number().positive(),
    categoria_id: z.coerce.number().positive(),
    produto_id: z.coerce.number().positive()
  }),

  uploadImages: z.object({
    url_image: z.string(),
    produto_id: z.coerce.number().positive(),
    principal: z.boolean()
  }),

  deleteImages: z.object({
    id: z.coerce.number().positive()
  }),

  getImageById: z.object({
    id: z.coerce.number().positive()
  })
}