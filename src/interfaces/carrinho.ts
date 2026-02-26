export interface Carrinho {
  carrinho_itens: {
    id_carrinho: number
    id_itens: number
    quantidade_itens: number
    id_produto: number

    produtos: {
      id_produtos: number
      nome_produtos: string
      desc_produtos: string | null
      preco_produtos: number
      id_categoria: number

      produtos_images: {
        images_url: string
        principal: boolean
        id_produto: number
        id_images: number
      }[]
    }
  }[]
  id_carrinho: number
  token: string
  created_at: Date
}