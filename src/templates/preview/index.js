import React from 'react'
import {graphql, Link} from 'gatsby'
import Image from 'gatsby-image'

import styles from './preview.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import SEO from '../../components/SEO'
import ComingSoon from '../../components/ComingSoon'

const PreviewPage = ({data, location}) => {

    return(
        <PageLayout>
            <SEO titleTemplate={`%s | ${data.currentPreview.data.title} Preview`} url={location.href} description={`${data.currentPreview.data.title} Preview. Our preview products: ${data.previewFamilies && data.previewFamilies.edges.map(({node}, index) =>
                node.data.family_name
            ).join(',')}`}/>
            <div className={styles.pageWrapper}>
                <ul className={styles.familyThumbnails}>
                    {data.previewFamilies.edges > 0 ? data.previewFamilies.edges.map(({node}, index) => { 
                        return <li key={index} className={styles.thumbnail}>
                            <Link to={`/previews/${node.data.preview.uid}/${node.data.product_category.uid}/${node.uid}`}>
                                <Image fluid={node.data.family_main_image.localFile.childImageSharp.fluid} alt={node.data.family_main_image.alt}/>
                            </Link>
                        </li>
                    })
                    :
                    <ComingSoon/>
                }
                </ul>
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
    query PreviewPageQuery($uid: String!){
        currentPreview:prismicPreview(uid:{eq:$uid}){
            uid
            data{
                title
            }
        }
        previewFamilies:allPrismicPreviewProductFamily(limit:36, filter: {data: {preview: {uid: {eq: $uid}}}}) {
            edges {
                node {
                  uid
                  data {
                    family_name
                    preview{
                        uid
                    }
                    product_category{
                        uid
                    }
                    family_main_image {
                      alt
                      localFile {
                        childImageSharp {
                          fluid(maxWidth:200, quality:100){
                              ...GatsbyImageSharpFluid
                          }
                        }
                      }
                    }
                  }
                  uid
                }
            }
        }
        lookbooks: allPrismicLookbook(sort: {order: DESC, fields: data___lookbook_date}, limit: 1){
            edges{
              node{
                uid
                data{
                    title
                    lookbook_date
                }
              }
            }
        }
    }
`


export default PreviewPage