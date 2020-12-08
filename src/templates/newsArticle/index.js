import React from 'react'
import { graphql } from 'gatsby'

import NewsArticle from '../../components/NewsArticle'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import styles from './news-article.module.scss'
import SEO from '../../components/SEO'
import InvisibleH1 from '../../components/InvisibleH1'

const NewsArticlePage = ({ data, location }) => {
  return (
    <PageLayout>
      <SEO
        titleTemplate={`%s | News: ${data.article && data.article.data.title}`}
        url={location.href}
        description={`Read about ${data.article && data.article.data.title}. ${
          data.article && data.article.data.body && data.article.data.body.text
        }`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>

        </InvisibleH1>
        {data.article && (
          <NewsArticle
            images={data.article.data.images}
            heading={data.article.data.title}
            date={data.article.data.date}
            body={data.article.data.body && data.article.data.body.html}
            showArchive={false}
            articlePage
          />
        )}
      </div>
      <NavFooterMobile />
      <div className={styles.navFooterContainer}>
        <NavFooterDesktop />
      </div>
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query ArticleBySlug($uid: String!) {
    article: prismicNewsArticle(uid: { eq: $uid }) {
      data {
        date(formatString: "DD[/]MM[/]YYYY")
        images {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 450, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        title
        body {
          text
          html
        }
      }
    }
  }
`

export default NewsArticlePage
