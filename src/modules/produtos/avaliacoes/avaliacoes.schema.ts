import { boolean, z } from "zod";

export const SchemaAvaliacoes = {
  produtos_avaliacoes: z.object({
    nome_user: z.string().min(1).max(50),
    nota_avaliacao: z.coerce.number().min(1).max(5),
    comentario_avaliacao: z.string().max(100),
    id_produto: z.coerce.number().positive()
  }),

  id: z.object({
    id: z.coerce.number().positive()
  })
}