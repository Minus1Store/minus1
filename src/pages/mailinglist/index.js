import React, { useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

import styles from './mailinglist.module.scss'
import PageLayout from '../../components/PageLayout'
import NavFooterDesktop from '../../components/NavFooterDesktop'
import NavFooterMobile from '../../components/NavFooterMobile'
import PrimaryButton from '../../components/PrimaryButton'
import MailingForm from '../../components/MailingForm'
import SEO from '../../components/SEO'
import InvisibleH1 from '../../components/InvisibleH1'

const MailinglistPage = ({ location }) => {
  const [submitResult, setSubmitResult] = useState(undefined)

  const mailingFormSubmit = async (email, listFields) => {
    try {
      setSubmitResult(undefined)
      const result = await addToMailchimp(email, listFields)
      console.log(result)
      setSubmitResult(result)
    } catch (error) {
      console.log(error)
      setSubmitResult({
        result: 'error',
        msg: 'There was some error, try again later!',
      })
    }
  }

  console.log(submitResult)

  return (
    <PageLayout>
      <SEO
        titleTemplate={'%s | Mailing List'}
        url={location.href}
        description={`Here you can subscribe to our newsletter to get interesting insights about our new, popular and products on SALE! So much more awaits.`}
      />
      <div className={styles.pageWrapper}>
        <InvisibleH1>
          Minus1 Mailing List
        </InvisibleH1>
        {submitResult == undefined ? (
          <MailingForm onSubmit={mailingFormSubmit} />
        ) : (
          <p
            className={`${styles.resultMessage} ${
              submitResult.result == 'success' ? styles.success : styles.error
            }`}
            dangerouslySetInnerHTML={{ __html: submitResult.msg }}
          ></p>
        )}
      </div>
      <NavFooterMobile />
      <div className={styles.navFooterContainer}>
        <NavFooterDesktop />
      </div>
    </PageLayout>
  )
}

export default MailinglistPage
