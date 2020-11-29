import React, { useState, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import styles from './shop-filters.module.scss'
import CartPopUp from '../../components/CartPopUp'

const ShopFilters = ({ location, children }) => {
  const [cart, setCart] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const data = useStaticQuery(graphql`
    query ShopFiltersQuery {
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
      <a
        onClick={() => setShowFilters((prevState) => !prevState)}
        className={styles.showFiltersButton}
      >
        {showFilters ? `hide filters -` : `show filters +`}
      </a>
      <div className={`${styles.filters} ${showFilters && styles.isVisible}`}>
        <Link
          to={'/shop/all'}
          className={location.pathname == '/shop/all' && styles.activeLink}
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
                <div
                  key={node.uid}
                  className={`${styles.categoryContainer} ${
                    location.pathname.match(
                      new RegExp(`\/shop\/${node.uid}`, 'g')
                    ) && styles.activeCategory
                  }`}
                >
                  <Link
                    to={`/shop/${node.uid}`}
                    className={
                      location.pathname == `/shop/${node.uid}` &&
                      styles.activeLink
                    }
                  >
                    {node.data.product_category}
                  </Link>
                  <div className={styles.subcategoriesContainer}>
                    {data.productSubcategories &&
                      data.productSubcategories.edges.length > 0 &&
                      data.productSubcategories.edges
                        .sort((edgeA, edgeB) => {
                          return (
                            Number(edgeA.node.data.product_subcategory.length) -
                            Number(edgeB.node.data.product_subcategory.length)
                          )
                        })
                        .filter(({ node: subcategoryNode }) => {
                          if (
                            (subcategoryNode.data.product_category &&
                              subcategoryNode.data.product_category.uid) ==
                            node.uid
                          ) {
                            return subcategoryNode
                          }
                        })
                        .map(
                          ({ node: subcategoryNode }) =>
                            subcategoryNode.data.product_subcategory && (
                              <Link
                                key={subcategoryNode.uid}
                                to={`/shop/${node.uid}/${subcategoryNode.uid}`}
                                className={`${styles.subcategoryLink} ${
                                  location.pathname.match(
                                    new RegExp(
                                      `\/shop\/${node.uid}\/${subcategoryNode.uid}`,
                                      'g'
                                    )
                                  ) && styles.activeLink
                                }`}
                              >
                                {subcategoryNode.data.product_subcategory}
                              </Link>
                            )
                        )}
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default ShopFilters
