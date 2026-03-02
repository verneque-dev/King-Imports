export interface Produto {
  data: {
    id_produtos: number
    nome_produtos: string
    desc_produtos: string | null
    preco_produtos: number | null
    id_categoria: number

    produtos_avaliacoes: {
      nota_avaliacao: number
      aprovado: boolean
      id_produto: number
      token: string
      id_avaliacao: number
      nome_user: string
      comentario_avaliacao: string | null
      created_at: Date
    }[]

    produtos_images: {
      principal: boolean
      id_produto: number
      id_images: number
      images_url: string
    }[]

    media: number
    quantidade: number
  }[]
  totalItens: number
  pages: number
}

export interface ProdutoUnico {
  id_produtos: number
  nome_produtos: string
  desc_produtos: string | null
  preco_produtos: number | null
  id_categoria: number

  produtos_images: {
    principal: boolean
    id_images: number
    images_url: string
    id_produto: number
  }[]

  media: number
  quantidade: number
}

export interface ProdutoAvaliacoes {
  id_avaliacao: number
  nome_user: string
  nota_avaliacao: number
  comentario_avaliacao: string | null;
  aprovado: boolean
  created_at: Date
  id_produto: number
  token: string
}
