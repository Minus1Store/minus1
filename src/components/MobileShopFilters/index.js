import React, { useState, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useQueryParam, StringParam } from "use-query-params";

import styles from './mobile-shop-filters.module.scss'
import CartPopUp from '../../components/CartPopUp'
import ShopFilterLink from '../ShopFilterLink'

const MobileShopFilters = ({ location, children, onClick}) => {
  const [cart, setCart] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [all, setAll] = useQueryParam("mobile", StringParam);

  const data = useStaticQuery(graphql`
    query MobileShopFiltersQuery {
      productCategories: allPrismicProductCategory {
        edges {
          node {
            uid
            data {
              product_category
            }
          }
        }
      }
      productSubcategories: allPrismicProductSubcategory {
        edges {
          node {
            uid
            data {
              position
              product_subcategory
              product_category {
                uid
              }
            }
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
    <div className={styles.filtersContainer}>
      {children}
      {cart.length > 0 && (
        <div className={styles.cartContainer}>
          <CartPopUp cart={cart} />
        </div>
      )}
      {/* <a
        onClick={() => setShowFilters((prevState) => !prevState)}
        className={styles.showFiltersButton}
      >
        {showFilters ? `hide filters -` : `show filters +`}
      </a> */}
      <div className={`${styles.filters} ${showFilters && styles.isVisible}`}>
        <Link
          to={'/shop/all'}
          className={location.pathname == '/shop/all' && styles.activeLink}
          onClick={(e) => {e.preventDefault();setAll('true')}}
        >
          all
        </Link>
        {data.productCategories &&
          data.productCategories.edges.length > 0 &&
          data.productCategories.edges
            .sort((edgeA, edgeB) => {
              return (
                Number(edgeA.node.data.product_category.length) -
                Number(edgeB.node.data.product_category.length)
              )
            })
            .map(({ node }) => {
              return (
                <ShopFilterLink node={node} location={location} data={data}/>
              )
            })}
      </div>
    </div>
  )
}

export default MobileShopFilters
