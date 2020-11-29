import React, { useState } from 'react'

import styles from './contact-form.module.scss'
import PrimaryButton from '../PrimaryButton'

const ContactForm = () => {
  const [firstName, setFirstName] = useState(undefined)
  const [lastName, setLastName] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [orderNumber, setOrderNumber] = useState(undefined)
  const [reasonOfContact, setReasonOfContact] = useState(undefined)
  const [message, setMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)
  console.log(firstName, lastName, email, orderNumber, reasonOfContact, message)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    if (
      !reasonOfContact ||
      !firstName ||
      !(
        email &&
        email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
    ) {
      setErrorMessage('Required fields not filled!')
    } else {
      setErrorMessage(undefined)
      fetch(
        `/.netlify/functions/contact-form?firstName=${firstName}&lastName=${lastName}&email=${email}&orderNumber=${orderNumber}&reasonOfContact=${reasonOfContact}&message=${message}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 'success') {
            return setSuccessMessage(data.message)
          } else if (data.status == 'error') {
            return setErrorMessage(data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage(
            'There was some error while trying to send your email. Try later!'
          )
        })
    }
  }

  return (
    <form className={styles.contactForm}>
      <div className={styles.inputsGroup}>
        <input
          type="text"
          name="firstName"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="orderNumber"
          placeholder="order number"
          onChange={(e) => setOrderNumber(e.target.value)}
        />
      </div>
      <select
        name="reasonOfContact"
        onChange={(e) => setReasonOfContact(e.target.value)}
      >
        <option value="" disabled selected>
          select reason of contact
        </option>
        <option value="online order status requests">
          online order status requests
        </option>
        <option value="online return or exchange request">
          online return or exchange request
        </option>
        <option value="online order lost package">
          online order lost package
        </option>
        <option value="store inquiries">store inquiries</option>
        <option value="general inquiries">general inquiries</option>
        <option value="press">press</option>
      </select>
      <label>message</label>
      <textarea
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div onClick={(e) => handleSubmit(e)}>
        <PrimaryButton text="send" />
      </div>
      {successMessage ||
        (errorMessage && (
          <p className={styles.statusMessage}>
            {successMessage || errorMessage}
          </p>
        ))}
    </form>
  )
}

export default ContactForm
