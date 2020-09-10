import React from 'react'

import PageLayout from '../../components/PageLayout'
import styles from './about.module.scss'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

const AboutPage = () => {
    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.aboutContainer}>
                    <p>In April 1994, Supreme opened its doors on Lafayette Street in downtown Manhattan and became the home of New York City skate culture. At its core was a group of neighborhood kids, New York skaters, and local artists who became the store’s staff, crew, and customers. </p>
                    <p>Supreme grew to embody downtown culture, and play an integral part in its constant regeneration. Skaters, punks, hip-hop heads — the young counter culture at large — all gravitated toward Supreme.</p>
                    <p>While it developed into a downtown institution, Supreme established itself as a brand known for its quality, style, and authenticity. </p>
                    <p>Over 25 years, Supreme has expanded from its New York City origins into a global community; working with generations of artists, photographers, designers, musicians, filmmakers, and writers who defied conventions and contributed to its unique identity and attitude.</p>
                </div>
            </div>
            
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
    )
}

export default AboutPage