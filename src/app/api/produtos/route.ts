import { NextRequest, NextResponse } from "next/server";
import { ProdutosService } from "../../../modules/produtos/produtosService"
import { AppError } from "@/shared/errors/AppError";

export async function GET(req: NextRequest) {
  try {
    const data = await ProdutosService.getProdutos(req)
    return NextResponse.json(data, { status: 200 })
  }
  catch(err) {
    if (err instanceof AppError) {
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    return NextResponse.json({ erro: "Erro interno no servidor"}, { status: 500 })
  }
}