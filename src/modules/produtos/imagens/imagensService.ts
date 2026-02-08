import { ProdutosRepository } from "../produtosRepository"
import { ImagensRepository } from "./imagensRepository"
import { SchemaImagens } from "./imagens.schema"
import { AppError } from "@/shared/errors/AppError"

export const ImagensService = {
  getImages: async function (id?: string) {
    if (id) {
      const parsed = SchemaImagens.getImageById.safeParse({ id })
      if (!parsed.success) {
        throw new AppError("Dados inválidos", 400)
      }
      const image = await ImagensRepository.getImagesById(parsed.data.id)
      if (!image) {
        throw new AppError("Imagem não encontrada", 404)
      }
      return image
    }
    const images = await ImagensRepository.getImages()
    return images
  },

  uploadImage: async function (body: unknown) {
    const parsed = SchemaImagens.uploadImages.safeParse(body)
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyId = await ProdutosRepository.getProdutosById(parsed.data.produto_id)
    if (!verifyId) {
       throw new AppError("Produto não encontrado", 404)
    }
    const image = await ImagensRepository.uploadImage(parsed.data)
    return image
  },

  deleteImage: async function (id: string) {
    const parsed = SchemaImagens.deleteImages.safeParse({ id })
    if (!parsed.success) {
      throw new AppError("Dados inválidos", 400)
    }
    const verifyId = await ImagensRepository.getImagesById(parsed.data.id)
    if (!verifyId) {
      throw new AppError("Imagem não encontrada", 404)
    }
    const image = await ImagensRepository.deleteImage(parsed.data.id)
    return image
  }
}