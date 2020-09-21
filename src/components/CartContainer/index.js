import React from 'react'

import styles from './cart-container.module.scss'

const CartContainer = ({children}) => {
    return(
        <div className={styles.cartContainer}>
            {children}
        </div>
    )
}

export default CartContainer