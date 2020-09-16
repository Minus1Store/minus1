import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import Image from 'gatsby-image'

import styles from './product-category.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'
import ShopFilters from '../../components/ShopFilters'
import ProductsContainer from '../../components/ProductsContainer'
import ProductThumbnail from '../../components/ProductThumbnail'

const ProductCategoryPage = ({location, data}) => {
    return (
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
                                    <div className={styles.productInformation}>
                                        <p>
                                            {node.data.title}
                                        </p>
                                    </div>
                                    <div className={styles.productInformation}>
                                        <p>
                                            {node.data.color_name}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </ProductsContainer>
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
  query ProductsBySlug($category_uid: String!) {
    products:allPrismicProduct(filter: {data: {product_category: {uid: {eq: $category_uid}}}}) {
        edges {
          node {
            data {
              color_name
              title
              images {
                image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 350){
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
`

export default ProductCategoryPage