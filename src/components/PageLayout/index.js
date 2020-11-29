import React, { useState, useEffect } from 'react'
import 'swiper/swiper.scss'

import Header from '../../components/Header/index'
import TimeString from '../../components/TimeString/index'
import styles from './page-layout.module.scss'
import { useSpring, animated } from 'react-spring'

const PageLayout = ({ children, showHeader }) => {
  const [startAnimation, setStartAnimation] = useState(false)

  const loadAnimation = useSpring({
    to: {
      opacity: startAnimation ? 1 : 0,
    },
  })

  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true)
    }, 500)
  }, [])

  return (
    <React.Fragment>
      <div className={styles.centeredItems}>
        {showHeader != false && (
          <div className={styles.headerGroup}>
            <Header />
            <TimeString />
          </div>
        )}
        <animated.div style={loadAnimation} className={styles.wrapper}>
          {children}
        </animated.div>
      </div>
    </React.Fragment>
  )
}

export default PageLayout
