import React, {useState, useEffect} from 'react'
import Image from 'gatsby-image'
import {graphql, Link} from 'gatsby'
import queryString from 'query-string'
import {useSpring, animated} from 'react-spring'

import PageLayout from '../../components/PageLayout'
import styles from './product-page.module.scss'
import NavFooterMobile from '../../components/NavFooterMobile'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import ShopThumbnails from '../../components/ShopThumbnails'
import SiteTree from '../../components/SiteTree'

const ProductPage = ({data, location}) => {

    const [mainImageNum, setMainImageNum] = useState(0)
    const [parsedQuery, setParsedQuery] = useState(queryString.parse(location.search))

    useEffect(() => {
      if(!parsedQuery.img){
        setMainImageNum(0)
      }else{
        setMainImageNum(parsedQuery.img)
      }
    }, [parsedQuery])

    useEffect(() => {
      setParsedQuery(queryString.parse(location.search))
    }, [location.search])


    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
              <div className={styles.mainImageContainer}>
                {data.product.data.images.map(({image}, index) => {
                  return <Image key={index} className={`${styles.mainImage} ${index == mainImageNum && styles.activeImage}`} fluid={image.localFile.childImageSharp.fluid} alt={image.alt}/>
                })}
              </div>
              <div className={styles.informationContainer}>
                <div className={styles.title}>
                  {data.product.data.title}
                </div>
                <div className={styles.color}>
                  {data.product.data.color_name}
                </div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html:data.product.data.description.html}}></div>
                <div className={styles.productThumbnails}>
                  <ShopThumbnails data={data} location={location}/>
                </div>
                <div className={styles.price}>
                  €{data.product.data.price}
                </div>
                <div className={styles.sizes}>
                  {
                    data.product.data.sizes.length > 0 &&
                    <select name='size'>
                      {data.product.data.sizes.map(({size}) => {
                        return <option value={size.document.data.title}>{size.document.data.title}</option>
                      })}
                    </select>
                  }
                </div>
                <div className={styles.actionButtons}>
                  <div>
                    <PrimaryButton text='add to basket' />
                  </div>
                  <div>
                    <SecondaryButton text='keep shopping'/>
                  </div>
                </div>
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

export const pageQuery = graphql`
  query ProductBySlug($uid: String!, $family_uid: String!) {
    product:prismicProduct(uid: { eq: $uid }) {
        data {
            color_name
            description {
              html
            }
            images {
              image {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 450, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            price
            sizes {
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
            title
          }
    }
    allFamilyProducts: allPrismicProduct(filter: {data: {product_family: {uid: {eq: $family_uid}}}}) {
      edges {
        node {
          uid
          data {
            images {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 150) {
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
        }
      }
    }
}
`

export default ProductPage