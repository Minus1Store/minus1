import React, {useState, useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Scrollbar} from 'swiper'
import 'swiper/swiper.scss';

import Header from '../../components/Header/index'
import TimeString from '../../components/TimeString/index'
import styles from './news.module.scss'
import FadeImageSlider from '../../components/FadeImageSlider/index'

import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'
import NewsArticle from '../../components/NewsArticle'
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Scrollbar]);

import slideImage1 from '../../img/test/1.jpg'
import slideImage2 from '../../img/test/2.jpg'
import slideImage3 from '../../img/test/3.jpg'

const News = () => {
    
    const [archiveOpened, setArchiveOpened] = useState(false)
    const [dummyNews, setDummyNews] = useState([{
        heading:'Supreme®/Nike®',
        images:[slideImage1, slideImage2, slideImage3]
    },
    {
        heading:'Test',
        images:[slideImage2, slideImage3, slideImage1]
    },
    {
        heading:'Test2',
        images:[slideImage3, slideImage2, slideImage1]
    }])
    
    const archiveButtonHandler = () => {
        setArchiveOpened(prevState => !prevState)
    }
    
 
    return (
            <React.Fragment>
                <div className={styles.headerGroup}>
                    <Header/>
                    <TimeString/>
                </div>
                <div className={styles.wrapper}>
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
                                images:[slideImage1, slideImage2, slideImage3]
                            },
                            {
                                heading:'Test',
                                images:[slideImage2, slideImage3, slideImage1]
                            },
                            {
                                heading:'Test2',
                                images:[slideImage3, slideImage2, slideImage1]
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
                <NavFooterDesktop/>
            </React.Fragment>
    )
}

export default News