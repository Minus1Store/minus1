import React, { useState, useEffect } from 'react'
import { Link, graphql, useStaticQuery, navigate } from 'gatsby'
import { PayPalButton } from 'react-paypal-button-v2'

import CartContainer from '../../../components/CartContainer'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import CartHeaderItem from '../../../components/CartHeaderItem'
import styles from './confirmation.module.scss'
import CartHeader from '../../../components/CartHeader'
import SEO from '../../../components/SEO'
import CartProduct from '../../../components/CartProduct'
import NavFooterMobile2 from '../../../components/NavFooterMobile2'
import InvisibleH1 from '../../../components/InvisibleH1'

const CheckoutPage = ({ location }) => {
  const [confirmationData, setConfirmationData] = useState({})

  useEffect(() => {
    if (localStorage.getItem('confirmationData')) {
      setConfirmationData(JSON.parse(localStorage.getItem('confirmationData')))
    } else {
      setConfirmationData({})
    }
  }, [])

  console.log(confirmationData)

  return (
    <PageLayout>
      <SEO
        titleTemplate={'%s | Cart'}
        url={location.href}
        description={`Select your pay and shipping preferences in Minus1 shop checkout.`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>
          Minus1 Order Confirmation
        </InvisibleH1>
        <CartContainer>
          <CartHeader>
            <CartHeaderItem active={false}>
              <Link to="/shop/cart">View/edit basket</Link>
            </CartHeaderItem>
            <CartHeaderItem active={false}>
              <Link to="/shop/checkout">Shipping / Payment</Link>
            </CartHeaderItem>
            <CartHeaderItem active={true}>Confirmation</CartHeaderItem>
          </CartHeader>
          {confirmationData.cart && (
            <React.Fragment>
              <CartHeaderItem fullWidth={true} presentational={true}>
                <p className={styles.alignedLeft}>
                  Email has been sent to your email adress, happy shopping!
                  {/* Customer: {confirmationData.name} */}
                </p>
              </CartHeaderItem>
              <CartHeaderItem fullWidth={true} presentational={true}>
                <p className={styles.alignedLeft}>
                  You bought:
                  {/* Order ID: {confirmationData.id} */}
                </p>
              </CartHeaderItem>
              <div className={styles.cartBody}>
                <table className={styles.products}>
                  <tbody>
                    {confirmationData.cart.map((cartItem, index) => {
                      return (
                        <CartProduct
                          presentational={true}
                          key={index}
                          data={cartItem}
                        />
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {confirmationData.cart.length > 0 && (
                <div className={styles.cartSubtotal}>
                  <p>
                    You payed: €
                    {confirmationData.cart
                      .map((item) => item.data.price * item.quantity)
                      .reduce((total = 0, itemPrice) => {
                        return total + itemPrice
                      })}{' '}
                    + shipping
                  </p>
                </div>
              )}
              <div className={styles.cartFooter}>
                <p>
                  free shipping on all orders over €200, some exceptions may
                  apply.
                </p>
                <div className={styles.secondaryLink}>
                  <Link to={'/shop/all'}>keep shopping</Link>
                </div>
              </div>
            </React.Fragment>
          )}
        </CartContainer>
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

export default CheckoutPage
