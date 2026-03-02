import { ProdutosRepository } from "./produtosRepository"
import { SchemaProdutos } from "./produtos.schema"
import { AppError } from "@/shared/errors/AppError"
import { CategoriasRepository } from "../categorias/categoriasRepository"
import { AvaliacoesRepository } from "./avaliacoes/avaliacoesRepository"
import { extraDataProdutos } from "@/utils/extraProdutosUtils"

export const ProdutosService = {
  getProdutos: async function (url: string, id?: string) {
    const { searchParams } = new URL(url)
    const search = searchParams.get("search")
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")
    const categoria = searchParams.get("categoria")

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
      const media = Number(resumo._avg.nota_avaliacao?.toFixed(1)) || 0
      const quantidade = resumo._count.nota_avaliacao

      return {
        ...produto,
        media,
        quantidade
      }
    }

    if (categoria) {
      const parsed = SchemaProdutos.categoriaNameSchema.safeParse({ categoria })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const categoriaData = await CategoriasRepository.getCategoriasByName(categoria)
      if (!categoriaData) {
        throw new AppError("Categoria não encontrada", 404)
      }

      if (search) {
        const parsedSearch = SchemaProdutos.getProdutoByNameSchema.safeParse({ search })
        if (!parsedSearch.success) {
          throw new AppError("Dados inválidos", 400)
        }
        if (page && limit) {
          const parsed = SchemaProdutos.PageSchema.safeParse({ page, limit })
          if (!parsed.success) {
            throw new AppError("Dados inválidos", 400)
          }
          const produtos = await ProdutosRepository.getProdutosByCategoria(categoriaData.id_categorias, parsed.data.page, parsed.data.limit, search)
          const listProdutos = await extraDataProdutos(produtos, parsed.data.limit, "categoria", categoriaData.id_categorias, search)
          return listProdutos
        }

        const produtos = await ProdutosRepository.getProdutosByCategoria(categoriaData.id_categorias, undefined, undefined, search)
        const listProdutos = await extraDataProdutos(produtos, undefined, "categoria", categoriaData.id_categorias, search)
        return listProdutos
      }

      if (page && limit) {
        const parsed = SchemaProdutos.PageSchema.safeParse({ page, limit })
        if (!parsed.success) {
          throw new AppError("Dados inválidos", 400)
        }
        const produtos = await ProdutosRepository.getProdutosByCategoria(categoriaData.id_categorias, parsed.data.page, parsed.data.limit)
        const listProdutos = await extraDataProdutos(produtos, parsed.data.limit, "categoria", categoriaData.id_categorias)
        return listProdutos
      }
      const produtos = await ProdutosRepository.getProdutosByCategoria(categoriaData.id_categorias)
      const listProdutos = await extraDataProdutos(produtos, undefined, "categoria")
      return listProdutos
    }

    if (search) {
      const parsedSearch = SchemaProdutos.getProdutoByNameSchema.safeParse({ search })
      if (!parsedSearch.success) {
        throw new AppError("Dados inválidos", 400)
      }
      if (page && limit) {
        const parsed = SchemaProdutos.PageSchema.safeParse({ page, limit })
        if (!parsed.success) {
          throw new AppError("Dados inválidos", 400)
        }
        const produtos = await ProdutosRepository.getProdutosByName(search, parsed.data.page, parsed.data.limit)
        const listProdutos = await extraDataProdutos(produtos, parsed.data.limit, "search", undefined, search)
        return listProdutos
      }
      const produtos = await ProdutosRepository.getProdutosByName(search)
      const listProdutos = await extraDataProdutos(produtos, undefined, "search", undefined, search)
      return listProdutos
    }

    if (page && limit) {
      const parsed = SchemaProdutos.PageSchema.safeParse({ page, limit })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produtos = await ProdutosRepository.getProdutos(parsed.data.page, parsed.data.limit)
      const listProdutos = await extraDataProdutos(produtos, parsed.data.limit)
      return listProdutos
    }

    const produtos = await ProdutosRepository.getProdutos()
    const listProdutos = await extraDataProdutos(produtos)
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