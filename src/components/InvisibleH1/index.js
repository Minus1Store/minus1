import React from 'react'

import styles from './invisible-h1.module.scss'

const InvisibleH1 = ({children}) => {
    return(<h1 className={styles.invisibleH1}>
        {children}
    </h1>)
}

export default InvisibleH1