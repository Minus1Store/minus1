import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import PageLayout from '../../components/PageLayout'
import styles from './about.module.scss'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'
import SEO from '../../components/SEO'

const AboutPage = ({location}) => {

    const data = useStaticQuery(graphql`
    query AboutPageQuery {
        aboutPage:allPrismicAboutPage {
          edges {
            node {
              data {
                body {
                  html
                  text
                }
              }
            }
          }
        }
      }
      
    `)

    return(
        <PageLayout>
          <SEO titleTemplate={'%s | About'} url={location.href} description={data.aboutPage.edges.length > 0 && data.aboutPage.edges[0].node.data.body && data.aboutPage.edges[0].node.data.body.text}/>
          <div className={styles.pageWrapper}>
            {
              data.aboutPage.edges.length > 0 && data.aboutPage.edges[0].node.data.body &&
              <div className={styles.aboutContainer} dangerouslySetInnerHTML={{__html:data.aboutPage.edges[0].node.data.body.html}}>
              </div>
            }
          </div>            
          <NavFooterMobile/>
          <div className={styles.navFooterContainer}>
              <NavFooterDesktop/>
          </div>
        </PageLayout>
    )
}

export default AboutPage