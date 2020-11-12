import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import Image from 'gatsby-image'

import styles from './product-subcategory.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'
import ShopFilters from '../../components/ShopFilters'
import ProductsContainer from '../../components/ProductsContainer'
import ProductThumbnail from '../../components/ProductThumbnail'
import SiteTree from '../../components/SiteTree'
import SEO from '../../components/SEO'

const ProductSubcategoryPage = ({location, data}) => {
    return (
        <PageLayout>
          <SEO titleTemplate={`%s | Shop ${data.products.edges.length > 0 ? data.products.edges[0].node.data.product_category.document.data.product_category : ""}`} url={location.href} description={`All shop ${data.products.edges.length > 0 ? data.products.edges[0].node.data.product_category.uid : ""}. Products: ${data.products.edges.length > 0 && data.products.edges.map(({node}) => {
            return `${node.data.color_name} ${node.data.title}`
          }).join(',')}`}/>
            <div className={styles.pageWrapper}>
                <div className={styles.productContainer}>
                    <div className={styles.filters}>
                        {
                        typeof location != 'undefined' &&
                            <ShopFilters location={location}/>
                        }
                    </div>
                    <ProductsContainer>
                        {data.products && data.products.edges.map(({node}) => {
                            return <div className={styles.product}>
                                <Link to={`/shop/${node.data.product_category.uid}/${node.uid}`}>
                                    <ProductThumbnail image={node.data.images[0].image.localFile.childImageSharp.fluid} alt={node.data.images[0].image.alt} sizes={node.data.sizes}/>
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
                        {data.secondaryProducts && data.secondaryProducts.edges.map(({node}) => {
                            return <div className={styles.product}>
                                <Link to={`/shop/${node.data.product_category.uid}/${node.uid}`}>
                                    <ProductThumbnail image={node.data.images[0].image.localFile.childImageSharp.fluid} alt={node.data.images[0].image.alt} sizes={node.data.sizes}/>
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
            <SiteTree links={[{text: 'home',link:'/'}, {text: 'shop', link:'/shop/all'}, {text: data.subcategory.data.product_subcategory, link:`/shop/${data.subcategory.data.product_category.uid}/${data.subcategory.data.product_subcategory}`}]}/>
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
  query SubcategoryQuery($subcategory_uid: String!) {
    products:allPrismicProduct(filter: {data: {product_subcategory: {uid: {eq: $subcategory_uid}}}}) {
        edges {
          node {
            data {
              color_name
              title
              sizes {
                quantity
                size {
                  document {
                    ... on PrismicSize {
                      id
                    }
                  }
                }
              }
              images {
                image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 650, quality: 100){
                          ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              product_category{
                uid
                document {
                  ... on PrismicProductCategory {
                    id
                    data {
                      product_category
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
      secondaryProducts: allPrismicProduct(filter: {data: {secondary_categories: {elemMatch: {secondary_product_subcategory: {uid: {eq: $subcategory_uid}}}}}}) {
        edges {
          node {
            data {
              color_name
              title
              sizes {
                quantity
                size {
                  document {
                    ... on PrismicSize {
                      id
                    }
                  }
                }
              }
              images {
                image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 650, quality: 100){
                          ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              product_category{
                uid
                document {
                  ... on PrismicProductCategory {
                    id
                    data {
                      product_category
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
    subcategory:prismicProductSubcategory(uid: {eq: $subcategory_uid}) {
      data {
        product_subcategory
        product_category {
          uid
        }
      }
    }
}
`

export default ProductSubcategoryPage