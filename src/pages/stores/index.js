import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import PageLayout from '../../components/PageLayout'
import styles from './stores.module.scss'
import StoreItem from '../../components/StoreItem'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'
import SEO from '../../components/SEO'
import InvisibleH1 from '../../components/InvisibleH1'

const Stores = ({ location }) => {
  const data = useStaticQuery(graphql`
    query StoresQuery {
      stores: allPrismicStore {
        edges {
          node {
            data {
              address
              email_button {
                button_link
                button_text
              }
              map_geolocation {
                latitude
                longitude
              }
              store_cover {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              telephone_information
              title
              view_map_button {
                button_link {
                  url
                }
                button_text
              }
              working_hours {
                html
                text
              }
            }
          }
        }
      }
    }
  `)

  return (
    <PageLayout>
      <SEO
        titleTemplate={'%s | Stores'}
        url={location.href}
        description={`${
          data.stores.edges.length > 0 &&
          data.stores.edges
            .map(({ node }) => {
              return `Store: ${node.data.title}. Location: ${node.data.address}. Phone Number: ${node.data.telephone_information}. Working hours: ${node.data.working_hours.text}`
            })
            .join(',')
        }`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>Minus1 Store Locations</InvisibleH1>
        <div className={styles.storesContainer}>
          {data.stores &&
            data.stores.edges.length > 0 &&
            data.stores.edges.map(({ node }, index) => {
              return <StoreItem data={node.data} key={index} />
            })}
        </div>
      </div>

      <NavFooterMobile />
      <div className={styles.navFooterContainer}>
        <NavFooterDesktop />
      </div>
    </PageLayout>
  )
}

export default Stores
