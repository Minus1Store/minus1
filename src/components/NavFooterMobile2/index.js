import React from 'react'
import {Link} from 'gatsby'

import styles from './nav-footer-mobile-2.module.scss'

const  NavFooterMobile2 = () => {
    return (
        <nav className={styles.navFooterMobile}>
            <ul>
                <li>
                    <Link to={'/shop/sizing'}>
                        sizing
                    </Link>
                </li>
                <li>
                    <Link to={'/shop/shipping'}>
                        shipping
                    </Link>
                </li>
                <li>
                    <Link to={'/shop/terms'}>
                        terms
                    </Link>
                </li>
                <li>
                    <Link to={'/shop/privacy'}>
                        privacy
                    </Link>
                </li>
                <li>
                    <Link to={'/shop/faq'}>
                        f.a.q.
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavFooterMobile2