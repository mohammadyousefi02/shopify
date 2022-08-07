import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

import Image from 'next/image';

function MySwiper() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
        pagination={{
          clickable: true,
        }}
        
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }
        }
        modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide>
        <div className='relative w-full h-[400px]'>
          <Image src="/images/swiper1.jpg" layout='fill' alt='swiper'/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative w-full h-[400px]'>
          <Image src="/images/swiper2.jpg" layout='fill' alt='swiper'/>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default MySwiper