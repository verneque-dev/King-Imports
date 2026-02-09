import { prisma } from "@/prismaClient";

export const LoginRepository = {
  postLogin: async function (email: string, password: string) {
    const user = await prisma.users.findUnique({
      where: {
        email_user: email,
        senha_hash_user: password
      }
    })
    return user
  }
}