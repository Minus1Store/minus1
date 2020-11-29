import React, { useEffect, useState } from 'react'
import Image from 'gatsby-image'
import { Link } from 'gatsby'

import styles from './cart-product.module.scss'
import getProductSoldQuantity from '../../utils/getProductSoldQuantity'

const CartProduct = ({ data, removeProduct, setQuantity, presentational }) => {
  let [soldQuantity, setSoldQuantity] = useState()

  useEffect(() => {
    ;(async () => {
      let soldQuantityResult = await getProductSoldQuantity(data.uid, data.size)
      setSoldQuantity(soldQuantityResult)
    })()
  }, [])

  useEffect(() => {
    if (data.quantity <= 0) {
      removeProduct({ uid: data.uid, size: data.size })
    }
  }, [data.quantity])

  return (
    <tr className={styles.cartProduct}>
      <td className={styles.productImage}>
        <Link to={`/shop/${data.data.product_category.uid}/${data.uid}`}>
          {data.data.images[0] &&
            data.data.images[0].image &&
            data.data.images[0].image.localFile &&
            data.data.images[0].image.localFile.childImageSharp && (
              <Image
                fluid={
                  data.data.images[0].image.localFile.childImageSharp.fluid
                }
                alt={data.data.images[0].image.alt}
              />
            )}
        </Link>
      </td>
      <td className={styles.productDescription}>
        <p>{data.data.title}</p>
        <p>Color: {data.data.color_name}</p>
        <p>Size: {data.size}</p>
      </td>
      <td className={styles.productQuantity}>
        <div>
          {!presentational && (
            <button
              onClick={() =>
                setQuantity(
                  { uid: data.uid, size: data.size },
                  data.quantity - 1
                )
              }
            >
              -
            </button>
          )}
          <p>{data.quantity}</p>
          {!presentational && (
            <button
              onClick={() => {
                data.data.sizes.find(
                  (size) => size.size.document.data.title == data.size
                ).quantity >
                  data.quantity + soldQuantity &&
                  setQuantity(
                    { uid: data.uid, size: data.size },
                    data.quantity + 1
                  )
              }}
            >
              +
            </button>
          )}
        </div>
      </td>
      {!presentational && (
        <td className={styles.productRemove}>
          <button
            onClick={() => removeProduct({ uid: data.uid, size: data.size })}
          >
            Remove
          </button>
        </td>
      )}
      <td className={styles.productPrice}>
        <p>€{data.data.price * data.quantity}</p>
      </td>
    </tr>
  )
}

export default CartProduct
