import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import Image from 'gatsby-image'

import styles from './shop.module.scss'
import PageLayout from '../../../components/PageLayout'
import NavFooterMobile from '../../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../../components/NavFooterDesktop/index'
import ShopFilters from '../../../components/ShopFilters'
import ProductsContainer from '../../../components/ProductsContainer'
import ProductThumbnail from '../../../components/ProductThumbnail'
import SiteTree from '../../../components/SiteTree'

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
                                    uid
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
        }      
    `)

    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.productContainer}>
                    <div className={styles.filters}>
                        <ShopFilters location={location}/>
                    </div>
                    <ProductsContainer>
                        {data.products.edges.map(({node}) => {
                            return <div className={styles.product}>
                                <Link to={`/shop/${node.data.product_family.document.data.product_category.document.uid}/${node.uid}`}>
                                  <ProductThumbnail image={node.data.images[0].image.localFile.childImageSharp.fluid} alt={node.data.images[0].image.alt}/>
                                </Link>
                            </div>
                        })}
                    </ProductsContainer>
                </div>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
            <SiteTree links={[{text: 'home',link:'/'}, {text: 'shop', link:'/shop/all'}]}/>
            <NavFooterDesktop
                linksArray={
                    [
                        {
                            link:[
                                {
                                    text:'view all',
                                    href:'/shop/all'
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