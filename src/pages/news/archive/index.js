import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'

import PageLayout from '../../../components/PageLayout'
import NavFooterMobile from '../../../components/NavFooterMobile'
import NavFooterDesktop from '../../../components/NavFooterDesktop'
import styles from './archive.module.scss'

const Archive = () => {

    const data = useStaticQuery(graphql`
    query NewsArchiveQuery {
        newsArticles:allPrismicNewsArticle(sort:{fields:[data___date], order:DESC}) {
          edges {
              node {
                uid
                data {
                    date(formatString: "DD[/]MM[/]YYYY")
                    title
                }
            }
          }
        }
      }
    `)

    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <h2 className={styles.sectionTitle}>news archive</h2>
                <div className={styles.newsContainer}>
                    {data.newsArticles.edges.map(({node}) => {
                        return <p className={styles.article}>
                            <Link to={`/news/${node.uid}`}>
                                {node.data.date}: {node.data.title}
                            </Link>
                        </p>
                    })}
                </div>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
    )
}

export default Archive