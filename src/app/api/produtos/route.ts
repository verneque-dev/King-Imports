import { NextRequest, NextResponse } from "next/server";
import { ProdutosService } from "../../../modules/produtos/produtosService"
import { AppError } from "@/shared/errors/AppError";

export async function GET(req: NextRequest) {
  try {
    const data = await ProdutosService.getProdutos(req.url)
    return NextResponse.json(data, { status: 200 })
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
    const produto = await ProdutosService.createProduto(body)
    return NextResponse.json({data: produto, message: "Produto criado" }, { status: 201 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const produto = await ProdutosService.updateProduto(body)
    return NextResponse.json({ data: produto, message: "Produto atualizado com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500})
  }
}