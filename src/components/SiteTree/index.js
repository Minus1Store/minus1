import React from 'react'
import {Link} from 'gatsby'
 
import styles from './site-tree.module.scss'

const SiteTree = ({links}) => {
    return(
    <div className={styles.siteTree}>
        {links.map((link, index) => {
            if(index == 0){
                return <Link to={link.link}>
                    {link.text}
                </Link>
            }else{
                return <React.Fragment>
                    &gt;
                    <Link to={link.link}>
                        {link.text}
                    </Link>
                </React.Fragment>
            }
        })}
    </div>
    )
}

export default SiteTree