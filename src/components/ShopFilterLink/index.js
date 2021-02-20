import React, {useState} from 'react'
import {Link} from 'gatsby'

import styles from './shop-filter-link.module.scss'

const ShopFilterLink = ({node, location, data}) => {
  
  const [subcategoryOpened, setSubcategoryOpened] = useState(false)
  
  return(
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
        <span onClick={e => {
          e.preventDefault()
          setSubcategoryOpened(prevState => !prevState)
        }}>{subcategoryOpened ? '-' : '+'}</span>
      </Link>
      <div className={`${styles.subcategoriesContainer} ${subcategoryOpened && styles.subcategoryOpened}`}>
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
                    style={{
                      order: subcategoryNode.data.position
                        ? subcategoryNode.data.position
                        : '10000',
                    }}
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
}

export default ShopFilterLink