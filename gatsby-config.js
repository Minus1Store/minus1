require('dotenv').config({
  path: `.env`,
})

const prismicHtmlSerializer = require('./src/gatsby/htmlSerializer')

const website = require('./config/website')

const pathPrefix = website.pathPrefix === '/' ? '' : website.pathPrefix

module.exports = {
  /* General Information */
  pathPrefix: website.pathPrefix,
  siteMetadata: {
    siteUrl: website.url + pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix,
    title: website.title,
    titleAlt: website.titleAlt,
    description: website.description,
    banner: website.logo,
    headline: website.headline,
    siteLanguage: website.siteLanguage,
    ogLanguage: website.ogLanguage,
    author: website.author,
    twitter: website.twitter,
    facebook: website.facebook,
  },
  /* Plugins */
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp', 
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'mladenovic',
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        schemas: {
          'home_page': require('./src/schemas/home_page.json'),
          'about_page': require('./src/schemas/about_page.json'),
          'news_article': require('./src/schemas/news_article.json'),
          'store': require('./src/schemas/store.json'),
          'logo': require('./src/schemas/logo.json'),
          'product_family': require('./src/schemas/product_family.json'),
          'product': require('./src/schemas/product.json'),
          'size': require('./src/schemas/size.json'),
          'product_category': require('./src/schemas/product_category.json'),
          'shop_terms': require('./src/schemas/shop_terms.json'),
          'shop_privacy': require('./src/schemas/shop_privacy.json'),
        },
        shouldDownloadImage: ({ node, key, value }) => {
          return true
        },
        // Get the correct URLs in blog posts
        linkResolver: () => (post) => `/${post.uid}`,
        // PrismJS highlighting for labels and slices
        htmlSerializer: () => prismicHtmlSerializer
      },
    },
    'gatsby-plugin-lodash',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Anonymous Pro\:100,200,300,400,500,600,700,800`, // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: website.googleAnalyticsID,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: website.title,
        short_name: website.titleAlt,
        description: website.description,
        start_url: pathPrefix,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: 'standalone',
        icon: website.favicon,
      },
    },
    // Must be placed at the end
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
