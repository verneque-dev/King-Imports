import { AppError } from "@/shared/errors/AppError"
import { SchemaLogin } from "./login.schema"
import { LoginRepository } from "./loginRepository"
import bcrypt from "bcrypt"


export const LoginService = {
  login: async function (body: unknown) {
    const parsed = SchemaLogin.login.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const { email, password } = parsed.data
    const hash = await LoginRepository.getHash(email)
    if (!hash) {
      throw new AppError("Email ou senha inválidos", 404)
    }
    const verify = await bcrypt.compare(password, hash.senha_hash_user)
    if (!verify) {
      throw new AppError("Email ou senha inválidos", 404)
    }
    const user = await LoginRepository.postLogin(email, hash.senha_hash_user)
    if (!user) {
      throw new AppError("Email ou senha inválidos", 404)
    }
    return user
  }
}