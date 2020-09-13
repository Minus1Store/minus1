import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import PageLayout from '../../components/PageLayout'
import styles from './stores.module.scss'
import StoreItem from '../../components/StoreItem'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

const Stores = () => {

    const data = useStaticQuery(graphql`
    query StoresQuery {
        stores:allPrismicStore {
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
                  localFile{
                      childImageSharp{
                          fluid(maxWidth:600){
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
                }
              }
            }
          }
        }
      }          
    `)

     return (
     <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.storesContainer}>
                    {
                        data.stores.edges.map(({node}, index) => {
                            return <StoreItem data={node.data} key={index}/>
                        })
                    }
                </div>
            </div>
            
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
     )
}

export default Stores