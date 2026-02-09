import { AppError } from "@/shared/errors/AppError"
import { SchemaLogin } from "./login.schema"
import { LoginRepository } from "./loginRepository"


export const LoginService = {
  login: async function (body: unknown) {
    const parsed = SchemaLogin.login.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const { email, password } = parsed.data
    const user = await LoginRepository.postLogin(email, password)
    if (!user) {
      throw new AppError("Email ou senha inválidos", 404)
    }
    return user
  }
}