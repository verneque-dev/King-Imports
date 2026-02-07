import { AvaliacoesService } from "@/modules/produtos/avaliacoes/avaliacoesService";
import { AppError } from "@/shared/errors/AppError";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params 
    const avaliacoes = await AvaliacoesService.getAvaliacoes(req.url, id)
    return NextResponse.json(avaliacoes, { status: 200 })
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
    const avaliacao = await AvaliacoesService.deleteAvaliacao(id)
    return NextResponse.json({ data: avaliacao, message: "Avaliacao deletada com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}