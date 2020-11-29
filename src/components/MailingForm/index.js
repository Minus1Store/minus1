import React, { useState } from 'react'

import styles from './mailing-form.module.scss'
import PrimaryButton from '../PrimaryButton'

const MailingForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [notificationsPreference, setNotificationsPreference] = useState(false)

  return (
    <form
      className={styles.mailingForm}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(email, { notificationsPreference })
      }}
    >
      <div className={styles.inputsSection}>
        <div>
          <label className={styles.inputLabel}>
            add my email to your mailinglist
          </label>
          <div className={styles.input}>
            <input
              type="email"
              placeholder="email@domain.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <p className={styles.informationText}>
          i understand that i can opt out at any time
        </p>
        <div className={styles.checkboxGroup}>
          <label className={styles.inputLabel}>
            notify me when the web shop is updated with new items
          </label>
          <div className={styles.input}>
            <input
              type="checkbox"
              name="allow notifications"
              value={notificationsPreference}
              onChange={(e) => setNotificationsPreference(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <div>
          <PrimaryButton text={'subscribe'} />
        </div>
      </div>
    </form>
  )
}

export default MailingForm
