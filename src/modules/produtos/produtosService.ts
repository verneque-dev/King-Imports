import { ProdutosRepository } from "./produtosRepository"
import { SchemaProdutos } from "./produtos.schema"
import { NextRequest } from "next/server"
import { AppError } from "@/shared/errors/AppError"

export const ProdutosService = {
  getProdutos: async function (req: NextRequest, context?: { params: Promise<{ id: string }> }) {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")

    if (context) {
      const { id } = await context.params
      const parsedId = SchemaProdutos.getProdutoByIdSchema.safeParse({ id })
      if (!parsedId.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produtos = ProdutosRepository.getProdutosById(parsedId.data.id)
      return produtos
    }

    if (search) {
      const parsedSearch = SchemaProdutos.getProdutoByNameSchema.safeParse({ search })
      if (!parsedSearch.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produtos = ProdutosRepository.getProdutosByName(search)
      return produtos
    }

    else if (page && limit) {
      const parsed = SchemaProdutos.getProdutoByPageSchema.safeParse({ page, limit })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produtos = ProdutosRepository.getProdutosPages(parsed.data.page, parsed.data.limit)
      return produtos
    }

    const produtos = await ProdutosRepository.getProdutos()
    return produtos
  },

  createProduto: async function (req: NextRequest) {
    const body = await req.json()
    const parsedBody = SchemaProdutos.createProdutoSchema.safeParse(body)
    if (!parsedBody.success) {
      throw new AppError("Dados inválidos", 400)
    }
    await ProdutosRepository.createProdutos(parsedBody.data)
  },

  deleteProduto: async function (context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const parsedId = SchemaProdutos.deleteProdutoSchema.safeParse({ id })

    if (!parsedId.success) {
      throw new AppError("Dados inválidos", 400)
    }
    await ProdutosRepository.deleteProdutos(parsedId.data.id)
  },

  updateProduto: async function (req: NextRequest) {
    const body = await req.json()
    const parsedBody = SchemaProdutos.updateProdutoSchema.safeParse(body)

    if (!parsedBody.success) {
      throw new AppError("Dados inválidos", 400)
    }
    await ProdutosRepository.updateProdutos(parsedBody.data)
  }
}