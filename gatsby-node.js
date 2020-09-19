const _ = require('lodash')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })
  
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const productTemplate = require.resolve('./src/templates/product/index.js')
  const newsArticleTemplate = require.resolve('./src/templates/newsArticle/index.js')
  const productCategoryTemplate = require.resolve('./src/templates/productCategory/index.js')
  const lookbookTemplate = require.resolve('./src/templates/lookbook/index.js')
  const previewTemplate = require.resolve('./src/templates/preview/index.js')

  const result = await wrapper(
    graphql(`
      {
        products:allPrismicProduct {
          edges {
            node {
              uid
              data {
                product_family {
                  document {
                    ... on PrismicProductFamily {
                      id
                      uid
                      data {
                        product_category {
                          document {
                            ... on PrismicProductCategory {
                              id
                              data {
                                product_category
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        newsArticles: allPrismicNewsArticle {
          edges {
            node {
              uid
            }
          }
        }
        productCategories: allPrismicProductCategory{
          edges{
            node{
              uid
            }
          }
        }
        lookbooks: allPrismicLookbook{
          edges{
            node{
              uid
            }
          }
        }
        previews: allPrismicPreview{
          edges{
            node{
              uid
            }
          }
        }
      }
    `)
  )

  // const categorySet = new Set()
  const productList = result.data.products.edges

  // Double check that the post has a category assigned
  // postsList.forEach((edge) => {
  //   if (edge.node.data.categories[0].category) {
  //     edge.node.data.categories.forEach((cat) => {
  //       categorySet.add(cat.category.document[0].data.name)
  //     })
  //   }
    productList.forEach((edge) => {


      createPage({
        path: `/shop/${edge.node.data.product_family.document.data.product_category.document.data.product_category.toLowerCase()}/${edge.node.uid}`,
        component: productTemplate,
        context: {
          // Pass the unique ID (uid) through context so the template can filter by it
          uid: edge.node.uid,
          family_uid: edge.node.data.product_family.document.uid
        },
      })
    })

    let newsArticlesList = result.data.newsArticles.edges

    newsArticlesList.forEach((edge) => {
      createPage({
        path: `/news/${edge.node.uid}`,
        component: newsArticleTemplate,
        context: {
          // Pass the unique ID (uid) through context so the template can filter by it
          uid: edge.node.uid
        },
      })
    })

    const productCategoriesList = result.data.productCategories.edges

    productCategoriesList.forEach(edge => {
      createPage({
        path:`/shop/${edge.node.uid}`,
        component: productCategoryTemplate,
        context:{
          category_uid: edge.node.uid
        }
      })
    })

    const lookbookList = result.data.lookbooks.edges

    lookbookList.forEach(edge => {
      createPage({
        path:`/lookbooks/${edge.node.uid}`,
        component: lookbookTemplate,
        context:{
          uid: edge.node.uid
        }
      })
    })

    const previewList = result.data.previews.edges

    previewList.forEach(edge => {
      createPage({
        path:`/previews/${edge.node.uid}`,
        component: previewTemplate,
        context:{
          uid: edge.node.uid
        }
      })
    })
    // The uid you assigned in Prismic is the slug!
    // const categoryList = Array.from(categorySet)
  
    // categoryList.forEach((category) => {
    //   createPage({
    //     path: `/categories/${_.kebabCase(category)}`,
    //     component: categoryTemplate,
    //     context: {
    //       category,
    //     },
    //   })
    // })
  }

