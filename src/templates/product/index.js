import React from 'react'
import Image from 'gatsby-image'
import {graphql, Link} from 'gatsby'

import PageLayout from '../../components/PageLayout'
import styles from './product-page.module.scss'
import NavFooterMobile from '../../components/NavFooterMobile'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'

const ProductPage = ({data}) => {

    console.log(data)

    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
              <div className={styles.mainImageContainer}>
                <Image fluid={data.product.data.images[0].image.localFile.childImageSharp.fluid} alt={data.product.data.images[0].image.alt}/>
              </div>
              <div className={styles.informationContainer}>
                <div className={styles.title}>
                  {data.product.data.title}
                </div>
                <div className={styles.color}>
                  {data.product.data.color_name}
                </div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html:data.product.data.description.html}}></div>
                <div className={styles.price}>
                  €{data.product.data.price}
                </div>
                <div className={styles.sizes}>
                  {
                    data.product.data.sizes.length > 0 &&
                    <select name='size'>
                      {data.product.data.sizes.map(({size}) => {
                        return <option value={size.document.data.title}>{size.document.data.title}</option>
                      })}
                    </select>
                  }
                </div>
                <div className={styles.actionButtons}>
                  <div>
                    <PrimaryButton text='add to basket' />
                  </div>
                  <div>
                    <SecondaryButton text='keep shopping'/>
                  </div>
                </div>
              </div>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
              <div className={styles.siteTree}>
                  <Link to={'/'}>
                      home
                  </Link>
                  &gt;
                  <Link to={'/shop'}>
                      shop
                  </Link>
              </div>
              <NavFooterDesktop
                  linksArray={
                      [
                          {
                              link:[
                                  {
                                      text:'view all',
                                      href:'/shop'
                                  }
                              ]
                          },
                          {
                              link:[
                                  {
                                      text:'sizing',
                                      href:'/shop/sizing'
                                  }
                              ]
                          },
                          {
                              link:[
                                  {
                                      text:'shipping',
                                      href:'/shop/shipping'
                                  }
                              ]
                          },
                          {
                              link:[
                                  {
                                      text:'terms',
                                      href:'/shop/terms'
                                  }
                              ]
                          },
                          {
                              link:[
                                  {
                                      text:'privacy',
                                      href:'/shop/privacy'
                                  }
                              ]
                          },
                          {
                              link:[
                                  {
                                      text:'f.a.q.',
                                      href:'/shop/faq'
                                  }
                              ]
                          },
                  ]
                  }
              />
            </div>
        </PageLayout>
    )
}

export const pageQuery = graphql`
  query ProductBySlug($uid: String!) {
    product:prismicProduct(uid: { eq: $uid }) {
        data {
            color_name
            description {
              html
            }
            images {
              image {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 450, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            price
            sizes {
              size {
                document {
                  ... on PrismicSize {
                    id
                    data {
                      title
                    }
                  }
                }
              }
            }
            title
          }
    }
}
`

export default ProductPage