import { ProdutosRepository } from "./produtosRepository"
import { SchemaProdutos } from "./produtos.schema"
import { AppError } from "@/shared/errors/AppError"
import { CategoriasRepository } from "../categorias/categoriasRepository"
import { AvaliacoesRepository } from "./avaliacoes/avaliacoesRepository"
import { avaliacoesMediaProdutos } from "@/utils/mediaProdutosUtils"

export const ProdutosService = {
  getProdutos: async function (url: string, id?: string) {
    const { searchParams } = new URL(url)
    const search = searchParams.get("search")
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")

    if (id) {
      const parsedId = SchemaProdutos.getProdutoByIdSchema.safeParse({ id })
      if (!parsedId.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produto = await ProdutosRepository.getProdutosById(parsedId.data.id)
      if (!produto) {
        throw new AppError("Produto não encontrado", 404)
      }
      const resumo = await AvaliacoesRepository.getResumoPorProduto(parsedId.data.id)
      const media = resumo._avg.nota_avaliacao ?? 0
      const total = resumo._count.nota_avaliacao

      return {
        ...produto,
        media,
        total
      }
    }

    if (search) {
      const parsedSearch = SchemaProdutos.getProdutoByNameSchema.safeParse({ search })
      if (!parsedSearch.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produtos = await ProdutosRepository.getProdutosByName(search)
      const listProdutos = avaliacoesMediaProdutos(produtos)
      return listProdutos
    }

    if (page && limit) {
      const parsed = SchemaProdutos.getProdutoByPageSchema.safeParse({ page, limit })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produtos = await ProdutosRepository.getProdutosPages(parsed.data.page, parsed.data.limit)
      const listProdutos = avaliacoesMediaProdutos(produtos)
      return listProdutos
    }

    const produtos = await ProdutosRepository.getProdutos()
    const listProdutos = avaliacoesMediaProdutos(produtos)
    return listProdutos
  },

  createProduto: async function (body: unknown) {
    const parsedBody = SchemaProdutos.createProdutoSchema.safeParse(body)
    if (!parsedBody.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyId = await CategoriasRepository.getCategoriasById(parsedBody.data.categoria_id)
    if (!verifyId) {
      throw new AppError("Categoria não encontrada", 404)
    }
    const produto = await ProdutosRepository.createProdutos(parsedBody.data)
    return produto
  },

  deleteProduto: async function (id: string) {
    const parsedId = SchemaProdutos.deleteProdutoSchema.safeParse({ id })

    if (!parsedId.success) {
      throw new AppError("Dados inválidos", 400)
    }

    const verifyId = await ProdutosRepository.getProdutosById(parsedId.data.id)
    if (!verifyId) {
      throw new AppError("Produto não encontrado", 404)
    }
    const produto = await ProdutosRepository.deleteProdutos(parsedId.data.id)
    return produto
  },

  updateProduto: async function (body: unknown) {
    const parsedBody = SchemaProdutos.updateProdutoSchema.safeParse(body)
    if (!parsedBody.success) {
      throw new AppError("Dados inválidos", 400)
    }

    const verifyId = await ProdutosRepository.getProdutosById(parsedBody.data.produto_id)
    if (!verifyId) {
      throw new AppError("Produto não encontrado", 404)
    }

    const verifyIdCategoria = await CategoriasRepository.getCategoriasById(parsedBody.data.categoria_id)
    if (!verifyIdCategoria) {
      throw new AppError("Categoria não encontrada", 404)
    }

    const produto = await ProdutosRepository.updateProdutos(parsedBody.data)
    return produto
  }
}