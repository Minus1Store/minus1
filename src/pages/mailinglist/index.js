import React from 'react'

import styles from './mailinglist.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import NavFooterMobile from '../../components/NavFooterMobile'
import PrimaryButton from '../../components/PrimaryButton'
import MailingForm from '../../components/MailingForm'

const MailinglistPage = () => {
    return (
        <PageLayout>
            <div className={styles.pageWrapper}>
                <MailingForm/>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
    )
}

export default MailinglistPage