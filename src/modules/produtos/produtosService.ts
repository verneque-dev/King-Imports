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
      if (!produtos) {
        throw new AppError("Produto não encontrado", 404)
      }
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

    if (page && limit) {
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
    const produto = await ProdutosRepository.createProdutos(parsedBody.data)
    return produto
  },

  deleteProduto: async function (context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
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

  updateProduto: async function (req: NextRequest) {
    const body = await req.json()
    const parsedBody = SchemaProdutos.updateProdutoSchema.safeParse(body)
    if (!parsedBody.success) {
      throw new AppError("Dados inválidos", 400)
    }

    const verifyId = await ProdutosRepository.getProdutosById(parsedBody.data.produto_id)
    if (!verifyId) {
      throw new AppError("Produto não encontrado", 404)
    }

    const produto = await ProdutosRepository.updateProdutos(parsedBody.data)
    return produto
  },

  getImages: async function (context?: { params: Promise<{ id: string }> }) {
    if (context) {
      const { id } = await context.params
      const parsed = SchemaProdutos.getImageById.safeParse({ id })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const image = await ProdutosRepository.getImagesById(parsed.data.id)
      return image
    }
    const images = await ProdutosRepository.getImages()
    return images
  },

  uploadImage: async function (req: NextRequest) {
    const body = await req.json()
    const parsed = SchemaProdutos.uploadImages.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyId = await ProdutosRepository.getProdutosById(parsed.data.produto_id)
    if (!verifyId) {
       throw new AppError("Produto não encontrado", 404)
    }
    const image = await ProdutosRepository.uploadImage(parsed.data)
    return image
  },

  deleteImage: async function (context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    const parsed = SchemaProdutos.deleteImages.safeParse({ id })
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyId = await ProdutosRepository.getImagesById(parsed.data.id)
    if (!verifyId) {
      throw new AppError("Imagem não encontrada", 404)
    }
    const image = await ProdutosRepository.deleteImage(parsed.data.id)
    return image
  }
}