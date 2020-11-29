import React from 'react'

import styles from './cart-header.module.scss'

const CartHeader = ({ children }) => {
  return <div className={styles.cartHeader}>{children}</div>
}

export default CartHeader
