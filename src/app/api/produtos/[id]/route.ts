import { NextResponse, NextRequest } from "next/server";
import { ProdutosService } from "@/modules/produtos/produtosService";
import { AppError } from "@/shared/errors/AppError";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
   try {
    const data = await ProdutosService.getProdutos(req, context)
    return NextResponse.json(data, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await ProdutosService.deleteProduto(context)
    return NextResponse.json({ message: "Produto deletado com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500})
  }
}