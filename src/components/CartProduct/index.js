import React, {useEffect} from 'react'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

import styles from './cart-product.module.scss'

const CartProduct = ({data, removeProduct, setQuantity}) => {

    useEffect(() => {
        if(data.quantity <= 0){
            removeProduct({uid: data.uid, size:data.size})
        }
    }, [data.quantity])

    console.log(data)

    return(
        <tr className={styles.cartProduct}>
            <td className={styles.productImage}>
                <Link to={`/shop/${data.data.product_category.uid}/${data.uid}`}>
                    <Image fluid={data.data.images[0].image.localFile.childImageSharp.fluid} alt={data.data.images[0].image.alt}/>
                </Link>
            </td>
            <td className={styles.productDescription}>
                <p>{data.data.title}</p>
                <p>Color: {data.data.color_name}</p>
                <p>Size: {data.size}</p>
            </td>
            <td className={styles.productQuantity}>
                <button onClick={() => setQuantity({uid:data.uid,size:data.size}, data.quantity - 1)}>
                    -
                </button>
                <p>{data.quantity}</p>
                <button onClick={() => {data.data.sizes.find(size => size.size.document.data.title == data.size).quantity > data.quantity && setQuantity({uid:data.uid,size:data.size}, data.quantity + 1)}}> 
                    +
                </button>
            </td>
            <td className={styles.productRemove}>
                <button onClick={() => removeProduct({uid: data.uid, size:data.size})}>
                    Remove
                </button>
            </td>
            <td className={styles.productPrice}>
                <p>€{data.data.price * data.quantity}</p>
            </td>
        </tr>
    )
}

export default CartProduct