import React from 'react'

import styles from './social.module.scss'
import facebookIcon from '../../img/test/facebook-icon.svg'
import instagramIcon from '../../img/test/instagram-icon.svg'
import twitterIcon from '../../img/test/twitter-icon.svg'

const Social = () => {
    return (
        <div className={styles.social}>
            <a href={'https://facebook.com'}>
                <img src={facebookIcon} alt='Find us on Facebook'/>
            </a>
            <a href={'https://instagram.com'}>
                <img src={instagramIcon} alt='Find us on Instagram'/>
            </a>
            <a href={'https://twitter.com'}>
                <img src={twitterIcon} alt='Find us on Twitter'/>
            </a>
        </div>
    )
}

export default Social