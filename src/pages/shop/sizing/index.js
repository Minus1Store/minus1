import React, {useState, useEffect} from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import styles from './sizing.module.scss'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import NavFooterMobile from '../../../components/NavFooterMobile'
import CartPopUp from '../../../components/CartPopUp'

const ShippingPage = () => {

    const data = useStaticQuery(graphql`
        query SizingPageQuery{
            sizingItems:allPrismicSizingItem {
                edges {
                  node {
                    data {
                      body {
                        __typename
                        ... on PrismicSizingItemBodyRow {
                          id
                          items {
                            column
                          }
                        }
                      }
                    }
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
            <div className={styles.pageWrapper}>
                <div className={styles.content}>
                    {cart.length > 0 &&
                    <div className={styles.cartContainer}>
                        <CartPopUp cart={cart}/>
                    </div>
                    }
                    <div className={styles.termsContainer}>
                        {
                            data.sizingItems.edges.map((table, index) => {
                                return <table className={styles.sizingItem} key={index}>
                                    {table.node.data.body.map((row, index) => {
                                        if(index == 0){
                                            return <tr>
                                                {row.items.map((column, index) => {
                                                    return <th key={index}>{column.column}</th>
                                                })}
                                            </tr>
                                        }else{
                                            return <tr>
                                                {row.items.map((column, index) => {
                                                    return <td key={index}>{column.column}</td>
                                                })}
                                            </tr>
                                        }
                                    })}
                                </table>
                            })
                        }
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

export default ShippingPage