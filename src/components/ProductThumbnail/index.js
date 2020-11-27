import React, {useState} from 'react'
import Image from 'gatsby-image'

import styles from './product-thumbnail.module.scss'

const ProductThumbnail = ({image, alt, sizes}) => {

    const [hovered, setHovered] = useState(false)

    const checkIfThereAreSizes = () => {
        return sizes.every(node => node.size.document && node.size.document.data.title)
    }

    return(
        <div className={styles.productThumbnail} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
            <Image fluid={image} alt={alt}/>
            {
                hovered && sizes && sizes.every(size => size.quantity <= 0) && checkIfThereAreSizes() &&
                <div className={styles.soldOutIndicator}>
                    <p>sold out</p>
                </div>
            }
            {
                hovered && sizes && !checkIfThereAreSizes() &&
                <div className={styles.soldOutIndicator}>
                    <p>not available</p>
                </div>
            }
        </div>
    )
}

export default ProductThumbnail