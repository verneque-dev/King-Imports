import { AppError } from "@/shared/errors/AppError";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function authAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader) {
    throw new AppError("token não fornecido", 401)
  }
  const [type, token] = authHeader.trim().split(" ")
  if (type !== "Bearer") {
    throw new AppError("Token inválido", 401)
  }
  if (!token) {
    throw new AppError("Token não fornecido", 401)
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!)
    return decode
  }
  catch (err) {
    throw new AppError("Token inválido", 401)
  }
}