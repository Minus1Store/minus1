import React from 'react'
import {Link, useStaticQuery, graphql} from 'gatsby'
import styles from './home-links.module.scss'


const HomeLinks = () => {

    const data = useStaticQuery(graphql`
        query HomeLinksQuery{
            lookbooks: allPrismicLookbook(sort: {order: DESC, fields: data___lookbook_date}, limit: 1){
                edges{
                  node{
                    uid
                    data{
                        title
                        lookbook_date
                    }
                  }
                }
            }
        }
    `)

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
                    <Link to={`/lookbooks/${data.lookbooks.edges[0].node.uid}`}>
                        {data.lookbooks.edges[0].node.data.title} lookbook
                    </Link>
                </li>
                <li>
                    <Link to={'/shop/all'}>
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