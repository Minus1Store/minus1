import React from 'react'

import styles from './primary-button.module.scss'

const PrimaryButton = ({text}) => {
    return (
        <button className={styles.primaryButton}>
            {text}
        </button>
    )
}

export default PrimaryButton