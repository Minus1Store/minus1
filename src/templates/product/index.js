import React, {useState, useEffect} from 'react'
import Image from 'gatsby-image'
import {graphql, Link} from 'gatsby'
import queryString from 'query-string'
import ReactImageMagnify from '@milosmladenovicwork/react-image-magnify'

import PageLayout from '../../components/PageLayout'
import styles from './product-page.module.scss'
import NavFooterMobile from '../../components/NavFooterMobile'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import ShopThumbnails from '../../components/ShopThumbnails'
import SiteTree from '../../components/SiteTree'
import CartPopUp from '../../components/CartPopUp'
import SEO from '../../components/SEO'

const ProductPage = ({data, location}) => {

    const [mainImageNum, setMainImageNum] = useState(0)
    const [parsedQuery, setParsedQuery] = useState(queryString.parse(location.search))
    const [selectedSize, setSelectedSize] = useState(data.product.data.sizes && data.product.data.sizes[0].size.document && data.product.data.sizes[0].size.document.data.title)
    const [alreadySelected, setAlreadySelected] = useState(false)
    const [cart, setCart] = useState([])
    const [nextLink, setNextLink] = useState(nextProductLink(data.product.uid, data.allSubcategoryProducts.edges, data.allCategoryProducts.edges))

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
    
    useEffect(() => {
      if(localStorage.getItem('cart')){
        setCart(JSON.parse(localStorage.getItem('cart')))
      }else{
        setCart([])
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addProductToCart = () => {
      if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart') !== null){
          let prevState = [...cart]
          let product = {...data.product}
          product.size = selectedSize
          product.quantity = 1
          let newArray = [...prevState, product]
          setCart(newArray)
        }else{
          let product = {...data.product}
          product.size = selectedSize
          product.quantity = 1
          setCart([product])
        }
      }
    }

    useEffect(() => {
      if(localStorage.getItem('cart')){
        let cartItems = [...cart]
        let thisProducts = cartItems.filter(item => item.uid == data.product.uid)
        if(thisProducts.findIndex(item => item.size == selectedSize) !== -1){
          setAlreadySelected(true)
        }else{
          setAlreadySelected(false)
        }
      }
    }, [cart, selectedSize])

    function nextProductLink(productUID, primaryProducts, secondaryProducts){
      if(primaryProducts.length > 0){
        let productIndex = primaryProducts.findIndex(product => product.node.uid == productUID)

        if(productIndex >= 0){
          let nextProductIndex = productIndex + 1
          if(nextProductIndex < primaryProducts.length){
            return `/shop/${primaryProducts[nextProductIndex].node.data.product_category.uid}/${primaryProducts[nextProductIndex].node.uid}`
          }else{
            return false
          }
        }else{
          return false
        }
      }else if(secondaryProducts.length > 0){
        let productIndex = secondaryProducts.findIndex(product => product.node.uid == productUID)
        
        if(productIndex >= 0){
          let nextProductIndex = productIndex + 1
          if(nextProductIndex < secondaryProducts.length){
            return `/shop/${secondaryProducts[nextProductIndex].node.data.product_category.uid}/${secondaryProducts[nextProductIndex].node.uid}`
          }else{
            return false
          }
        }else{
          return false
        }
      }else{
        return false
      }
    }

    return(
        <PageLayout>
            <SEO titleTemplate={`%s | Product ${data.product.data.title} ${data.product.data.color_name}`} url={location.href} description={`Product ${data.product.data.title}. Color ${data.product.data.color_name}. Price €${data.product.data.price}. About product: ${data.product.data.description && data.product.data.description.text}. Sizes: ${data.product.data.sizes && data.product.data.sizes.map(({size}) => size).join(',')}`}/>
            <div className={styles.pageWrapper}>
              <div className={styles.mainImageContainer}>
                {
                  data.product.data.images && data.product.data.images[mainImageNum] &&
                  <ReactImageMagnify
                    smallImage={
                      {
                        alt:data.product.data.images[mainImageNum].image.alt,
                        isFluidWidth:true,
                        src: data.product.data.images[mainImageNum].image.localFile.url
                      }
                    }
                    largeImage={
                      {
                        width:800,
                        height:800,
                        src: data.product.data.images[mainImageNum].image.localFile.url
                      }
                    }
                    className={styles.mainZoomedImage}
                  />
                }
              </div>
              <div className={styles.informationContainer}>
                <div className={styles.title}>
                  {data.product.data.title}
                </div>
                <div className={styles.color}>
                  {data.product.data.color_name}
                </div>
                {
                  data.product.data.description &&
                  <div className={styles.description} dangerouslySetInnerHTML={{__html:data.product.data.description.html}}></div>
                }
                <div className={styles.productThumbnails}>
                  <ShopThumbnails data={data} location={location}/>
                </div>
                <div className={styles.price}>
                  €{data.product.data.price}
                </div>
                <div className={styles.row}>
                  <div className={styles.sizes}>
                    {
                      data.product.data.sizes.length > 0 &&
                      <select name='size' onChange={(e) => setSelectedSize(e.target.value)}>
                        {data.product.data.sizes.map(({size}) => {
                          if(size.document){
                            return <option value={size.document.data.title}>{size.document.data.title}</option>
                          }
                        })}
                      </select>
                    }
                  </div>
                  {
                    nextLink &&
                    <Link to={nextLink} className={styles.link}>
                      next {(data.product.data.product_subcategory.document && data.product.data.product_subcategory.document.data.product_subcategory) || (data.product.data.product_category.document && data.product.data.product_category.document.data.product_category)} &gt;
                    </Link>
                  }
                </div>
                <div className={styles.actionButtons}>
                  {
                    data.product.data.sizes &&
                    data.product.data.sizes.find(size => {
                      if(size.size.document && size.size.document.data){
                        size.size.document.data.title == selectedSize
                      }
                    }) && data.product.data.sizes.find(size => {
                      if(size.size.document && size.size.document.data){
                        size.size.document.data.title == selectedSize
                      }
                    }).quantity <= 0 ?
                  <div>
                    <SecondaryButton text={'sold out'} disabled={true}/>
                  </div>
                    :  
                  <div onClick={() => !alreadySelected && addProductToCart()}>
                    <PrimaryButton text={alreadySelected ? `in basket` : `add to basket`} disabled={alreadySelected ? true : false}/>
                  </div>
                  }
                  <div>
                    <Link to={'/shop/all'}>
                      <SecondaryButton text='keep shopping'/>
                    </Link>
                  </div>
                </div>
              </div>
              {cart.length > 0 &&
                <div className={styles.cartContainer}>
                  <CartPopUp cart={cart}/>
                </div>
              }
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
  query ProductBySlug($uid: String!, $family_uid: String!, $category_uid: String!, $subcategory_uid: String) {
    product:prismicProduct(uid: { eq: $uid }) {
        uid
        data {
            color_name
            description {
              html
              text
            }
            images {
              image {
                alt
                localFile {
                  url
                  childImageSharp {
                    fluid(maxWidth: 900, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            product_category{
              uid
              document{
                ... on PrismicProductCategory{
                  data{
                    product_category
                  }
                }
              }
            }
            product_subcategory{
              document{
                ... on PrismicProductSubcategory {
                  data{
                    product_subcategory
                  }
                }
              }
            }
            product_family{
              uid
            }
            price
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
            title
          }
    }
    allCategoryProducts: allPrismicProduct(filter: {data: {product_category: {uid: {eq: $category_uid}}}}){
      edges{
        node{
          uid
          data{
            product_category{
              uid
            }
          }
        }
      }
    }
    allSubcategoryProducts: allPrismicProduct(filter: {data: {product_subcategory: {uid: {eq: $subcategory_uid}}}}){
      edges{
        node{
          uid
          data{
            product_category{
              uid
            }
          }
        }
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