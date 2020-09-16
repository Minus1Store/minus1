import React from 'react'
import {Link, useStaticQuery, graphql} from 'gatsby'

import styles from './shop-filters.module.scss'

const ShopFilters = ({location}) => {

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
        }      
    `)

    return(
        <div className={styles.filtersContainer}>
            <Link to={'/shop/all'} className={location.pathname == '/shop/all' && styles.activeLink}>
                all
            </Link>
            {data.productCategories.edges.map(({node}) => {
                return <Link to={`/shop/${node.uid}`} className={location.pathname == `/shop/${node.uid}` && styles.activeLink}>
                    {node.data.product_category}
                </Link>
            })}
        </div>
    )
}

export default ShopFilters