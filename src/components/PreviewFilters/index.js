import React from 'react'
import {Link} from 'gatsby'

import styles from './preview-filters.module.scss'

const PreviewFilters = ({location, currentPreview, data}) => {

    return(
        <div className={styles.filtersContainer}>
            <Link to={`${currentPreview}/all`} className={location.pathname == `${currentPreview}/all` && styles.activeLink}>
                all
            </Link>
            {data.productCategories && data.productCategories.edges.map(({node}) => {
                return <Link to={`${currentPreview}/${node.uid}`} className={location.pathname == `${currentPreview}/${node.uid}` && styles.activeLink}>
                    {node.data.product_category}
                </Link>
            })}
        </div>
    )
}

export default PreviewFilters