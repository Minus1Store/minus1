import { graphql, Link } from 'gatsby'
import React from 'react'
import Image from 'gatsby-image'

import PageLayout from '../../components/PageLayout'
import styles from './lookbook.module.scss'
import Header from '../../components/Header/index'

const LookbookPage = ({data}) => {
    return(
        <PageLayout showHeader={false}>
            <div className={styles.pageWrapper}>
                <div className={styles.lookBookMainImage}>
                    <Image fluid={data.lookbookProducts.edges[0].node.data.product_image.localFile.childImageSharp.fluid} alt={data.lookbookProducts.edges[0].node.data.product_image.alt}/>
                    {data.lookbook}
                </div>
                <div className={styles.lookBookHeader}>
                    <div>
                        <Header/>
                        <div className={styles.lookBookItemInformation}>
                            {data.lookbookProducts.edges.map(({node}) => {
                                return <React.Fragment>
                                    <h2 className={styles.lookBookTitle}>
                                        {data.currentLookBook.data.title}
                                    </h2>
                                    <div className={styles.lookBookBody} dangerouslySetInnerHTML={{__html:node.data.description.html}}></div>
                                </React.Fragment>
                            })}
                        </div>
                    </div>
                    <div>
                        <ul className={styles.dropDownMenu}>
                            <li>archive
                                <ul>
                                    {data.lookBooks && data.lookBooks.edges.map(({node}) => {
                                        return <li>
                                            <Link to={`/lookbooks/${node.uid}`}>
                                                {node.data.title}
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <div className={styles.navigationButton}>
                            <Link to={'/'}>
                                back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export const pageQuery = graphql`
    query LookbookPageQuery($uid: String!){
        lookbookProducts:allPrismicLookbookProduct(filter: {data: {lookbook: {uid: {eq: $uid}}}}) {
            edges {
              node {
                data {
                  description {
                    html
                  }
                  product_image{
                      alt
                      localFile{
                          childImageSharp{
                              fluid(maxWidth:862, quality:100){
                                  ...GatsbyImageSharpFluid
                              }
                          }
                      }
                  }
                }
              }
            }
        }
        currentLookBook:prismicLookbook(uid:{eq: $uid}){
            data{
                title
            }
        }
        lookBooks: allPrismicLookbook(filter: {uid: {ne: $uid}}, sort: {order: DESC, fields: data___lookbook_date}) {
            edges {
              node {
                data {
                  title
                }
              }
            }
        }
    }
`

export default LookbookPage