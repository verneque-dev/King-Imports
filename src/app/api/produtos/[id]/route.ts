import { NextResponse, NextRequest } from "next/server";
import { ProdutosService } from "@/modules/produtos/produtosService";
import { AppError } from "@/shared/errors/AppError";
import { authAdmin } from "@/middlewares/authAdminMiddleware";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const data = await ProdutosService.getProdutos(req.url, id)
    return NextResponse.json(data, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authAdmin()
    if (!auth) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 })
    }
    const { id } = await context.params
    const produto = await ProdutosService.deleteProduto(id)
    return NextResponse.json({ data: produto, message: "Produto deletado com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}