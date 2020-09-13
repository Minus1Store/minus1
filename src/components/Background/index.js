import React from 'react'
import styles from './background.module.scss'
import Image from 'gatsby-image'

const Background = ({image}) => {
    return (
    <div className={styles.backgroundImage}>
        <Image fluid={image} alt=''/>
    </div>
    )
}

export default Background