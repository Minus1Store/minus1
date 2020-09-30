require('dotenv').config({
  path: `.env`,
})

const prismicHtmlSerializer = require('./src/gatsby/htmlSerializer')

module.exports = {
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
          'shop_faq': require('./src/schemas/shop_faq.json'),
          'shop_shipping': require('./src/schemas/shop_shipping.json'),
          'lookbook': require('./src/schemas/lookbook.json'),
          'lookbook_product': require('./src/schemas/lookbook_product.json'),
          'preview': require('./src/schemas/preview.json'),
          'preview_product_category': require('./src/schemas/preview_product_category.json'),
          'preview_product_family': require('./src/schemas/preview_product_family.json'),
          'preview_product': require('./src/schemas/preview_product.json'),
          'sizing_item': require('./src/schemas/sizing_item.json'),
          'site_information': require('./src/schemas/site_information.json'),
        },
        shouldDownloadImage: ({ node, key, value }) => {
          return true
        },
        // Get the correct URLs in blog posts
        linkResolver: () => (doc) => {
          if(doc.type == 'product'){
            console.log(doc)
            if(doc.data){
              return `/shop/${doc.data.product_category.uid}/${doc.uid}`
            }
          }else{
            return `/${doc.uid}`
          }
        },
        fetchLinks: [
          'product.product_category'
        ],
        // PrismJS highlighting for labels and slices
        htmlSerializer: () => prismicHtmlSerializer
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:process.env.MAILCHIMP_ENDPOINT, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
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
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: website.googleAnalyticsID,
    //   },
    // },
    'gatsby-plugin-sitemap',
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: website.title,
    //     short_name: website.titleAlt,
    //     description: website.description,
    //     start_url: pathPrefix,
    //     background_color: website.backgroundColor,
    //     theme_color: website.themeColor,
    //     display: 'standalone',
    //     icon: website.favicon,
    //   },
    // },
    // Must be placed at the end
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
