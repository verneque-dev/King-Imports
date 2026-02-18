"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import Image from "next/image"
import { ProdutoUnico } from "@/interfaces/produto"

export function CarroselProdutos(props: { produto: ProdutoUnico }) {
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}

        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="rounded-lg overflow-hidden shadow-md h-full
                 [--swiper-pagination-color:#FFFFFF] 
                 [--swiper-pagination-bullet-inactive-color:#94a3b8]
                  [--swiper-pagination-bullet-inactive-opacity:0.5"
      >
        {props.produto.produtos_images.map((image) => {
          return (
            <SwiperSlide className="bg-slate-800 flex items-center justify-center text-white" key={image.id_images}>
              <div className="text-center">
                <Image
                  src={image.images_url}
                  alt={`Imagem do produto ${props.produto.nome_produtos}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}