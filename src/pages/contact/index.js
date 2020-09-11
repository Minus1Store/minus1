import React from 'react'

import styles from './contact.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterMobile from '../../components/NavFooterMobile'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import ContactForm from '../../components/ContactForm'

const Contact = () => {
    return(
        <PageLayout>
            <div className={styles.pageWrapper}>
                <p className={styles.credit}>
                    website & e-commerce by <a target='_blank' href='https://milosmladenovicwork.ml'>Milos</a>
                </p>
                <h2 className={styles.heading}>contact Minus1</h2>
                <ContactForm/>
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
    )
}

export default Contact