import React, { useState, useEffect } from 'react'

import FadeImageSlider from '../../components/FadeImageSlider'
import styles from './tooltip-slider.module.scss'

import arrow from '../../img/test/right-arrow.svg'

const TooltipSlider = ({
  images,
  setImageClicked,
  clickedThumbnail,
  setClickedThumbnail,
}) => {
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)

  const prevSlide = () => {
    if (swiperInstance) {
      if (clickedThumbnail !== 0) {
        setClickedThumbnail((prevState) => prevState - 1)
      }
      return swiperInstance.slidePrev()
    }
  }

  const nextSlide = () => {
    if (swiperInstance) {
      if (images.length - 1 !== clickedThumbnail) {
        setClickedThumbnail((prevState) => prevState + 1)
      }
      return swiperInstance.slideNext()
    }
  }

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(clickedThumbnail, 0)
    }
  })

  return (
    <div className={styles.tooltipSlider}>
      <div
        onMouseMove={(e) => {
          setTooltipX(e.clientX - 15)
          setTooltipY(e.screenY + 15)
        }}
        className={styles.prevSlideButton}
        onClick={() => prevSlide()}
      >
        <div
          className={styles.tooltip}
          style={{ left: tooltipX, top: tooltipY }}
        >
          <img src={arrow} className={styles.prevSlideTooltip} />
        </div>
      </div>
      <div className={styles.slider} onClick={() => setImageClicked(false)}>
        <FadeImageSlider
          images={images}
          showNavigation={false}
          setSwiperInstance={setSwiperInstance}
          setClickedThumbnail={setClickedThumbnail}
        />
      </div>
      <div
        onMouseMove={(e) => {
          setTooltipX(e.clientX - 15)
          setTooltipY(e.screenY + 15)
        }}
        className={styles.nextSlideButton}
        onClick={() => nextSlide()}
      >
        <div
          className={styles.tooltip}
          style={{ left: tooltipX, top: tooltipY }}
        >
          <img src={arrow} className={styles.nextSlideTooltip} />
        </div>
      </div>
    </div>
  )
}

export default TooltipSlider
