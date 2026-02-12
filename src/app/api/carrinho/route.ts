import { CarrinhoService } from "@/modules/carrinho/carrinhoService";
import { AppError } from "@/shared/errors/AppError";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const carrinhos = await CarrinhoService.getCarrinhos(req.url)
    return NextResponse.json(carrinhos, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const carrinho = await CarrinhoService.postCarrinho(body)
    const cookieStore = await cookies()
    cookieStore.set("token_carrinho", carrinho!.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })
    return NextResponse.json({ data: carrinho, message: "Carrinho criado e itens adicionados com sucesso" }, { status: 201 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const carrinhoItem = await CarrinhoService.deleteCarrinhoItem(body)
    return NextResponse.json({ data: carrinhoItem, message: "Item deletado com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    console.log(err)
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}