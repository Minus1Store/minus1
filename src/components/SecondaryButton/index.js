import React from 'react'

import styles from './secondary-button.module.scss'

const SecondaryButton = ({text}) => {
    return (
        <button className={styles.secondaryButton}>
            {text}
        </button>
    )
}

export default SecondaryButton