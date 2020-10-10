import React, {useEffect, useState} from 'react'
import {Link, useStaticQuery, graphql} from 'gatsby'

import PageLayout from '../../../components/PageLayout'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import SiteTree from '../../../components/SiteTree'
import styles from './cart.module.scss'
import CartContainer from '../../../components/CartContainer'
import CartHeader from '../../../components/CartHeader'
import CartHeaderItem from '../../../components/CartHeaderItem'
import CartProduct from '../../../components/CartProduct'
import SEO from '../../../components/SEO'

const CartPage = ({location}) => {

    const [cart, setCart] = useState([])

    const data = useStaticQuery(graphql`
        query CartQuery{
            allAvailableProducts:allPrismicProduct {
                edges {
                  node {
                    uid
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
                        product_category{
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
                }
            }
        }
    `)

    const setRealInformation = (products) => {
        products.forEach(product => {
            let realProduct = data.allAvailableProducts.edges.find(realProduct => {
                if(realProduct.node.uid == product.uid){
                    return true
                }
            })
            
            setCart(() => {
                let newArray = [...products]
                let cartProductIndex = newArray.findIndex(cartItem => {
                    if(cartItem.uid == product.uid){
                        return true
                    }
                })
                let availableQuantity = realProduct.node.data.sizes.find(size => size.size.document.data.title == product.size).quantity
                if(product.quantity > availableQuantity){
                    newArray[cartProductIndex].quantity = availableQuantity
                }
                newArray[cartProductIndex].data = realProduct.node.data
                return newArray
                })
            })
            }
            
            useEffect(() => {
                if(localStorage.getItem('cart')){
                    setRealInformation(JSON.parse(localStorage.getItem('cart')))
                }else{
                    setCart([])
                }
            }, [])
            
            useEffect(() => {
                localStorage.setItem('cart', JSON.stringify(cart))
            }, [cart])

            const removeProduct = (product) => {
                let newArray = [...cart]
                let indexOfItem = newArray.findIndex(item => {
                    if(item.uid == product.uid && item.size == product.size){
                        return true
                    }else{
                        return false
                    }
                })
                
                if(indexOfItem !== -1){
                    newArray.splice(indexOfItem, 1)
                }
        setCart(newArray)
    }

    const setQuantity = (product, quantity) => {
        let newArray = [...cart]
        let indexOfItem = newArray.findIndex(item => {
            if(item.uid == product.uid && item.size == product.size){
                return true
            }else{
                return false
            }
        })
        if(indexOfItem !== -1){
            newArray[indexOfItem].quantity = quantity
        }

        setCart(newArray)
    }


    return(
        <PageLayout>
            <SEO titleTemplate={'%s | Cart'} url={location.href} description={`This is your own cart. Here will appear everything you want to buy from our site so feel free to find something you like.`}/>
            <div className={styles.pageWrapper}>
                <CartContainer>
                    <CartHeader>
                        <CartHeaderItem active={true}>
                            View/edit basket
                        </CartHeaderItem>
                        <CartHeaderItem disabled={cart.length <= 0 && true}>
                            {cart.length > 0 ?
                            <Link to='/shop/checkout'>
                                Shipping / Payment
                            </Link>
                            :
                            `Shipping / Payment`
                            }
                        </CartHeaderItem>
                        <CartHeaderItem disabled={true}>
                            Confirmation
                        </CartHeaderItem>
                        <CartHeaderItem fullWidth={true} presentational={true}>
                            <p className={styles.cartCount}>
                                {cart.length} {cart.length == 1 ? 'item' : 'items'} in your basket
                            </p>
                        </CartHeaderItem>
                    </CartHeader>
                    <div className={styles.cartBody}>
                        <table className={styles.products}>
                            <tbody>
                                {cart.map((cartItem, index) => {
                                    return <CartProduct key={index} removeProduct={removeProduct} data={cartItem} setQuantity={setQuantity}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                    {
                        cart.length > 0
                        &&
                        <div className={styles.cartSubtotal}>
                            <p>
                                subtotal: €{cart.map(item => item.data.price * item.quantity).reduce((total = 0, itemPrice) => {
                                return total + itemPrice
                            })}
                            </p>
                        </div>
                    }
                    <div className={styles.cartFooter}>
                        <p>free shipping on all orders over €200, some exceptions may apply.</p>
                        <div className={styles.secondaryLink}>
                            <Link to={'/shop/all'}>
                                keep shopping
                            </Link>
                        </div>
                        <div className={styles.primaryLink}>
                            <Link to={'/shop/checkout'}>
                                checkout now
                            </Link>
                        </div>
                    </div>
                </CartContainer>
            </div>
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

export default CartPage