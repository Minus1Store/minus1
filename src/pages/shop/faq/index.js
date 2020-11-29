import React, {useState, useEffect} from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import styles from './faq.module.scss'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import NavFooterMobile from '../../../components/NavFooterMobile'
import CartPopUp from '../../../components/CartPopUp'
import SEO from '../../../components/SEO'
import NavFooterMobile2 from '../../../components/NavFooterMobile2'


const FAQPage = ({location}) => {

    const data = useStaticQuery(graphql`
        query FAQPageQuery{
            faq:prismicShopFaq {
                data {
                  faq_body {
                    html
                    text
                  }
                }
              }
        }
    `)

    const [cart, setCart] = useState([])

    useEffect(() => {
        if(typeof window !== 'undefined'){
          if(localStorage.getItem('cart')){
            setCart(JSON.parse(localStorage.getItem('cart')))
          }
        }
      }, [])

    return(
        <PageLayout>
            <SEO titleTemplate={'%s | F.A.Q.'} url={location.href} description={`${data.faq && data.faq.data.faq_body && data.faq.data.faq_body.text}`}/>
            <div className={styles.pageWrapper}>
                <div className={styles.content}>
                    {cart.length > 0 &&
                    <div className={styles.cartContainer}>
                        <CartPopUp cart={cart}/>
                    </div>
                    }
                    {
                        data.faq && data.faq.data.faq_body &&
                        <div className={styles.termsContainer} dangerouslySetInnerHTML={{__html:data.faq.data.faq_body.html}}>
                        </div>
                    }
                </div>
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
            <NavFooterMobile2/>
        </PageLayout>
    )
}

export default FAQPage