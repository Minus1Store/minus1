import React from 'react'

import PageLayout from '../../components/PageLayout'
import styles from './stores.module.scss'
import StoreItem from '../../components/StoreItem'
import NavFooterMobile from '../../components/NavFooterMobile/index'
import NavFooterDesktop from '../../components/NavFooterDesktop/index'

const Stores = () => {

     return (
     <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.storesContainer}>
                    <StoreItem/>
                </div>
            </div>
            
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
     )
}

export default Stores