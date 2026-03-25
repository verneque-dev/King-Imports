import { AppError } from "@/shared/errors/AppError"
import { SchemaAvaliacoes } from "./avaliacoes.schema"
import { AvaliacoesRepository } from "./avaliacoesRepository"
import { ProdutosRepository } from "../produtosRepository"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"
import { authAdmin } from "@/middlewares/authAdminMiddleware"


export const AvaliacoesService = {
  getAvaliacoes: async function (url: string, id?: string) {
    const { searchParams } = new URL(url)
    const aprovado = searchParams.get("aprovado")
    const getByToken = searchParams.get("token")

    if (id) {
      const parsed = SchemaAvaliacoes.id.safeParse({ id })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      if (getByToken === "true") {
        const cookieStore = await cookies()
        const token = cookieStore.get("token_session")?.value
        if (!token) {
          return []
        }
        const avaliacoes = await AvaliacoesRepository.getAvaliacoesByTokenId(parsed.data.id, token)
        return avaliacoes
      }
      const avaliacao = await AvaliacoesRepository.getAvaliacoesPorProduto(parsed.data.id)
      if (!avaliacao) {
        throw new AppError("Avaliacao não encontrada", 404)
      }

      return avaliacao
    }

    const auth = await authAdmin()
    if (!auth) {
      throw new AppError("Token inválido", 401)
    }
    if (typeof auth !== "string" && auth.tipo !== "admin") {
      throw new AppError("Você não tem permissão para acessar essa rota", 401)
    }

    if (aprovado) {
      if (aprovado !== "false" && aprovado !== "true") {
        throw new AppError("Dados inválidos", 400)
      }
      const status = aprovado === "true" ? true : false

      const avaliacoes = await AvaliacoesRepository.getAvaliacoesByAprovado(status)
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
    const cookieStore = await cookies()
    let token = cookieStore.get("token_session")?.value
    if (!token) {
      token = randomUUID()
    }
    const avaliacao = await AvaliacoesRepository.createAvaliacao(parsed.data, token)
    return avaliacao
  },

  deleteAvaliacao: async function (id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_session")?.value
    const tokenAdm = cookieStore.get("token_admin")?.value

    const parsed = SchemaAvaliacoes.id.safeParse({ id })
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyIdAvaliacao = await AvaliacoesRepository.getAvaliacoesById(parsed.data.id)
    if (!verifyIdAvaliacao) {
      throw new AppError("Avaliação não encontrada", 404)
    }

    if (tokenAdm) {
      const auth = await authAdmin()
      if (!auth) {
        throw new AppError("Token inválido", 401)
      }
      if (typeof auth !== "string" && auth.tipo !== "admin") {
        throw new AppError("Você não tem permissão para acessar essa rota", 401)
      }
      
      const avaliacao = await AvaliacoesRepository.deleteAvaliacaoAdm(parsed.data.id)
      return avaliacao
    }

    if (!token) {
      throw new AppError("Token não fornecido", 401)
    }

    const avaliacao = await AvaliacoesRepository.deleteAvaliacao(parsed.data.id, token)
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