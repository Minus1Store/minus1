import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import styles from './social.module.scss'
import facebookIcon from '../../img/test/facebook-icon.svg'
import instagramIcon from '../../img/test/instagram-icon.svg'
import twitterIcon from '../../img/test/twitter-icon.svg'

const Social = () => {

    const data = useStaticQuery(graphql`
    query SocialNetworks {
        socialNetworks:allPrismicHomePage {
          edges {
            node {
              data {
                social_networks {
                  social_network_icon {
                    url
                  }
                  social_network_link {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `)

    return (
        <div className={styles.social}>
            {data.social_networks && data.socialNetworks.edges[0].node.data.social_networks.map(socialNetwork => {
                return <a href={socialNetwork.social_network_link.url}>
                            <img src={socialNetwork.social_network_icon.url} alt={socialNetwork.social_network_icon.alt}/>
                        </a>    
            })}
        </div>
    )
}

export default Social