import React, {useState} from 'react'

import styles from './pay-with-card-form.module.scss'
import PrimaryButton from '../PrimaryButton'
import { Helmet } from 'react-helmet'

const PayWithCardForm = ({products, price}) => {

    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [phoneNumber, setPhoneNumber] = useState(undefined)
    const [address, setAddress] = useState(undefined)
    const [country, setCountry] = useState(undefined)
    const [city, setCity] = useState(undefined)
    const [zipCode, setZipCode] = useState(undefined)
    const [message, setMessage] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [successMessage, setSuccessMessage] = useState(undefined)
    
    console.log(address,firstName,lastName,phoneNumber,country,city,zipCode)

    const [sellerId, setSellerId] = useState(process.env.GATSBY_2CHECKOUT_SELLER_ID)
    const [publishableKey, setPublishableKey] = useState(process.env.GATSBY_2CHECKOUT_PUBLISHABLE_KEY)
    const [ccNo, setCcNo] = useState("")
    const [expMonth, setExpMonth] = useState("")
    const [expYear, setExpYear] = useState("")
    const [cvv, setCvv] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setErrorMessage('')
      setSuccessMessage('')
      if (
        !address ||
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !country ||
        !city ||
        !zipCode ||
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
        var payWithCard = data => {
          let token  = data.response.token.token
          if(token){
            console.log(token);
            fetch(
              `/.netlify/functions/pay-with-card-form?firstName=${firstName}&lastName=${lastName}&email=${email}&phoneNumber=${phoneNumber}&message=${message}&country=${country}&city=${city}&address=${address}&zipCode=${zipCode}&token=${token}&price=${price}&products=${JSON.stringify(products.map(product => {return{quantity:product.quantity, title:product.data.title, color: product.data.color_name, size: product.size, uid:product.uid}}))}`,
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
                setErrorMessage(
                  'There was some error while trying to send your email. Try later!'
                )
              })
          }
        };
        
        var error = error => {
          console.log(error);
          setErrorMessage('There was problem processing your information. Try again later!')
        };
    
        window.TCO.loadPubKey("production", () => {
          window.TCO.requestToken(payWithCard, error, "tcoCCForm");
        });
      }
    };

    
    
    return(
      <form className={styles.contactForm} id='tcoCCForm'>
            <Helmet>
              <script src='https://www.2checkout.com/checkout/api/2co.min.js' type='text/javascript'></script>
            </Helmet>
            <input id="sellerId" type="hidden" value={sellerId} />
            <input
              id="publishableKey"
              type="hidden"
              value={publishableKey}
            />
            <h4>Pay with credit card</h4>
            <div className={styles.inputsGroup}>
                <div className={styles.inputsGroup}>
                  <h2 className={styles.groupHeading}>
                    Contact Information
                  </h2>
                  <input type='text' name='firstName' placeholder='first name' onChange={e => setFirstName(e.target.value)}/>
                  <input type='text' name='lastName' placeholder='last name' onChange={e => setLastName(e.target.value)}/>
                  <input type='email' name='email' placeholder='your email' onChange={e => setEmail(e.target.value)}/>
                  <input type='text' name='phoneNumber' placeholder='phone number' onChange={e => setPhoneNumber(e.target.value)}/>
                </div>
                <div className={styles.inputsGroup}>
                  <h2 className={styles.groupHeading}>
                    Location information
                  </h2>
                  <select name='country' onChange={(e) => setCountry(e.target.value)}>
                    <option value=''>country</option>
                    <option value='Serbia'>Serbia</option>
                  </select>
                  <input type='hidden' name='state' value={country} />
                  <input type='text' name='city' placeholder='city' onChange={e => setCity(e.target.value)}/>
                  <input type='text' name='address' placeholder='address' onChange={e => setAddress(e.target.value)}/>
                  <input type='text' name='zipCode' placeholder='zip code' onChange={e => setZipCode(e.target.value)}/>
                </div>
                <div className={styles.inputsGroup}>
                  <h2 className={styles.groupHeading}>
                    Credit card information
                  </h2>
                  <input
                    id="ccNo"
                    name="ccNo"
                    placeholder='Card Number'
                    type="text"
                    value={ccNo}
                    autoComplete="off"
                    required
                    onChange={e => setCcNo(e.target.value)}
                    />
                  <input id="cvv" type='text' name='cvv' placeholder='CVC' onChange={e => setCvv(e.target.value)}/>
                  <div className={styles.inputsGroup}>
                      <input id="expMonth" type='text' size="2" name='expMonth' placeholder='Expiration Month(MM)' onChange={e => setExpMonth(e.target.value)}/>
                      /
                      <input id="expYear" type='text' size="4" name='expYear' placeholder='Expiration Year(YYYY)' onChange={e => setExpYear(e.target.value)}/>
                  </div>
                </div>
                <div className={styles.inputsGroup}>
                  <h2 className={styles.groupHeading}>
                    Other information
                  </h2>
                  <textarea name='message' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='message to seller'></textarea>
                  <input type='hidden' name='demo' value='Y' />
                </div>
            </div>
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