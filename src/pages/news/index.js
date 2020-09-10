import React, {useState, useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Scrollbar} from 'swiper'
import 'swiper/swiper.scss';

import Header from '../../components/Header/index'
import TimeString from '../../components/TimeString/index'
import styles from './news.module.scss'
import FadeImageSlider from '../../components/FadeImageSlider/index'
import {useSpring, animated} from 'react-spring'

import NewsArticle from '../../components/NewsArticle'
import scrollbarStyle from 'swiper/components/scrollbar/scrollbar.scss';
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

console.log(scrollbarStyle)

SwiperCore.use([Scrollbar]);

import slideImage1 from '../../img/test/11.jpg'
import slideImage2 from '../../img/test/12.jpg'
import slideImage3 from '../../img/test/13.jpg'
import slideImage4 from '../../img/test/14.jpg'
import slideImage5 from '../../img/test/15.jpg'
import slideImage6 from '../../img/test/16.jpg'
import slideImage7 from '../../img/test/17.jpg'
import slideImage8 from '../../img/test/18.jpg'
import slideImage9 from '../../img/test/19.jpg'
import slideImage10 from '../../img/test/20.jpg'

const News = () => {
    
    const [archiveOpened, setArchiveOpened] = useState(false)
    const [dummyNews, setDummyNews] = useState([{
        heading:'Supreme®/Nike®',
        images:[slideImage1, slideImage2]
    },
    {
        heading:'Test',
        images:[slideImage3, slideImage4, slideImage5, slideImage6, slideImage7]
    },
    {
        heading:'Test2',
        images:[slideImage8, slideImage9, slideImage10]
    }])
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
    
    const archiveButtonHandler = () => {
        setArchiveOpened(prevState => !prevState)
    }
    
 
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
                                    [{
                                        heading:'Supreme®/Nike®',
                                        images:[slideImage1, slideImage2]
                                    },
                                    {
                                        heading:'Test',
                                        images:[slideImage3, slideImage4, slideImage5, slideImage6, slideImage7]
                                    },
                                    {
                                        heading:'Test2',
                                        images:[slideImage8, slideImage9, slideImage10]
                                    }].map((item, index) => {
                                        if(index == 0){
                                            return <SwiperSlide key={index} className={`${styles.slide}`}>
                                                <div key={index}>
                                            <NewsArticle images={item.images} heading={item.heading} showArchive={index == 0} archiveButtonHandler={archiveButtonHandler}/>

                                                </div>
                                        </SwiperSlide>
                                        }else{
                                            return <SwiperSlide key={index} className={`${styles.slide}  ${!archiveOpened && styles.notVisible}`}>
                                            <div key={index}>
                                            <NewsArticle images={item.images} heading={item.heading} showArchive={index == 0} archiveButtonHandler={archiveButtonHandler}/>

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