const { create } = require('lodash')
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
  const newsArticleTemplate = require.resolve(
    './src/templates/newsArticle/index.js'
  )
  const productCategoryTemplate = require.resolve(
    './src/templates/productCategory/index.js'
  )
  const productSubcategoryTemplate = require.resolve(
    './src/templates/productSubcategory/index.js'
  )
  const lookbookTemplate = require.resolve('./src/templates/lookbook/index.js')
  const previewTemplate = require.resolve('./src/templates/preview/index.js')
  const previewAllTemplate = require.resolve(
    './src/templates/previewAll/index.js'
  )
  const previewCategoryTemplate = require.resolve(
    './src/templates/previewCategory/index.js'
  )
  const previewProductFamilyTemplate = require.resolve(
    './src/templates/previewProductFamily/index.js'
  )

  const result = await wrapper(
    graphql(`
      {
        products: allPrismicProduct {
          edges {
            node {
              uid
              data {
                product_category {
                  uid
                }
                product_subcategory {
                  uid
                }
                product_family {
                  uid
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
        productCategories: allPrismicProductCategory {
          edges {
            node {
              uid
            }
          }
        }
        productSubcategories: allPrismicProductSubcategory {
          edges {
            node {
              uid
              data {
                product_category {
                  uid
                }
              }
            }
          }
        }
        lookbooks: allPrismicLookbook {
          edges {
            node {
              uid
            }
          }
        }
        previews: allPrismicPreview {
          edges {
            node {
              uid
            }
          }
        }
        previewCategories: allPrismicPreviewProductCategory {
          edges {
            node {
              uid
              data {
                preview {
                  uid
                }
              }
            }
          }
        }
        previewFamilies: allPrismicPreviewProductFamily {
          edges {
            node {
              uid
              data {
                preview {
                  uid
                }
                product_category {
                  uid
                }
              }
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
    if (edge.node.data.product_category.uid) {
      const familyUID = edge.node.data.product_family.uid
        ? edge.node.data.product_family.uid
        : 'null'
      createPage({
        path: `/shop/${edge.node.data.product_category.uid}/${edge.node.uid}`,
        component: productTemplate,
        context: {
          // Pass the unique ID (uid) through context so the template can filter by it
          uid: edge.node.uid,
          category_uid: edge.node.data.product_category.uid,
          subcategory_uid: edge.node.data.product_subcategory.uid,
          family_uid: familyUID,
        },
      })
    }
  })

  let newsArticlesList = result.data.newsArticles.edges

  newsArticlesList.forEach((edge) => {
    createPage({
      path: `/news/${edge.node.uid}`,
      component: newsArticleTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
      },
    })
  })

  const productCategoriesList = result.data.productCategories.edges

  productCategoriesList.forEach((edge) => {
    createPage({
      path: `/shop/${edge.node.uid}`,
      component: productCategoryTemplate,
      context: {
        category_uid: edge.node.uid,
      },
    })
  })

  const productSubcategoriesList = result.data.productSubcategories.edges

  productSubcategoriesList.forEach((edge) => {
    createPage({
      path: `/shop/${edge.node.data.product_category.uid}/${edge.node.uid}`,
      component: productSubcategoryTemplate,
      context: {
        subcategory_uid: edge.node.uid,
      },
    })
  })

  const lookbookList = result.data.lookbooks.edges

  lookbookList.forEach((edge) => {
    createPage({
      path: `/lookbooks/${edge.node.uid}`,
      component: lookbookTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  const previewList = result.data.previews.edges

  previewList.forEach((edge) => {
    createPage({
      path: `/previews/${edge.node.uid}`,
      component: previewTemplate,
      context: {
        uid: edge.node.uid,
      },
    })

    createPage({
      path: `/previews/${edge.node.uid}/all`,
      component: previewAllTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  const previewCategoriesList = result.data.previewCategories.edges

  previewCategoriesList.forEach((edge) => {
    createPage({
      path: `/previews/${edge.node.data.preview.uid}/${edge.node.uid}`,
      component: previewCategoryTemplate,
      context: {
        uid: edge.node.uid,
        preview_uid: edge.node.data.preview.uid,
      },
    })
  })

  const previewProductFamilyList = result.data.previewFamilies.edges

  previewProductFamilyList.forEach((edge) => {
    createPage({
      path: `/previews/${edge.node.data.preview.uid}/${edge.node.data.product_category.uid}/${edge.node.uid}`,
      component: previewProductFamilyTemplate,
      context: {
        uid: edge.node.uid,
      },
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
