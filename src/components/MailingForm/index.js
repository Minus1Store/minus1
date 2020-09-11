import React from 'react'

import styles from './mailing-form.module.scss'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'

const MailingForm = () => {
    return (
        <form className={styles.mailingForm}>
            <div className={styles.inputsSection}>
                <div>
                    <label className={styles.inputLabel}>add my email to your mailinglist</label>
                    <div className={styles.input}>
                        <input type='email' placeholder='email@domain.com'/>
                    </div>
                </div>
                <p className={styles.informationText}>
                    i understand that i can opt out at any time
                </p>
                <div className={styles.checkboxGroup}>
                    <label className={styles.inputLabel}>notify me when the web shop is updated with new items</label>
                    <div className={styles.input}>
                        <input type='checkbox' name='allow notifications' value='false'/>
                    </div>
                </div>
            </div>
            <div className={styles.actionButtons}>
                <div>
                    <PrimaryButton text={'subscribe'}/>
                </div>
                <div>
                    <SecondaryButton text={'unsubscribe'}/>
                </div>
            </div>
        </form>
    )
}

export default MailingForm