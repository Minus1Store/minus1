import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styles from './privacy.module.scss'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import NavFooterMobile from '../../../components/NavFooterMobile'
import CartPopUp from '../../../components/CartPopUp'
import SEO from '../../../components/SEO'
import NavFooterMobile2 from '../../../components/NavFooterMobile2'

const PrivacyPage = ({ location }) => {
  const [cart, setCart] = useState([])

  const data = useStaticQuery(graphql`
    query PrivacyPageQuery {
      privacy: prismicShopPrivacy {
        data {
          privacy_body {
            html
            text
          }
        }
      }
    }
  `)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
      }
    }
  }, [])

  return (
    <PageLayout>
      <SEO
        titleTemplate={'%s | Privacy Policy'}
        url={location.href}
        description={data.privacy.data.privacy_body.text}
      />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          {cart.length > 0 && (
            <div className={styles.cartContainer}>
              <CartPopUp cart={cart} />
            </div>
          )}
          <div
            className={styles.termsContainer}
            dangerouslySetInnerHTML={{
              __html: data.privacy.data.privacy_body.html,
            }}
          ></div>
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

export default PrivacyPage
