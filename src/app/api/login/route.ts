import { LoginService } from "@/modules/login/loginService";
import { AppError } from "@/shared/errors/AppError";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const user = await LoginService.login(body)
    return NextResponse.json(user, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}