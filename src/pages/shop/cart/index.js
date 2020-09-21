import React from 'react'

import PageLayout from '../../../components/PageLayout'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import SiteTree from '../../../components/SiteTree'
import styles from './cart.module.scss'
import CartContainer from '../../../components/CartContainer'
import CartHeader from '../../../components/CartHeader'
import CartHeaderItem from '../../../components/CartHeaderItem'

const CartPage = () => {
    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <CartContainer>
                    <CartHeader>
                        <CartHeaderItem active={true}>
                            View/edit basket
                        </CartHeaderItem>
                        <CartHeaderItem disabled={true}>
                            Shipping / Payment
                        </CartHeaderItem>
                        <CartHeaderItem disabled={true}>
                            Confirmation
                        </CartHeaderItem>
                        <CartHeaderItem fullWidth={true} presentational={true}>
                            <p className={styles.cartCount}>
                                1 item in your basket
                            </p>
                        </CartHeaderItem>
                    </CartHeader>
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