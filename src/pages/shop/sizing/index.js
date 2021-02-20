import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styles from './sizing.module.scss'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import NavFooterMobile from '../../../components/NavFooterMobile'
import CartPopUp from '../../../components/CartPopUp'
import SEO from '../../../components/SEO'
import ComingSoon from '../../../components/ComingSoon'
import NavFooterMobile2 from '../../../components/NavFooterMobile2'
import InvisibleH1 from '../../../components/InvisibleH1'

const ShippingPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query SizingPageQuery {
      sizingItems: allPrismicSizingItem {
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
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
      }
    }
  }, [])

  return (
    <PageLayout minimizedHeader>
      <SEO
        titleTemplate={'%s | Sizing'}
        url={location.href}
        description={`Here you can find and see what size match your taste for these products: ${
          data.sizingItems.edges.length > 0 &&
          data.sizingItems.edges
            .map(({ node }) => {
              if (
                node.data.body.length > 0 &&
                node.data.body[0].items.length > 0
              ) {
                return node.data.body[0].items[0].column
              } else {
                return ''
              }
            })
            .join(',')
        }`}
      />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          {cart.length > 0 && (
            <div className={styles.cartContainer}>
              <CartPopUp cart={cart} />
            </div>
          )}
          <div className={styles.termsContainer}>
            <InvisibleH1>Minus1 Product Sizing Disclaimer</InvisibleH1>
            {data.sizingItems.edges.length > 0 ? (
              data.sizingItems.edges.map((table, index) => {
                return (
                  <table className={styles.sizingItem} key={index}>
                    {table.node.data.body.length > 0 &&
                      table.node.data.body.map((row, index) => {
                        if (index == 0) {
                          return (
                            <tr>
                              {row.items.length > 0 &&
                                row.items.map((column, index) => {
                                  return <th key={index}>{column.column}</th>
                                })}
                            </tr>
                          )
                        } else {
                          return (
                            <tr>
                              {row.items.length > 0 &&
                                row.items.map((column, index) => {
                                  return <td key={index}>{column.column}</td>
                                })}
                            </tr>
                          )
                        }
                      })}
                  </table>
                )
              })
            ) : (
              <ComingSoon />
            )}
          </div>
        </div>
      </div>
      <div className={styles.navFooterContainer}>
        <SiteTree
          links={[
            { text: 'home', link: '/' },
            { text: 'shop', link: '/shop/all' },
          ]}
        />
        <NavFooterDesktop
          linksArray={[
            {
              link: [
                {
                  text: 'view all',
                  href: '/shop/all',
                },
              ],
            },
            {
              link: [
                {
                  text: 'sizing',
                  href: '/shop/sizing',
                },
              ],
            },
            {
              link: [
                {
                  text: 'shipping',
                  href: '/shop/shipping',
                },
              ],
            },
            {
              link: [
                {
                  text: 'terms',
                  href: '/shop/terms',
                },
              ],
            },
            {
              link: [
                {
                  text: 'privacy',
                  href: '/shop/privacy',
                },
              ],
            },
            {
              link: [
                {
                  text: 'f.a.q.',
                  href: '/shop/faq',
                },
              ],
            },
          ]}
        />
      </div>
      <NavFooterMobile2 />
    </PageLayout>
  )
}

export default ShippingPage
