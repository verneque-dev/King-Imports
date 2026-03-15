import { DashBoardService } from "@/modules/dashboard/dashBoardService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await DashBoardService.data()
    return NextResponse.json(data, { status: 200 })
  }
  catch {
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}