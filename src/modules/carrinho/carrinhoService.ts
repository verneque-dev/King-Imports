import { AppError } from "@/shared/errors/AppError"
import { SchemaCarrinho } from "./carrinho.schema"
import { CarrinhoRepository } from "./carrinhoRepository"
import { randomUUID } from "crypto"


export const CarrinhoService = {
  getCarrinhos: async function (url: string) {
    const { searchParams } = new URL(url)
    const token = searchParams.get("token")
    if (token) {
      const carrinho = await CarrinhoRepository.getCarrinhoByToken(token)
      if (!carrinho) {
        throw new AppError("carrinho não encontrado", 404)
      }
      return carrinho
    }
    const carrinhos = await CarrinhoRepository.getCarrinho()
    return carrinhos
  },

  postCarrinho: async function (body: { quantidade_itens: number, id_produto: number, token?: string }) {
    const parsed = SchemaCarrinho.postCarrinho.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 404)
    }
    if (!parsed.data.token) {
      const token = randomUUID()
      await CarrinhoRepository.createCarrinho(token)
      parsed.data.token = token
    }
    const carrinhoId = await CarrinhoRepository.getCarrinhoByToken(parsed.data.token)
    if (!carrinhoId) {
      throw new AppError("Carrinho não encontrado", 404)
    }

    const data = {
      id_produto: parsed.data.id_produto,
      quantidade_itens: parsed.data.quantidade_itens,
      id_carrinho: carrinhoId.id_carrinho
    }
    
    await CarrinhoRepository.createCarrinhoItem(data)
    const carrinho = await CarrinhoRepository.getCarrinhoByToken(parsed.data.token)
    return carrinho
  },

  deleteCarrinhoItem: async function (body: { token: string, id_item: string }) {
    const parsed = SchemaCarrinho.deleteCarrinho.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 404)
    }
    const carrinho = await CarrinhoRepository.getCarrinhoByToken(parsed.data.token)
    if (!carrinho) {
      throw new AppError("carrinho não encontrado", 404)
    }
    const item = await CarrinhoRepository.deleteCarrinhoItem(carrinho.id_carrinho, parsed.data.id_item)
    return item
  }
}