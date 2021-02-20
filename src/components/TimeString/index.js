import React, { useState, useEffect } from 'react'
import moment from 'moment'

import styles from './time-string.module.scss'

const TimeString = ({ className, minimized }) => {
  const [currentTime, setCurrentTime] = useState(undefined)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().locale('rs').format('DD/MM/YYYY hh:mm a'))
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <p
      className={`${styles.time} ${currentTime && styles.appear} ${className} ${minimized && styles.minimized}`}
    >
      {currentTime} <span className={styles.city}>BG</span>
    </p>
  )
}

export default TimeString
