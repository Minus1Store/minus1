import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import styles from './terms.module.scss'
import PageLayout from '../../../components/PageLayout'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import NavFooterMobile from '../../../components/NavFooterMobile'
import SiteTree from '../../../components/SiteTree'

const TermsPage = () => {

    const data = useStaticQuery(graphql`
        query TermsPageQuery{
            terms:prismicShopTerms {
                data {
                  terms_body {
                    html
                  }
                }
              }
        }
    `)

    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.termsContainer} dangerouslySetInnerHTML={{__html:data.terms.data.terms_body.html}}>
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
                                        href:'/shop'
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

export default TermsPage