import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import styles from './nav-footer.module.scss'

const NavFooterMobile = () => {
  const data = useStaticQuery(graphql`
    query NavFooterMobileQuery {
      lookbooks: allPrismicLookbook(
        sort: { order: DESC, fields: data___lookbook_date }
        limit: 1
      ) {
        edges {
          node {
            uid
            data {
              title
              lookbook_date
            }
          }
        }
      }
      previews: allPrismicPreview(
        sort: { order: DESC, fields: data___preview_date }
        limit: 2
      ) {
        edges {
          node {
            uid
            data {
              title
              preview_date
            }
          }
        }
      }
    }
  `)

  return (
    <footer className={styles.navFooter}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to={'/news'}>news</Link>
          </li>
          <li>
            <Link to={`/previews/${data.previews.edges[0].node.uid}`}>
              preview
            </Link>
          </li>
          <li>
            <Link
              to={`/lookbooks/${
                data.lookbooks && data.lookbooks.edges[0].node.uid
              }`}
            >
              lookbook
            </Link>
          </li>
        </ul>
        <ul className={styles.navList}>
          <li>
            <Link to={'/shop/all'}>Shop</Link>
          </li>
          <li>
            <Link to={'/stores'}>stores</Link>
          </li>
          <li>
            <Link to={'/about'}>about</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default NavFooterMobile
