import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import styles from './preview-all.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import NavFooterMobile from '../../components/NavFooterMobile'
import PreviewFilters from '../../components/PreviewFilters'
import ProductsContainer from '../../components/ProductsContainer'
import ProductThumbnail from '../../components/ProductThumbnail'
import SEO from '../../components/SEO'
import ComingSoon from '../../components/ComingSoon'
import InvisibleH1 from '../../components/InvisibleH1'

const PreviewAllPage = ({ data, location }) => {
  return (
    <PageLayout>
      <SEO
        titleTemplate={'%s | Preview All'}
        url={location.href}
        description={`${
          data.currentPreview && data.currentPreview.data.title
        } Preview. ${
          data.products &&
          data.products.edges.length > 0 &&
          data.products.edges
            .reduce((accumulator, currentValue) => {
              if (accumulator) {
                return accumulator.find(
                  (item) =>
                    item.node.data.product_family.uid ==
                    currentValue.node.data.product_family.uid
                )
                  ? [...accumulator]
                  : [...accumulator, currentValue]
              } else {
                return [currentValue]
              }
            }, [])
            .map(({ node }) => {
              return `${node.data.title}: ${
                node.data.description && node.data.description.text
              }`
            })
            .join(',')
        }`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>
          {data.currentPreview && data.currentPreview.data.title}
        </InvisibleH1>
        <div className={styles.productContainer}>
          <div className={styles.filters}>
            {typeof location != 'undefined' && (
              <PreviewFilters
                data={data}
                location={location}
                currentPreview={`/previews/${
                  data.currentPreview && data.currentPreview.uid
                }`}
              />
            )}
          </div>
          <ProductsContainer>
            {data.products.edges.length > 0 ? (
              data.products.edges.map(({ node }) => {
                return (
                  <div className={styles.product}>
                    <Link
                      to={`/previews/${
                        data.currentPreview && data.currentPreview.uid
                      }/${
                        node.data.product_category &&
                        node.data.product_category.uid
                      }/${
                        node.data.product_family && node.data.product_family.uid
                      }?product=${node.uid}`}
                    >
                      {node.data.images.length > 0 &&
                        node.data.images[0].image &&
                        node.data.images[0].image.localFile &&
                        node.data.images[0].image.localFile.childImageSharp &&
                        node.data.images[0].image.localFile.childImageSharp
                          .fluid && (
                          <ProductThumbnail
                            image={
                              node.data.images[0].image.localFile
                                .childImageSharp.fluid
                            }
                            alt={node.data.images[0].image.alt}
                          />
                        )}
                    </Link>
                  </div>
                )
              })
            ) : (
              <ComingSoon />
            )}
          </ProductsContainer>
        </div>
      </div>
      <div className={styles.navFooterContainer}>
        <NavFooterDesktop />
        <ul className={styles.otherLinks}>
          <li>
            <Link
              to={`/previews/${
                data.currentPreview && data.currentPreview.uid
              }/all`}
            >
              view all
            </Link>
          </li>
        </ul>
      </div>
      <NavFooterMobile />
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query PreviewAllPageQuery($uid: String!) {
    currentPreview: prismicPreview(uid: { eq: $uid }) {
      uid
      data {
        title
      }
    }
    products: allPrismicPreviewProduct(
      filter: { data: { preview: { uid: { eq: $uid } } } }
    ) {
      edges {
        node {
          data {
            title
            description {
              text
            }
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
    productCategories: allPrismicPreviewProductCategory(
      filter: { data: { preview: { uid: { eq: $uid } } } }
    ) {
      edges {
        node {
          data {
            product_category
          }
          uid
        }
      }
    }
  }
`

export default PreviewAllPage
