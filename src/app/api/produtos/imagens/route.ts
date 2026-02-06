import { NextRequest, NextResponse } from "next/server";
import { ProdutosService } from "../../../../modules/produtos/produtosService"
import { AppError } from "@/shared/errors/AppError";

export async function GET() {
  try {
    const images = await ProdutosService.getImages()
    return NextResponse.json(images, { status: 200 })
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
    const image = await ProdutosService.uploadImage(req)
    return NextResponse.json({ data: image, message: "Upload da imagem feito com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}