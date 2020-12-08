import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFade, Navigation } from 'swiper'
import Image from 'gatsby-image'
import 'swiper/swiper.scss'
import 'swiper/components/effect-fade/effect-fade.scss'
import 'swiper/components/navigation/navigation.scss'

SwiperCore.use([EffectFade, Navigation])

import styles from './fade-image-slider.module.scss'
import swiperArrow from '../../img/test/right-arrow.svg'

const FadeImageSlider = ({
  images,
  showNavigation,
  setSwiperInstance,
  setClickedThumbnail,
}) => {
  let [swiper, setSwiper] = useState()

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (setClickedThumbnail && currentSlide !== 0) {
      setClickedThumbnail(currentSlide)
    }
  }, [currentSlide])

  return (
    <div className={styles.fadeImageContainer}>
      <Swiper
        ref={swiper}
        slidesPerView={1}
        className={styles.slider}
        effect="fade"
        onInit={(swiper) => {
          setSwiper(swiper)
          setSwiperInstance && setSwiperInstance(swiper)
        }}
        onSlideChangeTransitionStart={(swiper) =>
          setCurrentSlide(swiper.activeIndex)
        }
      >
        {images &&
          images.map(({ image }, index) => {
            return (
              <SwiperSlide key={index} className={styles.slide}>
                <div
                  className={`${styles.slideImage} ${
                    currentSlide === index && styles.activeSlideImage
                  }`}
                >
                  {image &&
                    image.localFile &&
                    image.localFile.childImageSharp && (
                      <Image
                        fluid={image.localFile.childImageSharp.fluid}
                        alt={image.alt ? image.alt : 'slider image'}
                      />
                    )}
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
      {showNavigation !== false && (
        <div className={styles.navigationStatus}>
          <img
            onClick={() => swiper.slidePrev()}
            className={`${styles.swiperPrevEl} ${
              currentSlide == 0 && styles.invisible
            }`}
            src={swiperArrow}
            alt="prev slide"
          />
          {currentSlide + 1} of {images.length}
          <img
            onClick={() => swiper.slideNext()}
            className={`${styles.swiperNextEl} ${
              currentSlide == images.length - 1 && styles.invisible
            }`}
            src={swiperArrow}
            alt="next slide"
          />
        </div>
      )}
    </div>
  )
}

export default FadeImageSlider
