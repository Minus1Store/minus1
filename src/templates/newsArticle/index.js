import React from 'react'

import NewsArticle from '../../components/NewsArticle'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import styles from './news-article.module.scss'

const NewsArticlePage = ({data}) => {
    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <NewsArticle images={data.article.data.images} heading={data.article.data.title} date={data.article.data.date} body={data.article.data.body.html} showArchive={false}/>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
    )
}

export const pageQuery = graphql`
    query ArticleBySlug($uid: String!) {
        article:prismicNewsArticle(uid: { eq: $uid }) {
        data {
            date(formatString: "DD[/]MM[/]YYYY")
            images {
            image {
                localFile {
                childImageSharp {
                    fluid(maxWidth: 450, quality: 100){
                    ...GatsbyImageSharpFluid
                    }
                }
                }
            }
            }
            title
            body {
            html
            }
        }
        }
    }
`

export default NewsArticlePage