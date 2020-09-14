import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import Image from 'gatsby-image'

import styles from './shop.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

const Shop = () => {

    const data = useStaticQuery(graphql`
        query ShopQuery {
            products: allPrismicProduct {
                edges {
                  node {
                    data {
                      images {
                        image {
                          alt
                          localFile {
                            childImageSharp {
                              fluid(maxWidth: 450) {
                                ...GatsbyImageSharpFluid
                              }
                            }
                          }
                        }
                      }
                      product_family {
                        document {
                          ... on PrismicProductFamily {
                            id
                            data {
                              product_category {
                                document {
                                  ... on PrismicProductCategory {
                                    id
                                    data {
                                      product_category
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    uid
                  }
                }
              }
            productCategories:allPrismicProductCategory {
                edges {
                  node {
                    data {
                      product_category
                    }
                  }
                }
              }
        }      
    `)

    console.log(data)

    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.productContainer}>
                    <div className={styles.filters}>
                        <Link to={'/shop'}>
                            all
                        </Link>
                        {data.productCategories.edges.map(({node}) => {
                            return <Link to={'#'}>
                                {node.data.product_category}
                            </Link>
                        })}
                    </div>
                    <div className={styles.products}>
                        {data.products.edges.map(({node}) => {
                            return <div className={styles.product}>
                                <Link to={`/shop/${node.data.product_family.document.data.product_category.document.data.product_category.toLowerCase()}/${node.uid}`}>
                                    <div className={styles.productImage}>
                                        <Image fluid={node.data.images[0].image.localFile.childImageSharp.fluid} alt={node.data.images[0].image.alt}/>
                                    </div>
                                </Link>
                            </div>
                        })}
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

export default Shop