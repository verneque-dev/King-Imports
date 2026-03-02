import { ProdutosRepository } from "@/modules/produtos/produtosRepository"

interface Produtos {
  id_produtos: number
  nome_produtos: string
  desc_produtos: string | null
  preco_produtos: unknown | null
  id_categoria: number

  produtos_avaliacoes: {
    nota_avaliacao: number
    aprovado: boolean;
    id_produto: number;
    id_avaliacao: number;
    nome_user: string;
    comentario_avaliacao: string | null;
    created_at: Date;
  }[]

  produtos_images: {
    principal: boolean;
    id_produto: number;
    id_images: number;
    images_url: string;
  }[]
}

export async function extraDataProdutos(listProdutos: Produtos[], limit: number = 20, query?: string, categoriaId: number = 1, search: string = "") {
  const produtos = listProdutos.map((produto) => {
    const soma = produto.produtos_avaliacoes.reduce((acc, curr) => {
      return acc + curr.nota_avaliacao
    }, 0)
    const quantidade = produto.produtos_avaliacoes.length
    const media = soma ? soma / quantidade : 0

    return {
      ...produto,
      media: Number(media.toFixed(1)),
      quantidade: quantidade
    }
  }).sort((a, b) => b.media - a.media)

  let totalItens = await ProdutosRepository.totalProdutos()
  if (query === "categoria") {
    totalItens = await ProdutosRepository.totalProdutosCategoria(categoriaId, search)
  }
  else if (query === "search") {
    totalItens = await ProdutosRepository.totalProdutosSearch(search)
  }
  const pages = Math.ceil(totalItens / limit)

  return { data: produtos, totalItens, pages } 
}
