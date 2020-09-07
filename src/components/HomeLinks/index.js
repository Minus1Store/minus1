import React from 'react'
import {Link} from 'gatsby'
import styles from './home-links.module.scss'


const HomeLinks = () => {
    return(
        <nav className={styles.homeLinks}>
            <ul>
                <li>
                    <Link to={'/news'}>
                        News
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        fall/winter 2020 preview
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        fall/winter 2020 lookbook
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        Shop
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        Random
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        Stores
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to={'/news'}>
                        MAILINGLIST
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default HomeLinks