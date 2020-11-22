import React, {useState} from 'react'

import styles from './pay-with-card-form.module.scss'
import PrimaryButton from '../PrimaryButton'

const PayWithCardForm = ({products, price}) => {

    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [address, setAddress] = useState(undefined)
    const [message, setMessage] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [successMessage, setSuccessMessage] = useState(undefined)

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setErrorMessage('')
    //     setSuccessMessage('')
    //     if (
    //       !address ||
    //       !firstName ||
    //       !(
    //         email &&
    //         email.match(
    //           /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         )
    //       )
    //     ) {
    //       setErrorMessage('Required fields not filled!')
    //     } else {
    //       setErrorMessage(undefined)
    //       fetch(
    //         `/.netlify/functions/pay-on-arrival-form?firstName=${firstName}&lastName=${lastName}&email=${email}&address=${address}&message=${message}&price=${price}&products=${JSON.stringify(products.map(product => {return{quantity:product.quantity, title:product.data.title, color: product.data.color_name, size: product.size, uid:product.uid}}))}`,
    //         {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             }, 
    //           method: 'POST',
    //         }
    //       )
    //       .then((response) => response.json())
    //         .then((data) => {
    //           if (data.status == 'success') {
    //             return setSuccessMessage(data.message)
    //           } else if (data.status == 'error') {
    //             return setErrorMessage(data.message)
    //           }
    //         })
    //         .catch((error) => {
    //           setErrorMessage(
    //             'There was some error while trying to send your email. Try later!'
    //           )
    //         })
    //     }
    //   }

    return(
        <form className={styles.contactForm}>
            <h4>Pay on arrival</h4>
            <div className={styles.inputsGroup}>
                <input type='text' name='firstName' placeholder='first name' onChange={e => setFirstName(e.target.value)}/>
                <input type='text' name='lastName' placeholder='last name' onChange={e => setLastName(e.target.value)}/>
                <input type='email' name='email' placeholder='your email' onChange={e => setEmail(e.target.value)}/>
                <input type='text' name='address' placeholder='address' onChange={e => setAddress(e.target.value)}/>
            </div>
            {/* <label>message</label>
            <textarea name='message' onChange={e => setMessage(e.target.value)}></textarea> */}
            {successMessage || errorMessage &&
                <p className={styles.statusText}>{successMessage || errorMessage}</p>
            }
            <div onClick={(e) => handleSubmit(e)}>
                <PrimaryButton text='send'/>
            </div>
        </form>
    )
}

export default PayWithCardForm