import React from 'react'

import styles from './primary-button.module.scss'

const PrimaryButton = ({ text, disabled }) => {
  return (
    <button
      className={`${styles.primaryButton} ${disabled && styles.disabled}`}
    >
      {text}
    </button>
  )
}

export default PrimaryButton
