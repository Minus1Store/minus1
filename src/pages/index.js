import React, {useEffect, useState} from 'react'
import Layout from '../layouts/index'
import HomeLinks from '../components/HomeLinks/index'
import Background from '../components/Background/index'
import Social from '../components/Social/index'
import {useSpring, animated} from 'react-spring'
import {useStaticQuery, graphql} from 'gatsby'

import backgroundImage from '../img/test/6.jpg'
import Header from '../components/Header/index'
import TimeString from '../components/TimeString/index'
import styles from './index.module.scss'
import SEO from '../components/SEO'

function Index({location}){

  const [startAnimation, setStartAnimation] = useState(false)

  const loadAnimation = useSpring({
    to:{
      opacity: startAnimation ? 1 : 0
    }
  })



  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true)
    }, 500)
  }, [])

  const data = useStaticQuery(graphql`
  query HomeBackground {
    background:allPrismicHomePage {
      edges {
        node {
          data {
            background_image {
              url
              localFile{
                childImageSharp{
                  fluid(maxWidth:1920, quality: 64){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `)

  return(
      <React.Fragment>
        <SEO titleTemplate={'%s | Home'} url={location.href}/>
        <animated.div style={loadAnimation} className={styles.pageWrapper}>
          <div className={styles.headerGroup}>
            <Header/>
            <TimeString className={styles.homeTimeString}/>
          </div>
          <HomeLinks/>
          {
            data.background && data.background.edges.length > 0 && data.background.edges[0].node.data.background_image && data.background.edges[0].node.data.background_image.localFile && data.background.edges[0].node.data.background_image.localFile.childImageSharp &&
            <Background image={data.background.edges[0].node.data.background_image.localFile.childImageSharp.fluid}/>
          }
          <Social/>  
        </animated.div>
      </React.Fragment>
  )
}

export default Index