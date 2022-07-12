import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation } from "swiper";

import 'swiper/css';
import Image from 'next/image';

function MySwiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
    >
      <SwiperSlide><Image src='/images/header.jpg' layout="responsive" height={400} width={1000} objectFit='cover'  alt='aks'/></SwiperSlide>
      <SwiperSlide><Image src='/images/header3.jpg' layout="responsive" height={400} width={1000} objectFit='cover'  alt='aks'/></SwiperSlide>
    </Swiper>
  )
}

export default MySwiper