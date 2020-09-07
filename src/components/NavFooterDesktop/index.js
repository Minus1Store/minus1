import React from 'react'
import {Link} from 'gatsby'

import styles from './nav-footer-desktop.module.scss'

const NavFooterDesktop = () => {
    return (
        <footer className={styles.navFooter}>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link to={'/'}>
                            home
                        </Link>
                    </li>
                    <li>
                        <Link to={'/shop'}>
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to={'/news'}>
                            news
                        </Link>
                    </li>
                    <li>
                        <Link to={'/preview'}>
                            fall/winter 2020 preview
                        </Link>
                        <Link to={'/preview'}>
                            spring/summer 2020 preview
                        </Link>
                    </li>
                    <li>
                        <Link to={'/lookbook'}>
                            lookbook
                        </Link>
                    </li>
                    <li>
                        <Link to={'/random'}>
                            Random
                        </Link>
                    </li>
                    <li>
                        <Link to={'/about'}>
                            about
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

export default NavFooterDesktop