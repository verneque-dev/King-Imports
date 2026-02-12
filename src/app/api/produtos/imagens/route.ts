import { NextRequest, NextResponse } from "next/server";
import { AppError } from "@/shared/errors/AppError";
import { ImagensService } from "@/modules/produtos/imagens/imagensService";
import { authAdmin } from "@/middlewares/authAdminMiddleware";

export async function GET() {
  try {
    const images = await ImagensService.getImages()
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
    const auth = await authAdmin()
    if (!auth) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 })
    }
    const body = await req.json()
    const image = await ImagensService.uploadImage(body)
    return NextResponse.json({ data: image, message: "Upload da imagem feito com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}