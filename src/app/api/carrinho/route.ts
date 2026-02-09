import { CarrinhoService } from "@/modules/carrinho/carrinhoService";
import { AppError } from "@/shared/errors/AppError";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const carrinhos = await CarrinhoService.getCarrinhos(req.url)
    return NextResponse.json(carrinhos, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const carrinho = await CarrinhoService.postCarrinho(body)
    return NextResponse.json({ data: carrinho, message: "Carrinho criado e itens adicionados com sucesso" }, { status: 201 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 })
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
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    console.log(err)
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 })
  }
}