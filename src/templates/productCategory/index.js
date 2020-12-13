import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import styles from './product-category.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'
import ShopFilters from '../../components/ShopFilters'
import ProductsContainer from '../../components/ProductsContainer'
import ProductThumbnail from '../../components/ProductThumbnail'
import SiteTree from '../../components/SiteTree'
import SEO from '../../components/SEO'
import NavFooterMobile2 from '../../components/NavFooterMobile2'
import InvisibleH1 from '../../components/InvisibleH1'

const ProductCategoryPage = ({ location, data }) => {

  function removedDuplicatesSecondaryProducts(){
    let uidArray = []
    return data.secondaryProducts.edges.map(({node:product}) => {
      if(uidArray.find(uid => uid == product.uid)){
        
      }else{
        uidArray.push(product.uid)
        return product
      }
    }).filter(value => value != undefined)
  }

  console.log(removedDuplicatesSecondaryProducts())

  return (
    <PageLayout>
      <SEO
        titleTemplate={`%s | Shop ${
          data.category ? data.category.data.product_category
          : 
          ''
        }`}
        url={location.href}
        description={`All shop ${
            data.category ? data.category.data.product_category
            : ''
        }. Products: ${
          data.products &&
          data.products.edges.length > 0 &&
          data.products.edges
            .map(({ node }) => {
              return `${node.data.color_name} ${node.data.title}`
            })
            .join(',') + 
            data.secondaryProducts &&
            data.secondaryProducts.edges.length > 0 &&
            data.secondaryProducts.edges
            .map(({ node }) => {
              return `${node.data.color_name} ${node.data.title}`
            })
            .join(',')
        }`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>
          Product Category 
          {
            data.products && data.products.edges.length > 0
            ? data.products.edges[0].node.data.product_category.document.data
                .product_category
            : ''
          }
        </InvisibleH1>
        <div className={styles.productContainer}>
          <div className={styles.filters}>
            {typeof location != 'undefined' && (
              <ShopFilters location={location} />
            )}
          </div>
          <ProductsContainer>
            {data.products &&
              data.products.edges.length > 0 &&
              data.products.edges.map(({ node }) => {
                return (
                  <div className={styles.product} key={node.uid}>
                    <Link
                      to={`/shop/${
                        node.data.product_category &&
                        node.data.product_category.uid
                      }/${node.uid}`}
                    >
                      <ProductThumbnail
                        thumbnailSize="medium"
                        image={
                          node.data.images.length > 0 &&
                          node.data.images[0].image &&
                          node.data.images[0].image.localFile &&
                          node.data.images[0].image.localFile.childImageSharp &&
                          node.data.images[0].image.localFile.childImageSharp
                            .fluid
                        }
                        alt={
                          node.data.images.length > 0 &&
                          node.data.images[0].image &&
                          node.data.images[0].image.alt
                        }
                        sizes={node.data.sizes}
                      />
                      <div className={styles.productInformation}>
                        <p>{node.data.title}</p>
                      </div>
                      <div className={styles.productInformation}>
                        <p>{node.data.color_name}</p>
                      </div>
                    </Link>
                  </div>
                )
              })}
            {
            data.secondaryProducts &&
              data.secondaryProducts.edges.length > 0 &&
              removedDuplicatesSecondaryProducts().map(( node ) => {
                return <div className={styles.product} key={node.uid}>
                  <Link
                    to={`/shop/${
                      node.data.product_category &&
                      node.data.product_category.uid
                    }/${node.uid}`}
                  >
                    <ProductThumbnail
                      thumbnailSize="medium"
                      image={
                        node.data.images.length > 0 &&
                        node.data.images[0].image &&
                        node.data.images[0].image.localFile &&
                        node.data.images[0].image.localFile.childImageSharp &&
                        node.data.images[0].image.localFile.childImageSharp
                          .fluid
                      }
                      alt={
                        node.data.images.length > 0 &&
                        node.data.images[0].image &&
                        node.data.images[0].image.alt
                      }
                      sizes={node.data.sizes}
                    />
                    <div className={styles.productInformation}>
                      <p>{node.data.title}</p>
                    </div>
                    <div className={styles.productInformation}>
                      <p>{node.data.color_name}</p>
                    </div>
                  </Link>
                </div>
              })}
          </ProductsContainer>
        </div>
      </div>
      <NavFooterMobile2 />
      <div className={styles.navFooterContainer}>
        <SiteTree
          links={[
            { text: 'home', link: '/' },
            { text: 'shop', link: '/shop/all' },
          ]}
        />
        <NavFooterDesktop
          linksArray={[
            {
              link: [
                {
                  text: 'view all',
                  href: '/shop/all',
                },
              ],
            },
            {
              link: [
                {
                  text: 'sizing',
                  href: '/shop/sizing',
                },
              ],
            },
            {
              link: [
                {
                  text: 'shipping',
                  href: '/shop/shipping',
                },
              ],
            },
            {
              link: [
                {
                  text: 'terms',
                  href: '/shop/terms',
                },
              ],
            },
            {
              link: [
                {
                  text: 'privacy',
                  href: '/shop/privacy',
                },
              ],
            },
            {
              link: [
                {
                  text: 'f.a.q.',
                  href: '/shop/faq',
                },
              ],
            },
          ]}
        />
      </div>
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query ProductsBySlug($category_uid: String!) {
    category: prismicProductCategory(uid: {eq: $category_uid}) {
      uid
      data {
        product_category
      }
    }
    products: allPrismicProduct(
      filter: { data: { product_category: { uid: { eq: $category_uid } } } }
    ) {
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
                    data {
                      title
                    }
                  }
                }
              }
            }
            images {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 165, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            product_category {
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
    secondaryProducts: allPrismicProduct(
      filter: {
        data: {
          secondary_categories: {
            elemMatch: {
              secondary_product_category: { uid: { eq: $category_uid } }
            }
          }
        }
      }
    ) {
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
                    data {
                      title
                    }
                    id
                  }
                }
              }
            }
            images {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 170, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            product_category {
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
            secondary_categories {
              secondary_product_category {
                document {
                  ... on PrismicProductCategory {
                    data {
                      product_category
                    }
                    uid
                  }
                }
              }
              secondary_product_subcategory {
                document {
                  ... on PrismicProductSubcategory {
                    data {
                      product_subcategory
                    }
                    uid
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
