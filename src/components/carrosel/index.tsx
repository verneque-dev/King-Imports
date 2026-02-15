"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import Image from "next/image"

export function Carrosel() {
  return (
    <div className="w-full mb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop={true}
        className="rounded-lg overflow-hidden shadow-md h-[50vw] sm:h-[35vw]
                 [--swiper-pagination-color:#FFFFFF] 
                 [--swiper-pagination-bullet-inactive-color:#94a3b8]
                  [--swiper-pagination-bullet-inactive-opacity:0.5"
      >
        <SwiperSlide className="bg-slate-800 flex items-center justify-center text-white">
          <div className="text-center">
            <Image
              src="/banner-compra.png"
              alt="slide"
              fill
              className="object-cover"
            />
            <div className="absolute flex flex-col justify-center h-full w-full">
             
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="bg-indigo-600 flex items-center justify-center text-white relative">
          <div className="text-center">
            <Image
              src="/banner-frete.png"
              alt="slide"
              fill
              className="object-cover"
            />
            <div className="absolute flex flex-col justify-center h-full w-full">
              
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="bg-indigo-600 flex items-center justify-center text-white relative">
          <div className="text-center">
            <Image
              src="/landing.png"
              alt="slide"
              fill
              className="object-cover"
            />
            <div className="absolute flex flex-col justify-center h-full w-full">
              
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}