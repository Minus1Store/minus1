import React from 'react'
import Image from 'gatsby-image'


import styles from './cart-product.module.scss'
import testProductImg from '../../img/test/11.jpg'

const CartProduct = ({data, removeProduct}) => {

    return(
        <tr className={styles.cartProduct}>
            <td className={styles.productImage}>
                <Image fluid={data.data.images[0].image.localFile.childImageSharp.fluid} alt={data.data.images[0].image.alt}/>
            </td>
            <td className={styles.productDescription}>
                <p>{data.data.title}</p>
                <p>Color: {data.data.color_name}</p>
                <p>Size: {data.size}</p>
            </td>
            <td className={styles.productQuantity}>
                <p>{data.quantity}</p>
            </td>
            <td className={styles.productRemove}>
                <button onClick={() => removeProduct({uid: data.uid, size:data.size})}>
                    Remove
                </button>
            </td>
            <td className={styles.productPrice}>
                <p>€{data.data.price}</p>
            </td>
        </tr>
    )
}

export default CartProduct