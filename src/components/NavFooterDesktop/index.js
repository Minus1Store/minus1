import React from 'react'
import {Link} from 'gatsby'

import styles from './nav-footer-desktop.module.scss'

const NavFooterDesktop = ({linksArray}) => {

    let links = linksArray || [
        {
            link:[
                {
                    text:'home',
                    href:'/'
                }
            ]
        },
        {
            link:[
                {
                    text:'shop',
                    href:'/shop'
                }
            ]
        },
        {
            link:[
                {
                    text:'news',
                    href:'/news'
                }
            ]
        },
        {
            link:[
                {
                    text:'fall/winter 2020 preview',
                    href:'/preview'
                },
                {
                    text:'spring/summer 2020 preview',
                    href:'/preview'
                }
            ]
        },
        {
            link:[
                {
                    text:'lookbook',
                    href:'/lookbook'
                }
            ]
        },
        {
            link:[
                {
                    text:'about',
                    href:'/about'
                }
            ]
        },
        {
            link:[
                {
                    text:'stores',
                    href:'/stores'
                }
            ]
        }
    ]

    return (
        <footer className={styles.navFooter}>
            <nav>
                <ul className={styles.navList}>
                    {links.map(({link}) => {
                        return <li>
                            {link.map(link => {
                                return <Link to={link.href}>
                                    {link.text}
                                </Link>
                            })}
                        </li>
                    })}
                </ul>
            </nav>
        </footer>
    )
}

export default NavFooterDesktop