import { AvaliacoesService } from "@/modules/produtos/avaliacoes/avaliacoesService"
import { AppError } from "@/shared/errors/AppError"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
  try {
    const avaliacoes = await AvaliacoesService.getAvaliacoes(req.url)
    return NextResponse.json(avaliacoes, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const avaliacao = await AvaliacoesService.createAvaliacao(body)
    return NextResponse.json({ data: avaliacao, message: "Avaliação criada com sucesso" }, { status: 201 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  try {
    const avaliacao = await AvaliacoesService.statusAvaliacao(body)
    return NextResponse.json({ data: avaliacao, message: "Avaliação atualizada com sucesso" }, { status: 200 })
  }
  catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.status })
    }
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 })
  }
}