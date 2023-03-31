import React from "react";
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow,Pagination,Navigation } from "swiper";
import slide_image1 from "../../public/slider/gyro.jpg"
import slide_image2 from "../../public/slider/poutine.jpg"
import slide_image3 from "../../public/slider/submarine.jpg"
import slide_image4 from "../../public/slider/vegie.jpg"
import slide_image5 from "../../public/slider/vegie2.jpg"
import slide_image6 from "../../public/slider/wings.jpg"
import "./Swiper.css"
import * as FaIcons from "react-icons/fa"

const HomePageSwiperSlider = () => {


    return (
        <>
            <div className="container">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 80,
                    modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
            >
                    <SwiperSlide>
                        <img src={slide_image1}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image2}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image3}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image4}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image5}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image6}/>
                    </SwiperSlide>
                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <FaIcons.FaArrowLeft fontSize={"120%"} color="red" />
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <FaIcons.FaArrowRight fontSize={"120%"} color="red" />
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            </div>
        </>

    )
}
    
export default HomePageSwiperSlider