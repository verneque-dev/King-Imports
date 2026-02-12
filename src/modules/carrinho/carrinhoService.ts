import { AppError } from "@/shared/errors/AppError"
import { SchemaCarrinho } from "./carrinho.schema"
import { CarrinhoRepository } from "./carrinhoRepository"
import { randomUUID } from "crypto"
import { ProdutosRepository } from "../produtos/produtosRepository"
import { cookies } from "next/headers"
import { authAdmin } from "@/middlewares/authAdminMiddleware"


export const CarrinhoService = {
  getCarrinhos: async function (url: string) {
    const { searchParams } = new URL(url)
    const getByToken = searchParams.get("token")
    if (getByToken === "true") {
      const cookieStore = await cookies()
      const token = cookieStore.get("token_carrinho")?.value
      if (!token) {
        throw new AppError("Carrinho não encontrado", 404)
      }
      const carrinho = await CarrinhoRepository.getCarrinhoByToken(token)
      if (!carrinho) {
        throw new AppError("Carrinho não encontrado", 404)
      }
      return carrinho
    }
    const auth = await authAdmin()
    if (!auth) {
      throw new AppError("Pá... acesso negado", 401)
    }
    const carrinhos = await CarrinhoRepository.getCarrinho()
    return carrinhos
  },

  postCarrinho: async function (body: { quantidade_itens: number, id_produto: number }) {
    const cookieStore = await cookies()
    let token = cookieStore.get("token_carrinho")?.value
    if (!token) {
      token = randomUUID()
      await CarrinhoRepository.createCarrinho(token)
    }
    const parsed = SchemaCarrinho.postCarrinho.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 404)
    }
    const carrinhoId = await CarrinhoRepository.getCarrinhoByToken(token)
    if (!carrinhoId) {
      throw new AppError("Carrinho não encontrado", 404)
    }

    const data = {
      id_produto: parsed.data.id_produto,
      quantidade_itens: parsed.data.quantidade_itens,
      id_carrinho: carrinhoId.id_carrinho
    }

    await CarrinhoRepository.createCarrinhoItem(data)
    const carrinho = await CarrinhoRepository.getCarrinhoByToken(token)
    return carrinho
  },

  deleteCarrinhoItem: async function (body: { id_item: string }) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_carrinho")?.value
    if (!token) {
      throw new AppError("Carrinho não encontrado", 404)
    }
    const parsed = SchemaCarrinho.deleteCarrinho.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 404)
    }
    const carrinho = await CarrinhoRepository.getCarrinhoByToken(token)
    if (!carrinho) {
      throw new AppError("Carrinho não encontrado", 404)
    }
    const item = await CarrinhoRepository.deleteCarrinhoItem(carrinho.id_carrinho, parsed.data.id_item)
    return item
  },

  finalizarPedido: async function (token: string) {
    if (!token) {
      throw new AppError("Carrinho não encontrado", 401)
    }
    const carrinho = await CarrinhoRepository.getCarrinhoByToken(token)
    if (!carrinho) {
      throw new AppError("Carrinho não encontrado", 404)
    }
    const numero = "5511998406942"
    let mensagem = `Pedido:`
    let total = 0

    for (const item of carrinho.carrinho_itens) {
      const produto = await ProdutosRepository.getProdutosById(item.id_produto)
      if (!produto) {
        continue
      }
      const price = Number(produto.preco_produtos)
      mensagem += `
${produto.nome_produtos} - ${price} R$`
      total += price
    }
    mensagem += `

Valor total: ${total} R$`
    const url = encodeURIComponent(mensagem)
    const whatsappUrl = `https://wa.me/${numero}?text=${url}`
    return whatsappUrl
  }
}