import { prisma } from "@/prismaClient";

interface Avaliacao {
  nome_user: string
  nota_avaliacao: number
  comentario_avaliacao: string
  id_produto: number
}

export const AvaliacoesRepository = {
  getAvaliacoes: async function () {
    const avaliacoes = await prisma.produtos_avaliacoes.findMany({
      include: {
        produtos: {
          select: {
            nome_produtos: true
          }
        }
      },
      omit: {
        token: true
      },
      orderBy: {
        created_at: "desc"
      },
    })
    return avaliacoes
  },

  getAvaliacoesPorProduto: async function (id_produto: number) {
    const avaliacoes = await prisma.produtos_avaliacoes.findMany({
      omit: {
        token: true
      },
      where: {
        id_produto: id_produto,
        aprovado: true
      },
      orderBy: {
        created_at: "desc"
      }
    })
    return avaliacoes
  },

  getAvaliacoesById: async function (id_avaliacao: number) {
    const avaliacao = await prisma.produtos_avaliacoes.findUnique({
      omit: {
        token: true
      },
      where: {
        id_avaliacao: id_avaliacao,
      }
    })
    return avaliacao
  },

  getAvaliacoesByTokenId: async function (id: number, token: string) {
    const avaliacoes = await prisma.produtos_avaliacoes.findMany({
      omit: {
        token: true
      },
      where: {
        token: token,
        id_produto: id
      },
      orderBy: {
        created_at: "desc"
      }
    })
    return avaliacoes
  },

  getAvaliacoesByAprovado: async function (aprovado: boolean) {
    const avaliacoes = await prisma.produtos_avaliacoes.findMany({
      include: {
        produtos: {
          select: {
            nome_produtos: true
          }
        }
      },
      omit: {
        token: true
      },
      where: {
        aprovado: aprovado
      },
      orderBy: {
        created_at: "desc"
      }
    })
    return avaliacoes
  },

  getResumoPorProduto: async function (id: number) {
    const resumo = await prisma.produtos_avaliacoes.aggregate({
      where: {
        id_produto: id,
        aprovado: true
      },
      _avg: { nota_avaliacao: true },
      _count: { nota_avaliacao: true }
    })
    return resumo
  },

  createAvaliacao: async function (body: Avaliacao, token: string) {
    const avaliacao = await prisma.produtos_avaliacoes.create({
      data: {
        nome_user: body.nome_user,
        nota_avaliacao: body.nota_avaliacao,
        comentario_avaliacao: body.comentario_avaliacao,
        id_produto: body.id_produto,
        token: token
      }
    })
    return avaliacao
  },

  deleteAvaliacao: async function (id: number, token: string) {
    const avaliacao = await prisma.produtos_avaliacoes.deleteMany({
      where: {
        id_avaliacao: id,
        token: token
      }
    })
    return avaliacao
  },

  deleteAvaliacaoAdm: async function (id: number) {
    const avaliacao = await prisma.produtos_avaliacoes.deleteMany({
      where: {
        id_avaliacao: id,
      }
    })
    return avaliacao
  },

  setStatus: async function (id: number, aprovado: boolean) {
    const avaliacao = await prisma.produtos_avaliacoes.update({
      where: {
        id_avaliacao: id
      },
      data: {
        aprovado: aprovado
      }
    })
    return avaliacao
  }
}