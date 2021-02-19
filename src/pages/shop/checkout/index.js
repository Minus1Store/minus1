import React, { useState, useEffect } from 'react'
import { Link, graphql, useStaticQuery, navigate } from 'gatsby'
import { PayPalButton } from 'react-paypal-button-v2'

import CartContainer from '../../../components/CartContainer'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import CartHeaderItem from '../../../components/CartHeaderItem'
import styles from './checkout.module.scss'
import CartHeader from '../../../components/CartHeader'
import SEO from '../../../components/SEO'
import PayOnArrivalForm from '../../../components/PayOnArrivalForm'
import PayWithCardForm from '../../../components/PayWithCardForm'
import PrimaryButton from '../../../components/PrimaryButton'
import NavFooterMobile2 from '../../../components/NavFooterMobile2'
import InvisibleH1 from '../../../components/InvisibleH1'

const CheckoutPage = ({ location }) => {
  const [payOnArrivalToggled, setPayOnArrivalToggled] = useState(false)
  const [payWithCard, setPayWithCard] = useState(false)
  const [cart, setCart] = useState([])
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setPrice(
      cart.length > 0 &&
        cart
          .map((item) => item.data.price * item.quantity)
          .reduce((total = 0, itemPrice) => {
            return total + itemPrice
          })
    )
  }, [cart])

  const data = useStaticQuery(graphql`
    query CheckoutQuery {
      allAvailableProducts: allPrismicProduct {
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
              product_category {
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
    products.forEach((product) => {
      let realProduct = data.allAvailableProducts.edges.find((realProduct) => {
        if (realProduct.node.uid == product.uid) {
          return true
        }
      })

      setCart(() => {
        let newArray = [...products]
        let cartProductIndex = newArray.findIndex((cartItem) => {
          if (cartItem.uid == product.uid) {
            return true
          }
        })
        let availableQuantity = realProduct.node.data.sizes.find(
          (size) => size.size.document.data.title == product.size
        ).quantity
        if (product.quantity > availableQuantity) {
          newArray[cartProductIndex].quantity = availableQuantity
        }
        newArray[cartProductIndex].data = realProduct.node.data
        return newArray
      })
    })
  }

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setRealInformation(JSON.parse(localStorage.getItem('cart')))
    } else {
      setCart([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const confirmationSet = (cart, name, id) => {
    localStorage.setItem('confirmationData', JSON.stringify({ cart, name, id }))
  }

  return (
    <PageLayout>
      <SEO
        titleTemplate={'%s | Cart'}
        url={location.href}
        description={`Select your pay and shipping preferences in Minus1 shop checkout.`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>Minus1 Shop Checkout</InvisibleH1>
        <CartContainer>
          <CartHeader>
            <CartHeaderItem active={false}>
              <Link to="/shop/cart">View/edit basket</Link>
            </CartHeaderItem>
            <CartHeaderItem active={true}>Shipping / Payment</CartHeaderItem>
            <CartHeaderItem disabled={true}>Confirmation</CartHeaderItem>
          </CartHeader>
          <div className={styles.cartBody}>
            {
              // <div onClick={() => setPayWithCard(prevState => !prevState)} className={styles.paymentMethodButton}>
              //     <PrimaryButton text='Pay with credit card'/>
              // </div>
            }
            {
              // cart.length > 0 && payWithCard &&
              //     <PayWithCardForm
              //         products={cart}
              //         price={price}
              //         totalPrice={totalPrice}
              //         setTotalPrice={setTotalPrice}
              //         onSuccess={() => {
              //             confirmationSet(cart, 'Buyer', '')
              //             localStorage.setItem('cart', JSON.stringify([]))
              //             setCart([])
              //             navigate('/shop/confirmation')
              //         }}
              //     />
              //     <PayPalButton
              //     amount={
              //     cart &&
              //     cart.reduce((a, b) => {
              //         console.log(a)
              //         return a + b.quantity * b.data.price
              //     }, 0)
              //     }
              //     createOrder={(data, actions) => {
              //     return actions.order.create({
              //         purchase_units: [
              //         {
              //             // invoice_id:'fsfsfs',
              //             amount: {
              //             value:
              //                 cart &&
              //                 cart.reduce((a, b) => {
              //                 return (
              //                     a + b.quantity * b.data.price
              //                 )
              //                 }, 0),
              //             currency_code: 'EUR',
              //             breakdown: {
              //                 item_total: {
              //                 currency_code: 'EUR',
              //                 value:
              //                     cart &&
              //                     cart.reduce((a, b) => {
              //                     return (
              //                         a +
              //                         b.quantity * b.data.price
              //                     )
              //                     }, 0),
              //                 },
              //             },
              //             },
              //             items: [
              //             ...cart.map((product) => {
              //                 return {
              //                 name: product.data.title,
              //                 quantity: product.quantity,
              //                 description: `${
              //                     product.size != undefined
              //                     ? 'Size:' +
              //                         product.size
              //                     : ''
              //                 }`,
              //                 sku: `/${product.data.product_category.uid}/${product.uid}`,
              //                 unit_amount: {
              //                     currency_code: 'EUR',
              //                     value: product.data.price,
              //                 },
              //                 }
              //             }),
              //             ],
              //         },
              //         ],
              //     })
              // }}
              // onApprove={(data, actions) => {
              //     actions.order.capture().then(function(details){
              //         console.log(details)
              //         confirmationSet(cart, details.payer.name.given_name, details.purchase_units[0].payments.captures[0].id)
              //         localStorage.setItem('cart', JSON.stringify([]))
              //         setCart([])
              //         navigate('/shop/confirmation')
              //     })
              // }}
              //     options={{
              //     clientId: process.env.GATSBY_PAYPAL_CLIENT_ID,
              //     currency: 'EUR',
              //     }}
              // />
            }
            {
              <div
                onClick={() =>
                  setPayOnArrivalToggled((prevState) => !prevState)
                }
                className={styles.paymentMethodButton}
              >
                <PrimaryButton text="Pay on arrival" />
              </div>
            }
            {cart.length > 0 && payOnArrivalToggled && (
              <PayOnArrivalForm
                products={cart}
                price={price}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                onSuccess={() => {
                  confirmationSet(cart, 'Buyer', '')
                  localStorage.setItem('cart', JSON.stringify([]))
                  setCart([])
                  setTimeout(() => {
                    navigate('/shop/confirmation')
                  }, 1000)
                }}
              />
            )}
          </div>
          {cart.length > 0 && (
            <div className={styles.cartSubtotal}>
              <p>total: €{totalPrice || price}</p>
            </div>
          )}
          <div className={styles.cartFooter}>
            <p>
              free shipping on all orders over €200, some exceptions may apply.
            </p>
            <div className={styles.secondaryLink}>
              <Link to={'/shop/all'}>keep shopping</Link>
            </div>
          </div>
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
