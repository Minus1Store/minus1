import React from 'react'
import {Link} from 'gatsby'

import styles from './nav-footer.module.scss'

const NavFooterMobile = () => {
    return (
        <footer className={styles.navFooter}>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link to={'/news'}>
                            news
                        </Link>
                    </li>
                    <li>
                        <Link to={'/preview'}>
                            preview
                        </Link>
                    </li>
                    <li>
                        <Link to={'/lookbook'}>
                            lookbook
                        </Link>
                    </li>
                </ul>
                <ul className={styles.navList}>
                    <li>
                        <Link to={'/shop'}>
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to={'/random'}>
                            Random
                        </Link>
                    </li>
                    <li>
                        <Link to={'/stores'}>
                            stores
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default NavFooterMobile