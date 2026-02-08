import { AppError } from "@/shared/errors/AppError"
import { SchemaAvaliacoes } from "./avaliacoes.schema"
import { AvaliacoesRepository } from "./avaliacoesRepository"
import { ProdutosRepository } from "../produtosRepository"


export const AvaliacoesService = {
  getAvaliacoes: async function (url:string, id?: string) {
    const { searchParams } = new URL(url)
    const aprovado = searchParams.get("aprovado")

    if (id) {
      const parsed = SchemaAvaliacoes.id.safeParse({ id })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const avaliacao = await AvaliacoesRepository.getAvaliacoesPorProduto(parsed.data.id)
      if (!avaliacao) {
        throw new AppError("Avaliacao não encontrada", 404)
      }
      return avaliacao
    }

    if (aprovado) {
      if (aprovado !== "true" && aprovado !== "false") {
        throw new AppError("Dados inválidos", 400)
      }
      const status = aprovado === "true" ? true : false

      const avaliacoes = await AvaliacoesRepository.getAvaliacoesByQuery(status)
      return avaliacoes
    }
    const avaliacoes = await AvaliacoesRepository.getAvaliacoes()
    return avaliacoes
  },

  createAvaliacao: async function (body: unknown) {
    const parsed = SchemaAvaliacoes.produtosAvaliacoes.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyIdProduto = await ProdutosRepository.getProdutosById(parsed.data.id_produto)
    if (!verifyIdProduto) {
      throw new AppError("Produto não encontrado", 404)
    }
    const avaliacao = await AvaliacoesRepository.createAvaliacao(parsed.data)
    return avaliacao
  },

  deleteAvaliacao: async function (id: string) {
    const parsed = SchemaAvaliacoes.id.safeParse({ id })
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyIdAvaliacao = await AvaliacoesRepository.getAvaliacoesById(parsed.data.id)
    if (!verifyIdAvaliacao) {
      throw new AppError("Avaliação não encontrada", 404)
    }
    const avaliacao = await AvaliacoesRepository.deleteAvaliacao(parsed.data.id)
    return avaliacao
  },

  statusAvaliacao: async function (body: unknown) {
    const parsed = SchemaAvaliacoes.setStatus.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyIdAvaliacao = await AvaliacoesRepository.getAvaliacoesById(parsed.data.id)
    if (!verifyIdAvaliacao) {
      throw new AppError("Avaliação não encontrada", 404)
    }
    const { id, aprovado } = parsed.data
    const avaliacao = await AvaliacoesRepository.setStatus(id, aprovado)
    return avaliacao
  } 
}