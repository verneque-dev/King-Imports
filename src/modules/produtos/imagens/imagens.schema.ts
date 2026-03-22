import { z } from "zod"

export const SchemaImagens = {
  uploadImages: z.object({
    url_image: z.string(),
    public_id: z.string(),
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