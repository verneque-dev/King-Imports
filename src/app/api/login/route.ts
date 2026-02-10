import { LoginService } from "@/modules/login/loginService";
import { AppError } from "@/shared/errors/AppError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const user = await LoginService.login(body)
    const payload = {
      userId: user.id_user,
      tipo: user.tipo_users
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "10d" })
    return NextResponse.json({ token: token }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}