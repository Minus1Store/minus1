import React from 'react'

import styles from './products-container.module.scss'

const ProductsContainer = ({children}) => {
    return(
        <div className={styles.productsContainer}>
            {children}
        </div>
    )
}

export default ProductsContainer