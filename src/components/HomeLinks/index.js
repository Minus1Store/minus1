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
                    <Link to={'/previews/fallwinter2020'}>
                        fall/winter 2020 preview
                    </Link>
                </li>
                <li>
                    <Link to={'/lookbooks/fallwinter2020'}>
                        fall/winter 2020 lookbook
                    </Link>
                </li>
                <li>
                    <Link to={'/shop'}>
                        Shop
                    </Link>
                </li>
                <li>
                    <Link to={'/about'}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to={'/stores'}>
                        Stores
                    </Link>
                </li>
                <li>
                    <Link to={'/contact'}>
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to={'/mailinglist'}>
                        MAILINGLIST
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default HomeLinks