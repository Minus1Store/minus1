import React from 'react'

import styles from './news-article.module.scss'
import FadeImageSlider from '../../components/FadeImageSlider/index'
import {Link} from 'gatsby'



const NewsArticle = ({showArchive, archiveButtonHandler, heading, images}) => {
    return(
        <div className={styles.articleContainer}>
            <div className={styles.imageSliderContainer}>
                <FadeImageSlider images={images} heading={heading}/>
            </div>
            <div>
                <article className={styles.newsArticleContainer}>
                    <time className={styles.date}>08/31/2020</time>
                    <h2 className={styles.heading}>{heading}</h2>
                    <div className={styles.body}>
                        <p>This Fall, Supreme has worked with Nike on a collection consisting of a Reversible Anorak, Soccer Jersey, Crewneck, Reversible Pant and Sweatshort.</p>
                        <p>Made exclusively for Supreme, the Reversible Anorak and Pant feature transparent nylon ripstop with a nylon taslan reverse side. The Soccer Jersey features Dri-FIT® poly with tackle twill and jewel appliqué logo patch, while the Crewneck and Sweatshort feature cotton fleece with tackle twill and jewel appliqué logo patch.</p>
                        <p>Available September 3rd.</p>
                        <p>Available in Japan September 5th.</p>
                    </div>
                </article>
                {
                    showArchive &&
                <React.Fragment>
                    <Link to={'/archive'}>
                        archive
                    </Link>
                    <button onClick={() => archiveButtonHandler()}>
                        archive
                    </button>
                </React.Fragment>
                }
            </div>
        </div>
    )
}

export default NewsArticle