import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
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
import NavFooterMobile2 from '../../components/NavFooterMobile2'
import InvisibleH1 from '../../components/InvisibleH1'

const ProductSubcategoryPage = ({ location, data }) => {
  
  console.log(data)
  return (
    <PageLayout minimizedHeader
      headerChildren={
        <p className={styles.productsType}>
          {data && data.subcategory && data.subcategory.data && data.subcategory.data.product_category
            && data.subcategory.data.product_category.document &&
            data.subcategory.data.product_category.document.data &&
            data.subcategory.data.product_category.document.data.product_category + ' '
          }
          {data && data.subcategory && data.subcategory.data && data.subcategory.data.product_subcategory}
        </p>
      }
    >
      <SEO
        titleTemplate={`%s | Shop 
        ${data && data.subcategory && data.subcategory.data && data.subcategory.data.product_category
          && data.subcategory.data.product_category.document &&
          data.subcategory.data.product_category.document.data &&
          data.subcategory.data.product_category.document.data.product_category + ' '
        }
        ${data && data.subcategory && data.subcategory.data && data.subcategory.data.product_subcategory}`}
        url={location.href}
        description={`All shop ${
          data.products && data.products.edges.length > 0
            ? data.products.edges[0].node.data.product_category.uid
            : ''
        }. Products: ${
          data.products &&
          data.products.edges.length > 0 &&
          data.products.edges
            .map(({ node }) => {
              return `${node.data.color_name} ${node.data.title}`
            })
            .join(',')
        }`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>
          Product Subcategory
          {data && data.subcategory && data.subcategory.data && data.subcategory.data.product_subcategory}
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
            {data.secondaryProducts &&
              data.secondaryProducts.edges.length > 0 &&
              data.secondaryProducts.edges.map(({ node }) => {
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
          </ProductsContainer>
        </div>
      </div>
      <NavFooterMobile2 />
      <div className={styles.navFooterContainer}>
        <SiteTree
          links={[
            { text: 'home', link: '/' },
            { text: 'shop', link: '/shop/all' },
            {
              text: data.subcategory.data.product_subcategory,
              link: `/shop/${data.subcategory.data.product_category.uid}/${data.subcategory.data.product_subcategory}`,
            },
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
  query SubcategoryQuery($subcategory_uid: String!) {
    products: allPrismicProduct(
      filter: {
        data: { product_subcategory: { uid: { eq: $subcategory_uid } } }
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
              secondary_product_subcategory: { uid: { eq: $subcategory_uid } }
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
          }
          uid
        }
      }
    }
    subcategory: prismicProductSubcategory(uid: { eq: $subcategory_uid }) {
      data {
        product_subcategory
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
      }
    }
  }
`

export default ProductSubcategoryPage
