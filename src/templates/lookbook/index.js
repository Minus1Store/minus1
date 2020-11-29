import { graphql, Link } from 'gatsby'
import React, { useState, useEffect } from 'react'
import Image from 'gatsby-image'

import PageLayout from '../../components/PageLayout'
import styles from './lookbook.module.scss'
import Header from '../../components/Header/index'
import FadeImageSlider from '../../components/FadeImageSlider'
import SliderPopUp from '../../components/SliderPopUp'
import NavFooterMobile2 from '../../components/NavFooterMobile2'
import NavFooterMobile from '../../components/NavFooterMobile'
import SEO from '../../components/SEO'
import ComingSoon from '../../components/ComingSoon'

const LookbookPage = ({ data, location }) => {
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [clickedThumbnail, setClickedThumbnail] = useState(0)
  const [hoveredThumbnail, setHoveredThumbnail] = useState(undefined)
  const [imageClicked, setImageClicked] = useState(false)

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(clickedThumbnail)
    }
  }, [clickedThumbnail])

  return (
    <PageLayout showHeader={false}>
      <SEO
        titleTemplate={`%s | ${
          data.currentLookBook && data.currentLookBook.data.title
        } Lookbook`}
        url={location.href}
        description={`${
          data.currentLookBook && data.currentLookBook.data.title
        } Lookbook. Lookbook items: ${
          data.lookbookProducts &&
          data.lookbookProducts.edges.length > 0 &&
          data.lookbookProducts.edges
            .map(({ node }) => {
              if (node.data.description) {
                return node.data.description.text
              } else {
                return ''
              }
            })
            .join(',')
        }`}
      />
      <div className={styles.mobileLogo}>
        <Header />
      </div>
      <div className={styles.pageWrapper}>
        <div className={styles.lookBookImages}>
          {data.lookbookProducts.edges.length > 0 ? (
            <>
              <div
                className={styles.lookBookMainImage}
                onClick={() => setImageClicked(true)}
              >
                <FadeImageSlider
                  images={
                    data.lookbookProducts &&
                    data.lookbookProducts.edges.length > 0 &&
                    data.lookbookProducts.edges.map(({ node }) => ({
                      image: node.data.image,
                    }))
                  }
                  showNavigation={false}
                  setSwiperInstance={setSwiperInstance}
                  setClickedThumbnail={setClickedThumbnail}
                />
              </div>
              <div>
                <p className={styles.pagination}>
                  {hoveredThumbnail !== undefined ? (
                    <React.Fragment>
                      <span>{hoveredThumbnail + 1}</span> /{' '}
                      {data.lookbookProducts &&
                        data.lookbookProducts.edges.length > 0 &&
                        data.lookbookProducts.edges.map(({ node }) => ({
                          image: node.data.image,
                        })).length}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {clickedThumbnail + 1} /{' '}
                      {data.lookbookProducts &&
                        data.lookbookProducts.edges.length > 0 &&
                        data.lookbookProducts.edges.map(({ node }) => ({
                          image: node.data.image,
                        })).length}
                    </React.Fragment>
                  )}
                </p>
                <ul className={styles.lookBookThumbnails}>
                  {data.lookbookProducts &&
                    data.lookbookProducts.edges.length > 0 &&
                    data.lookbookProducts.edges.map(({ node }, index) => {
                      return (
                        <li
                          onClick={() => {
                            setClickedThumbnail(index)
                          }}
                          onPointerOver={() => setHoveredThumbnail(index)}
                          onPointerOut={() => setHoveredThumbnail(undefined)}
                          className={styles.thumbnail}
                          key={index}
                        >
                          <button>
                            {node.data.image &&
                              node.data.image.localFile &&
                              node.data.image.localFile.childImageSharp &&
                              node.data.image.localFile.childImageSharp
                                .fluid && (
                                <Image
                                  fluid={
                                    node.data.image.localFile.childImageSharp
                                      .fluid
                                  }
                                  alt={node.data.image.alt}
                                />
                              )}
                          </button>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </>
          ) : (
            <ComingSoon />
          )}
        </div>
        <div className={styles.lookBookHeader}>
          <div>
            <div className={styles.desktopLogo}>
              <Header />
            </div>
            <div className={styles.lookBookItemInformation}>
              {data.lookbookProducts &&
                data.lookbookProducts.edges.length > 0 &&
                data.lookbookProducts.edges.map(({ node }, index) => {
                  if (index == clickedThumbnail) {
                    return (
                      <React.Fragment>
                        <h2 className={styles.lookBookTitle}>
                          {data.currentLookBook.data.title}
                        </h2>
                        <div
                          className={styles.lookBookBody}
                          dangerouslySetInnerHTML={{
                            __html: node.data.description.html,
                          }}
                        ></div>
                      </React.Fragment>
                    )
                  }
                })}
            </div>
          </div>
          <div>
            <ul className={styles.dropDownMenu}>
              <li>
                archive
                <ul>
                  {data.lookBooks &&
                    data.lookBooks.edges.length > 0 &&
                    data.lookBooks.edges.map(({ node }) => {
                      return (
                        <li>
                          <Link to={`/lookbooks/${node.uid}`}>
                            {node.data.title}
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </li>
            </ul>
            <div className={styles.navigationButton}>
              <Link to={'/'}>back</Link>
            </div>
          </div>
        </div>
      </div>
      {imageClicked && (
        <SliderPopUp
          images={
            data.lookbookProducts &&
            data.lookbookProducts.edges.length > 0 &&
            data.lookbookProducts.edges.map(({ node }) => ({
              image: node.data.image,
            }))
          }
          clickedThumbnail={clickedThumbnail}
          setClickedThumbnail={setClickedThumbnail}
          setImageClicked={setImageClicked}
        />
      )}
      <NavFooterMobile2 />
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query LookbookPageQuery($uid: String!) {
    lookbookProducts: allPrismicLookbookProduct(
      filter: { data: { lookbook: { uid: { eq: $uid } } } }
    ) {
      edges {
        node {
          data {
            description {
              html
              text
            }
            image: product_image {
              alt
              localFile {
                childImageSharp {
                  fluid(maxWidth: 862, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    currentLookBook: prismicLookbook(uid: { eq: $uid }) {
      data {
        title
      }
    }
    lookBooks: allPrismicLookbook(
      filter: { uid: { ne: $uid } }
      sort: { order: DESC, fields: data___lookbook_date }
    ) {
      edges {
        node {
          uid
          data {
            title
          }
        }
      }
    }
  }
`

export default LookbookPage
