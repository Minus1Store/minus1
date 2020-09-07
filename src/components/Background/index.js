import React from 'react'
import styles from './background.module.scss'


const Background = ({image}) => {
    return (
    <div className={styles.backgroundImage}>
        <img src={image} alt=''/>
    </div>
    )
}

export default Background