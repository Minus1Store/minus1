import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { useQueryParam, StringParam } from "use-query-params";

import styles from './shop.module.scss'
import PageLayout from '../../../components/PageLayout'
import NavFooterMobile2 from '../../../components/NavFooterMobile2/index'
import NavFooterDesktop from '../../../components/NavFooterDesktop/index'
import ShopFilters from '../../../components/ShopFilters'
import ProductsContainer from '../../../components/ProductsContainer'
import ProductThumbnail from '../../../components/ProductThumbnail'
import SiteTree from '../../../components/SiteTree'
import SEO from '../../../components/SEO'
import InvisibleH1 from '../../../components/InvisibleH1'
import MobileShopFilters from '../../../components/MobileShopFilters'

const Shop = ({ location }) => {
  const [all, setAll] = useQueryParam("mobile", StringParam);

  const data = useStaticQuery(graphql`
    query ShopQuery {
      products: allPrismicProduct {
        edges {
          node {
            data {
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
                  alt
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 125, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              product_category {
                uid
              }
              product_family {
                uid
              }
            }
            uid
          }
        }
      }
    }
    `)
    
    return (
      <PageLayout minimizedHeader headerChildren={
        all && <p className={styles.productsType}>all</p>
    }>
      <SEO
        titleTemplate={'%s | Shop'}
        url={location.href}
        description={`All shop products: ${
          data.products.edges.length > 0 &&
          data.products.edges
            .map(({ node }, index) => {
              if (index < 50) {
                return node.data.title
              }
            })
            .join(',')
        }`}
      />
      {
        !all &&
        <MobileShopFilters location={location}/>
      }
      <div className={`${styles.pageWrapper} ${!all && styles.contentInvisible}`}>
        <InvisibleH1>All Minus1 Shop Products</InvisibleH1>
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
                      {node.data.images.length > 0 &&
                        node.data.images[0].image &&
                        node.data.images[0].image.localFile && (
                          <ProductThumbnail
                            image={
                              node.data.images[0].image.localFile
                                .childImageSharp.fluid
                            }
                            alt={node.data.images[0].image.alt}
                            sizes={node.data.sizes}
                            className={styles.productThumbnail}
                          />
                        )}
                        {
                          node &&
                          node.data && 
                          node.data.title &&
                          <p className={styles.productTitle}>{node.data.title}</p>
                        }
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

export default Shop
