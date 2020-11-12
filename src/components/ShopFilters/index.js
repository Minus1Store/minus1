import React, {useState, useEffect} from 'react'
import {Link, useStaticQuery, graphql} from 'gatsby'

import styles from './shop-filters.module.scss'
import CartPopUp from '../../components/CartPopUp'

const ShopFilters = ({location, children}) => {

    const [cart, setCart] = useState([])

    const data = useStaticQuery(graphql`
        query ShopFiltersQuery {
            productCategories:allPrismicProductCategory {
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
        if(typeof window !== 'undefined'){
          if(localStorage.getItem('cart')){
            setCart(JSON.parse(localStorage.getItem('cart')))
          }
        }
      }, [])

    return(
        <div className={styles.filtersContainer}>
            {children}
            {cart.length > 0 &&
                <div className={styles.cartContainer}>
                    <CartPopUp cart={cart}/>
                </div>
            }
            <Link to={'/shop/all'} className={location.pathname == '/shop/all' && styles.activeLink}>
                all
            </Link>
            {data.productCategories && data.productCategories.edges.map(({node}) => {
                return <div className={`${styles.categoryContainer} ${location.pathname.match(new RegExp(`\/shop\/${node.uid}`, 'g')) && styles.activeCategory}`}>
                    <Link to={`/shop/${node.uid}`} className={location.pathname == `/shop/${node.uid}` && styles.activeLink}>
                        {node.data.product_category}
                    </Link>
                    {data.productSubcategories.edges.filter(({node:subcategoryNode}) => {
                      
                      if(subcategoryNode.data.product_category.uid == node.uid){
                        return subcategoryNode
                      }
                    }).map(({node:subcategoryNode}) => 
                      <Link to={`/shop/${node.uid}/${subcategoryNode.uid}`} className={`${styles.subcategoryLink} ${location.pathname.match(new RegExp(`\/shop\/${node.uid}\/${subcategoryNode.uid}`, 'g')) && styles.activeLink}`}>
                          {subcategoryNode.data.product_subcategory}
                      </Link>
                    )
                    }
                  </div>
            })}
        </div>
    )
}

export default ShopFilters