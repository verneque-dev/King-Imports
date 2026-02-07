import { prisma } from "@/prismaClient";

interface Images {
  url_image: string
  produto_id: number
  principal: boolean
}

export const ImagensRepository = {
  getImages: async function () {
    const images = await prisma.produtos_images.findMany()
    return images
  },

  getImagesById: async function (id: number) {
    const images = await prisma.produtos_images.findUnique({
      where: {
        id_images: id
      }
    })
    return images
  },

  uploadImage: async function (body: Images) {
    const image = await prisma.produtos_images.create({
      data: {
        images_url: body.url_image,
        id_produto: body.produto_id,
        principal: body.principal
      }
    })
    return image
  },

  deleteImage: async function (id: number) {
    const image = await prisma.produtos_images.delete({
      where: {
        id_images: id
      }
    })
    return image
  }
}