import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import Image from 'gatsby-image'

import styles from './preview-category.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'
import PreviewFilters from '../../components/PreviewFilters'
import ProductsContainer from '../../components/ProductsContainer'
import ProductThumbnail from '../../components/ProductThumbnail'
import SEO from '../../components/SEO'

const PreviewCategoryPage = ({location, data}) => {
    return (
        <PageLayout>
            <SEO titleTemplate={`%s | Preview ${data.productCategories.edges[0].node.data.product_category}`} url={location.href} description={`${data.productCategories.edges[0].node.data.product_category} Preview. ${data.products.edges.reduce((accumulator, currentValue) => {
                    if(accumulator){
                        return accumulator.find(item => item.node.data.product_family.uid == currentValue.node.data.product_family.uid) ? [...accumulator] : [...accumulator, currentValue]
                    }else{
                        return [currentValue]
                    }
            }, []).map(({node}) => {
                return `${node.data.title}: ${node.data.description.text}`
            }).join(',')}`}/>
            <div className={styles.pageWrapper}>
                <div className={styles.productContainer}>
                    <div className={styles.filters}>
                        {
                            typeof location != 'undefined' &&
                            <PreviewFilters data={data} location={location} currentPreview={`/previews/${data.currentPreview.uid}`}/>
                        }
                    </div>
                    <ProductsContainer>
                        {data.products && data.products.edges.map(({node}) => {
                            return <div className={styles.product}>
                                <Link to={`/previews/${data.currentPreview.uid}/${node.data.product_category.uid}/${node.data.product_family.uid}?product=${node.uid}`}>
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
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
                <ul className={styles.otherLinks}>
                    <li>
                        <Link to={`/previews/${data.currentPreview.uid}/all`}>
                            view all
                        </Link>
                    </li>
                </ul>
            </div>
            <NavFooterMobile/>
        </PageLayout>
    )
} 

export const pageQuery = graphql`
  query PreviewProductsBySlug($uid: String!, $preview_uid: String!) {
    currentPreview: prismicPreview(uid:{eq:$preview_uid}){
        uid
    }
    productCategories:allPrismicPreviewProductCategory(filter:{data:{preview:{uid:{eq:$preview_uid}}}}){
        edges{
            node{
                uid
                data{
                    product_category
                }
            }
        }
    }
    products:allPrismicPreviewProduct(filter: {data: {product_category: {uid: {eq: $uid}}}}) {
        edges {
          node {
            data {
              title
              description{
                  text
              }
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
              product_family{
                  uid
              }
              product_category{
                  uid
              }
            }
            uid
          }
        }
      }
}
`

export default PreviewCategoryPage