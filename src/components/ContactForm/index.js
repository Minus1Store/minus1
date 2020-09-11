import React from 'react'

import styles from './contact-form.module.scss'
import PrimaryButton from '../PrimaryButton'

const ContactForm = () => {
    return(
        <form className={styles.contactForm}>
            <div className={styles.inputsGroup}>
                <input type='text' name='firstName' placeholder='first name'/>
                <input type='text' name='lastName' placeholder='last name'/>
                <input type='email' name='email' placeholder='your email'/>
                <input type='text' name='orderNumber' placeholder='order number'/>
            </div>
            <select name='reasonOfContact'>
                <option value='online order status requests'>online order status requests</option>
                <option value='online return or exchange request'>online return or exchange request</option>
                <option value='online order lost package'>online order lost package</option>
                <option value='store inquiries'>store inquiries</option>
                <option value='general inquiries'>general inquiries</option>
                <option value='press'>press</option>
            </select>
            <label>message</label>
            <textarea name='message'></textarea>
            <PrimaryButton text='send'/>
        </form>
    )
}

export default ContactForm