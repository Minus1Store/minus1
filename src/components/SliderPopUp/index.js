import React from 'react'
import { useSpring, animated } from 'react-spring'

import styles from './slider-pop-up.module.scss'
import TooltipSlider from '../../components/TooltipSlider'

const SliderPopUp = ({
  images,
  clickedThumbnail,
  setClickedThumbnail,
  setImageClicked,
}) => {
  const popupAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  })

  return (
    <div className={styles.sliderPopUp}>
      <animated.div style={popupAnimation} className={styles.animatedContainer}>
        <TooltipSlider
          images={images}
          setImageClicked={setImageClicked}
          clickedThumbnail={clickedThumbnail}
          setClickedThumbnail={setClickedThumbnail}
        />
      </animated.div>
    </div>
  )
}

export default SliderPopUp
