import { NextRequest, NextResponse } from "next/server";
import { CategoriasService } from "@/modules/categorias/categoriasService";
import { AppError } from "@/shared/errors/AppError";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const categoria = await CategoriasService.getCategorias(context)
    return NextResponse.json(categoria, { status: 200 })
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
    await CategoriasService.deleteCategorias(context)
    return NextResponse.json({ message: "Categoria deletada com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ erro: err.message }, { status: err.status })
    }
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 })
  }
}