import React from 'react'

import styles from './secondary-button.module.scss'

const SecondaryButton = ({ text, disabled }) => {
  return (
    <button
      className={`${styles.secondaryButton} ${disabled && styles.disabled}`}
    >
      {text}
    </button>
  )
}

export default SecondaryButton
