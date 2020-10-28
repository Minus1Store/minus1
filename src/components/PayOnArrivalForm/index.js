import React from 'react'

import styles from './pay-on-arrival-form.module.scss'
import PrimaryButton from '../PrimaryButton'

const PayOnArrivalForm = ({products}) => {
    return(
        <form className={styles.contactForm}>
            <h4>Pay on arrival</h4>
            <div className={styles.inputsGroup}>
                <input type='text' name='firstName' placeholder='first name'/>
                <input type='text' name='lastName' placeholder='last name'/>
                <input type='email' name='email' placeholder='your email'/>
                <input type='text' name='address' placeholder='address'/>
            </div>
            <label>message</label>
            <textarea name='message'></textarea>
            <PrimaryButton text='send'/>
        </form>
    )
}

export default PayOnArrivalForm