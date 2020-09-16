import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'

import styles from './shop-thumbnails.module.scss'

const ShopThumbnails = ({data, location}) => {
    
    return (
        <div className={styles.shopThumbnailsContainer}>
            {data.allFamilyProducts.edges.map(({node}) => {
            return <div className={styles.allProductThumbnails}>
                {node.data.images.map(({image}, index) => {
                    if(index == 0){
                        let to = `/shop/${node.data.product_family.document.data.product_category.document.uid}/${node.uid}`
                        
                        return <div className={`${styles.productThumbnail} ${(to == location.pathname && location.search == '') && styles.activeLink}`}>
                            <Link to={to}>
                            <Image fluid={image.localFile.childImageSharp.fluid} alt={image.alt}/>
                        </Link>
                        </div>
                    }else{
                        let to = `/shop/${node.data.product_family.document.data.product_category.document.uid}/${node.uid}`
                        
                        return <div className={`${styles.productThumbnail} ${(to == location.pathname && location.search == `?img=${index}`) && styles.activeLink}`}>
                            <Link to={`${to}?img=${index}`}>
                            <Image fluid={image.localFile.childImageSharp.fluid} alt={image.alt}/>
                        </Link>
                        </div>
                    }
                })}
            </div>
            })}
        </div>
    )
}

export default ShopThumbnails