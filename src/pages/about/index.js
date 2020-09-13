import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import PageLayout from '../../components/PageLayout'
import styles from './about.module.scss'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

const AboutPage = () => {

    const data = useStaticQuery(graphql`
    query AboutPageQuery {
        aboutPage:allPrismicAboutPage {
          edges {
            node {
              data {
                body {
                  html
                }
              }
            }
          }
        }
      }
      
    `)

    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.aboutContainer} dangerouslySetInnerHTML={{__html:data.aboutPage.edges[0].node.data.body.html}}>
                </div>
            </div>            
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
    )
}

export default AboutPage