import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, description, image, article, url, titleTemplate }) => {
  const data = useStaticQuery(graphql`
    query SEOQuery {
      seo: prismicSiteInformation {
        data {
          description
          image {
            localFile {
              url
            }
          }
          title
          title_template
          url {
            url
          }
        }
      }
    }
  `)

  const seo = {
    title: title || data.seo.data.title,
    titleTemplate: titleTemplate || data.seo.data.titleTemplate,
    description: description || data.seo.data.description,
    image: image || data.seo.data.image.localFile.url,
    url: url || data.seo.data.url.url,
  }

  return (
    <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      <link rel="icon" href={seo.image}></link>
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
      
      <html lang="en" />
    </Helmet>
  )
}

export default SEO
