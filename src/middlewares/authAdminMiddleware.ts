import { AppError } from "@/shared/errors/AppError";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function authAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token_admin")?.value
  if (!token) {
    throw new AppError("Não autorizado", 401)
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!)
    return decode
  }
  catch (err) {
    throw new AppError("Token inválido", 401)
  }
}