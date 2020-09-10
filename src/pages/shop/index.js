import React from 'react'
import {Link} from 'gatsby'

import styles from './shop.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

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

const Shop = () => {
    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.productContainer}>
                    <div className={styles.filters}>
                        <Link to={'/shop'}>
                            all
                        </Link>
                        <Link to={'/shop/hats'}>
                            Hats
                        </Link>
                        <Link to={'/shirts'}>
                            Jackets
                        </Link>
                        <Link to={'/shirts'}>
                            shoes
                        </Link>
                        <Link to={'/shirts'}>
                            skate
                        </Link>
                        <Link to={'/shirts'}>
                            bags
                        </Link>
                    </div>
                    <div className={styles.products}>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage1} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage2} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage3} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage4} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage5} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage6} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage7} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage8} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage9} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage10} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage1} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage2} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage3} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage4} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage5} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage6} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage7} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage8} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage9} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage10} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage1} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage2} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage3} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage4} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage5} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage6} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage7} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage8} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage9} alt=''/>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={slideImage10} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
            <div className={styles.siteTree}>
                <Link to={'/'}>
                    home
                </Link>
                &gt;
                <Link to={'/shop'}>
                    shop
                </Link>
            </div>
            <NavFooterDesktop
                linksArray={
                    [
                        {
                            link:[
                                {
                                    text:'view all',
                                    href:'/shop'
                                }
                            ]
                        },
                        {
                            link:[
                                {
                                    text:'sizing',
                                    href:'/shop/sizing'
                                }
                            ]
                        },
                        {
                            link:[
                                {
                                    text:'shipping',
                                    href:'/shop/shipping'
                                }
                            ]
                        },
                        {
                            link:[
                                {
                                    text:'terms',
                                    href:'/shop/terms'
                                }
                            ]
                        },
                        {
                            link:[
                                {
                                    text:'privacy',
                                    href:'/shop/privacy'
                                }
                            ]
                        },
                        {
                            link:[
                                {
                                    text:'f.a.q.',
                                    href:'/shop/faq'
                                }
                            ]
                        },
                ]
                }
            />
            </div>
        </PageLayout>
    )
}

export default Shop