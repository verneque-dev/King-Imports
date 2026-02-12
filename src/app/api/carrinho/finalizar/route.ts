import { CarrinhoService } from "@/modules/carrinho/carrinhoService";
import { AppError } from "@/shared/errors/AppError";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_carrinho")?.value
    if (!token) {
      return NextResponse.json({ message: "Carrinhonão encontrado" }, { status: 404 })
    }
    const whatsappUrl = await CarrinhoService.finalizarPedido(token)
    return NextResponse.json({ url: whatsappUrl }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}