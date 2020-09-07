import React from 'react'
import {Link} from 'gatsby'

import styles from './header.module.scss'
import logo from '../../img/test/logo.png'

const Header = ({className}) => {

    return(
        <header className={`${styles.header} ${className}`}>
            <Link to={'/'}>
                <img src={logo} alt='' className={styles.logo}/>
            </Link>
        </header>
    )
}

export default Header