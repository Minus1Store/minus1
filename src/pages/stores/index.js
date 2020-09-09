import React from 'react'

import PageLayout from '../../components/PageLayout'
import styles from './stores.module.scss'
import StoreItem from '../../components/StoreItem'

const Stores = () => {

    return (
        <PageLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.storesContainer}>
                    <StoreItem/>
                </div>
            </div>
        </PageLayout>
    )
}

export default Stores