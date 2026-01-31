import { ProdutosRepository } from "./produtosRepository"
import { GetProdutoByIdSchema, GetProdutoByNameSchema } from "./produtos.schema"
import { NextRequest } from "next/server"
import { AppError } from "@/shared/errors/AppError"

export const ProdutosService = {
  getProdutos: async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const search = searchParams.get("search")

    if (id) {
      const parsedId = GetProdutoByIdSchema.safeParse({ id })
      if (!parsedId.success) {
        throw new AppError("Dados inválidos", 400)
      }

      const produtos = await ProdutosRepository.getProdutosById(parsedId.data.id)
      return produtos
    }

    else if (search) {
      const parsedSearch = GetProdutoByNameSchema.safeParse({ search })
      if (!parsedSearch.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const produtos = ProdutosRepository.getProdutosByName(parsedSearch.data.search)
      return produtos
    }

    const produtos = await ProdutosRepository.getProdutos()
    return produtos
  }
}
