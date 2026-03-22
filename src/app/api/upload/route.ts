import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "Arquivo não enviado" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const upload = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error || !result) reject(error)
          else resolve(result)
        }
      )
        .end(buffer)
    })
    return NextResponse.json({
      url: upload.secure_url,
      public_id: upload.public_id
    }, { status: 200 })
  }
  catch {
    return NextResponse.json({ message: "Falha no upload" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { public_id } = await req.json()
    const result = await cloudinary.uploader.destroy(public_id)
    if (result.result !== "ok") {
      return NextResponse.json({ message: "Imagem não encontrada no Cloudinary" }, { status: 404 });
    }
    return NextResponse.json({ message: "Imagem deletada com sucesso" }, { status: 200 })
  }
  catch {
    return NextResponse.json({ message: "Falha ao deletar imagem" }, { status: 500 })
  }
}