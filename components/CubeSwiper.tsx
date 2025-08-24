'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import Image from "next/image";

interface ImageArray {
  images: string[];
}

export default function CubeSwiper({ images }: ImageArray) {
  return (
    <Swiper
      effect={"cube"}
      grabCursor
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      modules={[EffectCube, Pagination]}
      className="mySwiper w-[300px] sm:w-lg mx-auto lg:w-4/12 h-[300px]"
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx} className="w-full h-full">
          <Image
            src={src}
            alt={`about us image ${idx + 1}`}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
