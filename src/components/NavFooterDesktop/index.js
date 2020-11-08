import React from 'react'
import {Link, useStaticQuery, graphql} from 'gatsby'

import styles from './nav-footer-desktop.module.scss'

const NavFooterDesktop = ({linksArray}) => {

    const data = useStaticQuery(graphql`
        query NavFooterDesktopQuery{
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
            previews: allPrismicPreview(sort: {order: DESC, fields: data___preview_date}, limit: 2){
                edges{
                  node{
                    uid
                    data{
                        title
                        preview_date
                    }
                  }
                }
            }
        }
    `)

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
                    href:'/shop/all'
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
            link:data.previews && data.previews.edges.map(({node}) => {
                return {
                    text:node.data.title + ' preview',
                    href:`/previews/${node.uid}`
                }
            })
            // [
                
            //     {
            //         text:'fall/winter 2020 preview',
            //         href:'/preview'
            //     },
            //     {
            //         text:'spring/summer 2020 preview',
            //         href:'/preview'
            //     }
            // ]
        },
        {
            link:[
                {
                    text:'lookbook',
                    href:`/lookbooks/${data.lookbooks && data.lookbooks.edges[0].node.uid}`
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