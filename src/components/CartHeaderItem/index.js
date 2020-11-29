import React from 'react'

import styles from './cart-header-item.module.scss'

const CartHeaderItem = ({
  children,
  active,
  disabled,
  fullWidth,
  presentational,
}) => {
  return (
    <div
      style={{ width: fullWidth && '100%' }}
      className={`${styles.cartHeaderItem} ${active && styles.isActive} ${
        disabled && styles.isDisabled
      } ${!active && !disabled && !presentational && styles.isHovered}`}
    >
      {children}
    </div>
  )
}

export default CartHeaderItem
