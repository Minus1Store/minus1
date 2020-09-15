import React, {useState, useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Scrollbar} from 'swiper'
import 'swiper/swiper.scss';
import {useStaticQuery, graphql} from 'gatsby'


import styles from './news.module.scss'
import NewsArticle from '../../components/NewsArticle'
import scrollbarStyle from 'swiper/components/scrollbar/scrollbar.scss';
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

console.log(scrollbarStyle)

SwiperCore.use([Scrollbar]);

const News = () => {

    const data = useStaticQuery(graphql`
    query NewsArticlesQuery {
        newsArticles:allPrismicNewsArticle(sort:{fields:[data___date], order:DESC}) {
          edges {
            node {
              data {
                images {
                  image {
                    alt
                    localFile{
                        childImageSharp{
                            fluid(maxWidth:280, quality:100){
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                  }
                }
                date(formatString: "DD[/]MM[/]YYYY")
                title
                body {
                  html
                }
              }
            }
          }
        }
      }
    `)

    const [archiveOpened, setArchiveOpened] = useState(false)
    
    const archiveButtonHandler = () => {
        setArchiveOpened(prevState => !prevState)
    }

    console.log(data)
    
 
    return (
            <React.Fragment>
                    <PageLayout>
                        <div className={styles.pageWrapper}>

                            <div className={styles.overlay}>

                            </div>
                            <Swiper
                                slidesPerView={'auto'}
                                centeredSlides={true}
                                spaceBetween={30}
                                allowTouchMove={false}
                                scrollbar={{
                                    draggable: true,
                                    el:`.${styles.scrollbar}`
                                }}
                            >
                                {
                                    data.newsArticles.edges.map(({node}, index) => {
                                        
                                        let item = node.data;

                                        if(index == 0){
                                            return <SwiperSlide key={index} className={`${styles.slide}`}>
                                                <div key={index}>
                                            <NewsArticle images={item.images} heading={item.title} date={item.date} body={item.body.html} showArchive={index == 0} archiveButtonHandler={archiveButtonHandler}/>

                                                </div>
                                        </SwiperSlide>
                                        }else{
                                            return <SwiperSlide key={index} className={`${styles.slide}  ${!archiveOpened && styles.notVisible}`}>
                                            <div key={index}>
                                            <NewsArticle images={item.images} heading={item.title} date={item.date} body={item.body.html} showArchive={index == 0} archiveButtonHandler={archiveButtonHandler}/>

                                            </div>
                                        </SwiperSlide>
                                        }
                                    })
                                }
                            </Swiper>
                            <div className={`${styles.scrollbar} ${!archiveOpened && styles.notVisible}`}></div>
                        </div>
                        
                        <NavFooterMobile/>
                        <div className={styles.navFooterContainer}>
                            <NavFooterDesktop/>
                        </div>
                    </PageLayout>
            </React.Fragment>
    )
}

export default News