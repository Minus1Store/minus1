import React, {useState} from 'react'
import Image from 'gatsby-image'
import VisibilitySensor from 'react-visibility-sensor'

import styles from './product-thumbnail.module.scss'

const ProductThumbnail = ({image, alt, sizes, thumbnailSize}) => {

    const [hovered, setHovered] = useState(false)
    const [imageVisible, setImageVisible] = useState(false)

    const checkIfThereAreSizes = () => {
        return sizes.every(node => node.size.document && node.size.document.data && node.size.document.data.title)
    }

    function onVisibilityChange (isVisible) {
        setImageVisible(isVisible)
    }

    if(typeof window != 'undefined'){

        return(
            <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
                <div className={`${styles.productThumbnail} ${styles[thumbnailSize]}`} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
                    {   imageVisible &&
                        <Image fluid={image} alt={alt}/>
                    }
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
            </VisibilitySensor>
        )
    }else{
        return <></>
    }
}

export default ProductThumbnail