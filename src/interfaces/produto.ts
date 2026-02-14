export interface Produto {
  id_produtos: number
  nome_produtos: string
  desc_produtos: string | null
  preco_produtos: number | null
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

  media: number
  quantidade: number
}