import { NextRequest, NextResponse } from "next/server";
import { CategoriasService } from "@/modules/categorias/categoriasService";
import { AppError } from "@/shared/errors/AppError";

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
    await CategoriasService.createCategorias(req)
    return NextResponse.json({ message: "Categoria criada com sucesso" }, { status: 201 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 })
  }
}