import React, {useState, useRef} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {EffectFade, Navigation} from 'swiper'
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import 'swiper/components/navigation/navigation.scss';

SwiperCore.use([EffectFade, Navigation]);

import styles from './fade-image-slider.module.scss'
import swiperArrow from '../../img/test/right-arrow.svg'

const FadeImageSlider = ({images}) => {
    let [swiper, setSwiper] = useState()

    const [currentSlide, setCurrentSlide] = useState(0)

    return (
        <div className={styles.fadeImageContainer}>
            <Swiper
                ref={swiper}
                slidesPerView={1}
                className={styles.slider}
                effect="fade"
                onInit={swiper => setSwiper(swiper)}
                onSlideChangeTransitionStart={(swiper) => setCurrentSlide(swiper.activeIndex)}
            >
                {images.map((image, index) => {
                    return <SwiperSlide key={index} className={styles.slide}>
                        <img className={`${styles.slideImage} ${currentSlide === index && styles.activeSlideImage}`} src={image} alt=''/>
                    </SwiperSlide>
                })}
            </Swiper>
            <div className={styles.navigationStatus}>
                <img onClick={() => swiper.slidePrev()} className={`${styles.swiperPrevEl} ${currentSlide == 0 && styles.invisible}`} src={swiperArrow} alt='prev slide' />
                {currentSlide + 1} of {images.length}
                <img onClick={() => swiper.slideNext()} className={`${styles.swiperNextEl} ${currentSlide == images.length - 1 && styles.invisible}`} src={swiperArrow} alt='next slide'/>
            </div>
        </div>
    )
}

export default FadeImageSlider