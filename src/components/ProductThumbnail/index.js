import React from 'react'
import Image from 'gatsby-image'

import styles from './product-thumbnail.module.scss'

const ProductThumbnail = ({image, alt}) => {
    return(
        <div className={styles.productThumbnail}>
            <Image fluid={image} alt={alt}/>
        </div>
    )
}

export default ProductThumbnail