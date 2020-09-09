import React, {useState, useEffect} from 'react'
import 'swiper/swiper.scss';

import Header from '../../components/Header/index'
import TimeString from '../../components/TimeString/index'
import styles from './page-layout.module.scss'
import {useSpring, animated} from 'react-spring'

import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'


const PageLayout = ({children}) => {

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
    
 
    return (
            <React.Fragment>
                <div className={styles.centeredItems}>
                    <div className={styles.headerGroup}>
                        <Header/>
                        <TimeString/>
                    </div>
                    <animated.div style={loadAnimation} className={styles.wrapper}>
                        {children}
                    </animated.div>
                    <NavFooterMobile/>
                    <NavFooterDesktop/>
                </div>
            </React.Fragment>
    )
}

export default PageLayout