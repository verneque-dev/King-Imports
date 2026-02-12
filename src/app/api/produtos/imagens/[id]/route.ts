import { NextRequest, NextResponse } from "next/server";
import { AppError } from "@/shared/errors/AppError";
import { ImagensService } from "@/modules/produtos/imagens/imagensService";
import { authAdmin } from "@/middlewares/authAdminMiddleware";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const images = await ImagensService.getImages(id)
    return NextResponse.json(images, { status: 200 })
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
    const image = await ImagensService.deleteImage(id)
    return NextResponse.json({ data: image, message: "Imagem deletada com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}