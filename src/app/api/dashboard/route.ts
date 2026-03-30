import { authAdmin } from "@/middlewares/authAdminMiddleware";
import { DashBoardService } from "@/modules/dashboard/dashBoardService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = await authAdmin()
    if (!auth) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 })
    }
    if (typeof auth !== "string" && auth.tipo !== "admin") {
      return NextResponse.json({ message: "Você não tem permissão para acessar essa rota" })
    }

    const data = await DashBoardService.data()
    return NextResponse.json(data, { status: 200 })
  }
  catch {
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}