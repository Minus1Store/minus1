import React, {useState, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'

import styles from './slider-pop-up.module.scss'
import FadeImageSlider from '../../components/FadeImageSlider'

import arrow from '../../img/test/right-arrow.svg'

const SliderPopUp = ({images, imageClicked, clickedThumbnail, setClickedThumbnail, setImageClicked}) => {

    const [swiperInstance, setSwiperInstance] = useState(null)
    const [tooltipX, setTooltipX] = useState(0) 
    const [tooltipY, setTooltipY] = useState(0) 
    
    const popupAnimation = useSpring({
    from:{opacity: 0},
        to:{opacity: 1},
        delay:500
    })

    const prevSlide = () => {
        if(swiperInstance){
            if(clickedThumbnail !== 0){
                setClickedThumbnail(prevState => prevState - 1)
            }
            return swiperInstance.slidePrev()
        }
    }

    const nextSlide = () => {
        if(swiperInstance){
            if(images.length - 1 !== clickedThumbnail){
                setClickedThumbnail(prevState => prevState + 1)
            }
            return swiperInstance.slideNext()
        }
    }

    useEffect(() => {
        if(swiperInstance){
            swiperInstance.slideTo(clickedThumbnail, 0)
        }
    })

    return(
        <div className={styles.sliderPopUp}>
            <animated.div style={popupAnimation} className={styles.animatedContainer}>
                <div onMouseMove={(e) => {setTooltipX(e.clientX - 15); setTooltipY(e.clientY + 15)}} className={styles.prevSlideButton} onClick={() => prevSlide()}>
                    <div className={styles.tooltip} style={{left:tooltipX,top:tooltipY}}>
                        <img src={arrow} className={styles.prevSlideTooltip}/>
                    </div>
                </div>
                <div className={styles.slider} onClick={() => setImageClicked(false)}>
                    <FadeImageSlider images={images} showNavigation={false} setSwiperInstance={setSwiperInstance} setImageClicked={setImageClicked} setClickedThumbnail={setClickedThumbnail}/>
                </div>
                <div onMouseMove={(e) => {setTooltipX(e.clientX - 15); setTooltipY(e.clientY + 15)}} className={styles.nextSlideButton} onClick={() => nextSlide()}>
                    <div className={styles.tooltip} style={{left:tooltipX,top:tooltipY}}>
                        <img src={arrow} className={styles.nextSlideTooltip}/>
                    </div>
                </div>
            </animated.div>
        </div>
    )
}

export default SliderPopUp