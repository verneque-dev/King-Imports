import { CarrinhoService } from "@/modules/carrinho/carrinhoService";
import { AppError } from "@/shared/errors/AppError";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const whatsappUrl = await CarrinhoService.finalizarPedido(body.token)
    return NextResponse.json({ url: whatsappUrl }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}