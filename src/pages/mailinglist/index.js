import React, {useState} from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

import styles from './mailinglist.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import NavFooterMobile from '../../components/NavFooterMobile'
import PrimaryButton from '../../components/PrimaryButton'
import MailingForm from '../../components/MailingForm'

const MailinglistPage = () => {
    
    const [submitResult, setSubmitResult] = useState(undefined)

    const mailingFormSubmit = async (email, listFields) => {
            try{
                setSubmitResult(undefined)
                const result = await addToMailchimp(email, listFields)
                setSubmitResult(result)
            }catch(error){
                setSubmitResult({result: 'error',msg:'There was some error, try again later!'})
            }
    }

    console.log(submitResult)
    
    return (
        <PageLayout>
            <div className={styles.pageWrapper}>
                {submitResult == undefined ?
                    <MailingForm onSubmit={mailingFormSubmit}/>
                    :
                    <p className={`${styles.resultMessage} ${submitResult.result == 'success' ? styles.success : styles.error}`} dangerouslySetInnerHTML={{__html:submitResult.msg}}></p>
                }
            </div>
            <NavFooterMobile/>
            <div className={styles.navFooterContainer}>
                <NavFooterDesktop/>
            </div>
        </PageLayout>
    )
}

export default MailinglistPage