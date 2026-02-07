import { NextRequest, NextResponse } from "next/server";
import { CategoriasService } from "@/modules/categorias/categoriasService";
import { AppError } from "@/shared/errors/AppError";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const categoria = await CategoriasService.getCategorias(id)
    return NextResponse.json(categoria, { status: 200 })
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
    const { id } = await context.params
    const categoria = await CategoriasService.deleteCategorias(id)
    return NextResponse.json({ data: categoria, message: "Categoria deletada com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}