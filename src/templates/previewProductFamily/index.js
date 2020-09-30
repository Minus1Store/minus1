import React, {useEffect, useState} from 'react'
import {Link, graphql, navigate} from 'gatsby'
import Image from 'gatsby-image'

import styles from './preview-product.module.scss'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header/index'
import TooltipSlider from '../../components/TooltipSlider'
import swiperArrow from '../../img/test/right-arrow.svg'
import queryString from 'query-string'
import SEO from '../../components/SEO'

const PreviewProductPage = ({data, location}) => {

    const [clickedThumbnail, setClickedThumbnail] = useState(0)
    const [imageClicked, setImageClicked] = useState(true)
    const [activeProduct, setActiveProduct] = useState(undefined)
    const [slideUID, setSlideUID] = useState([])

    let productImages = () => {

        let imageArray = []

        data.previewProducts.edges.forEach(({node}) => {
            node.data.images.forEach(image => imageArray.push(image))
        })

        return imageArray
    }

    let productDescriptions = () => {
        let descriptionArray = []

        data.previewProducts.edges.forEach(({node}) => {
            node.data.images.forEach(() => {
                descriptionArray.push({data:node.data, uid:node.uid})
        })
        })

        return descriptionArray
    }

    useEffect(() => {
        let slideUIDs = []

        data.previewProducts.edges.forEach(({node}) => {
            node.data.images.forEach(() => {
                slideUIDs.push(node.uid)
            })
        })

        setSlideUID(slideUIDs)
    }, [])

    useEffect(() => {
        setActiveProduct(productDescriptions()[clickedThumbnail].uid)
    }, [clickedThumbnail])

    useEffect(() => {
        navigate(`${location.pathname}?product=${activeProduct}`, {replace:true})
    }, [activeProduct])

    useEffect(() => {
        let productUID = queryString.parse(location.search).product

        let automaticClickedThumbnail = slideUID.findIndex(uid => {
            return uid == productUID
        })
        
        if(automaticClickedThumbnail !== -1){
            setClickedThumbnail(automaticClickedThumbnail)
        }
    }, [slideUID])

    return(
        <PageLayout showHeader={false}>
            <SEO titleTemplate={`%s | Preview ${productDescriptions()[0].data.title}`} url={location.href} description={`Preview for ${productDescriptions()[0].data.title}. Products: ${data.previewProducts.edges.map(({node}) => {
                return `${node.data.title}: ${node.data.description.text}`
            }).join(',')}`}/>
            <div className={styles.mobileLogo}>
                <Header/>
            </div>
            <div className={styles.pageWrapper}>
                <div className={styles.slider}>
                    <TooltipSlider images={productImages()} clickedThumbnail={clickedThumbnail} setClickedThumbnail={setClickedThumbnail} setImageClicked={setImageClicked}/>
                </div>
                <div className={styles.lookBookHeader}>
                    <div>
                        <div className={styles.desktopLogo}>
                            <Header/>
                        </div>
                        <div className={styles.lookBookItemInformation}>
                            {productDescriptions().map(({data, uid}, index) => {
                                if(index == clickedThumbnail){
                                    return <React.Fragment>
                                        <h2 className={styles.lookBookTitle}>
                                            {data.title}
                                        </h2>
                                        <div className={styles.lookBookBody} dangerouslySetInnerHTML={{__html:data.description.html}}></div>
                                    </React.Fragment>
                                }
                            })}
                        </div>
                    </div>
                    <div>
                        <div className={styles.navigationStatus}>
                            <img onClick={() => {
                                if(clickedThumbnail > 0){
                                    setClickedThumbnail(prevState => prevState - 1)
                                }
                            }} className={`${styles.swiperPrevEl} ${clickedThumbnail == 0 && styles.invisible}`} src={swiperArrow} alt='prev slide' />
                            {clickedThumbnail + 1} of {productImages().length}
                            <img onClick={() => {
                                if(productImages().length - 1 > clickedThumbnail){
                                    setClickedThumbnail(prevState => prevState + 1)
                                }
                            }} className={`${styles.swiperNextEl} ${clickedThumbnail == productImages().length - 1 && styles.invisible}`} src={swiperArrow} alt='next slide'/>
                        </div>
                        <div className={styles.navigationButton} onClick={() => window && window.history.back()}>
                            back
                        </div>
                    </div>
                </div>
            </div>
            {
            !imageClicked && 
            <div className={styles.imagePopUp}>
                <div className={styles.image} onClick={() => setImageClicked(true)}>
                    <Image fluid={productImages()[clickedThumbnail].image.localFile.childImageSharp.fluid} alt={productImages()[clickedThumbnail].image.localFile.childImageSharp.fluid}/>
                </div>
            </div>
            }
        </PageLayout>
    )
}

export const pageQuery = graphql`
    query PreviewProductFamilyPageQuery($uid: String!){
        previewProducts:allPrismicPreviewProduct(filter:{data:{product_family:{uid:{eq:$uid}}}}){
            edges{
                node{
                    uid
                    data{
                        title
                        description{
                            html
                            text
                        }
                        preview{
                            uid
                        }
                        product_category{
                            uid
                        }
                        images{
                            image{
                                localFile{
                                    childImageSharp{
                                        fluid(maxHeight:1080){
                                            ...GatsbyImageSharpFluid
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

export default PreviewProductPage