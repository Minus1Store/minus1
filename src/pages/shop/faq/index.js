import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import styles from './faq.module.scss'
import PageLayout from '../../../components/PageLayout'
import SiteTree from '../../../components/SiteTree'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import NavFooterMobile from '../../../components/NavFooterMobile'

const FAQPage = () => {

    const data = useStaticQuery(graphql`
        query FAQPageQuery{
            faq:prismicShopFaq {
                data {
                  faq_body {
                    html
                  }
                }
              }
        }
    `)

    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.termsContainer} dangerouslySetInnerHTML={{__html:data.faq.data.faq_body.html}}>
                </div>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <SiteTree links={[{text: 'home',link:'/'}, {text: 'shop', link:'/shop/all'}]}/>
                <NavFooterDesktop
                    linksArray={
                        [
                            {
                                link:[
                                    {
                                        text:'view all',
                                        href:'/shop/all'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'sizing',
                                        href:'/shop/sizing'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'shipping',
                                        href:'/shop/shipping'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'terms',
                                        href:'/shop/terms'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'privacy',
                                        href:'/shop/privacy'
                                    }
                                ]
                            },
                            {
                                link:[
                                    {
                                        text:'f.a.q.',
                                        href:'/shop/faq'
                                    }
                                ]
                            },
                    ]
                    }
                />
            </div>
        </PageLayout>
    )
}

export default FAQPage