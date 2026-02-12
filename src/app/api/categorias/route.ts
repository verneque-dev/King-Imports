import { NextRequest, NextResponse } from "next/server";
import { CategoriasService } from "@/modules/categorias/categoriasService";
import { AppError } from "@/shared/errors/AppError";
import { authAdmin } from "@/middlewares/authAdminMiddleware";

export async function GET() {
  try {
    const categorias = await CategoriasService.getCategorias()
    return NextResponse.json(categorias, { status: 200 })
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
    const auth = await authAdmin()
    if (!auth) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 })
    }
    const body = await req.json()
    const categoria = await CategoriasService.createCategorias(body)
    return NextResponse.json({ data: categoria, message: "Categoria criada com sucesso" }, { status: 201 })
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
    const auth = await authAdmin()
    if (!auth) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 })
    }
    const body = await req.json()
    const categoria = await CategoriasService.updateCategorias(body)
    return NextResponse.json({ data: categoria, message: "Categoria atualizada com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}