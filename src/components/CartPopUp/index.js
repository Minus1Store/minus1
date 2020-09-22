import React from 'react'
import {Link} from 'gatsby'

import styles from './cart-pop-up.module.scss'

const CartPopUp = ({cart}) => {

    console.log(cart)

    return(
        <div className={styles.cartPopUp}>
            <ul className={styles.cartInfo}>
                <li>
                    <p>
                        {cart.length} {cart.length == 1 ? 'item' : 'items'} in your basket
                    </p>
                </li>
                <li>{
                    cart.length > 0 &&
                    <p>
                        subtotal €{cart.map(item => item.data.price).reduce((total = 0, itemPrice) => {
                            return total + itemPrice
                        })}
                    </p>
                    }
                </li>
            </ul>
            <div className={styles.secondaryButton}>
                <Link to={'/shop/cart'}>
                    view/edit basket
                </Link>
            </div>
            <div className={styles.primaryButton}>
                <Link to={'/shop/checkout'}>
                    checkout
                </Link>
            </div>
        </div>
    )
}

export default CartPopUp