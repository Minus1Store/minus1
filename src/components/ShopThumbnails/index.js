import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import styles from './shop-thumbnails.module.scss'

const ShopThumbnails = ({ data, location }) => {
  return (
    <div className={styles.shopThumbnailsContainer}>
      {data.allFamilyProducts &&
        data.allFamilyProducts.edges.map(({ node }, index) => {
          return (
            <div className={styles.allProductThumbnails} key={index}>
              {node.data.images.length > 0 &&
                node.data.images.map(({ image }, index) => {
                  if (index == 0) {
                    let to = `/shop/${
                      node.data.product_family &&
                      node.data.product_family.document.data.product_category &&
                      node.data.product_family.document.data.product_category
                        .document.uid
                    }/${node.uid}`

                    return (
                      <div
                        key={index}
                        className={`${styles.productThumbnail} ${
                          to == location.pathname &&
                          location.search == '' &&
                          styles.activeLink
                        }`}
                      >
                        <Link to={to}>
                          {image.localFile &&
                            image.localFile.childImageSharp &&
                            image.localFile.childImageSharp.fluid && (
                              <Image
                                fluid={image.localFile.childImageSharp.fluid}
                                alt={image.alt ? image.alt : 'shop product'}
                              />
                            )}
                        </Link>
                      </div>
                    )
                  } else {
                    let to = `/shop/${
                      node.data.product_family &&
                      node.data.product_family.document.data.product_category &&
                      node.data.product_family.document.data.product_category
                        .document.uid
                    }/${node.uid}`

                    return (
                      <div
                        key={index}
                        className={`${styles.productThumbnail} ${
                          to == location.pathname &&
                          location.search == `?img=${index}` &&
                          styles.activeLink
                        }`}
                      >
                        <Link to={`${to}?img=${index}`}>
                          {image.localFile &&
                            image.localFile.childImageSharp &&
                            image.localFile.childImageSharp.fluid && (
                              <Image
                                fluid={image.localFile.childImageSharp.fluid}
                                alt={image.alt ? image.alt : 'shop product'}
                              />
                            )}
                        </Link>
                      </div>
                    )
                  }
                })}
            </div>
          )
        })}
      {!data.allFamilyProducts.edges.length > 0 && (
        <div className={styles.allProductThumbnails}>
          {data.product.data.images.length > 0 &&
            data.product.data.images.map(({ image }, index) => {
              if (image.localFile) {
                if (index == 0) {
                  let to = `/shop/${
                    data.product &&
                    data.product.data.product_category &&
                    data.product.data.product_category.uid
                  }/${data.product.uid}`

                  return (
                    <div
                      key={index}
                      className={`${styles.productThumbnail} ${
                        to == location.pathname &&
                        location.search == '' &&
                        styles.activeLink
                      }`}
                    >
                      <Link to={to}>
                        {image.localFile.childImageSharp && (
                          <Image
                            fluid={image.localFile.childImageSharp.fluid}
                            alt={image.alt}
                          />
                        )}
                      </Link>
                    </div>
                  )
                } else {
                  let to = `/shop/${
                    data.product &&
                    data.product.data.product_category &&
                    data.product.data.product_category.uid
                  }/${data.product.uid}`

                  return (
                    <div
                      key={index}
                      className={`${styles.productThumbnail} ${
                        to == location.pathname &&
                        location.search == `?img=${index}` &&
                        styles.activeLink
                      }`}
                    >
                      <Link to={`${to}?img=${index}`}>
                        {image.localFile.childImageSharp && (
                          <Image
                            fluid={image.localFile.childImageSharp.fluid}
                            alt={image.alt}
                          />
                        )}
                      </Link>
                    </div>
                  )
                }
              }
            })}
        </div>
      )}
    </div>
  )
}

export default ShopThumbnails
