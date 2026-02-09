import { z } from "zod"

export const SchemaLogin = {
  login: z.object({
    email: z.email(),
    password: z.string()
  })
}