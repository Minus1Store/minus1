import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styles from './social.module.scss'
const Social = () => {
  const data = useStaticQuery(graphql`
    query SocialNetworks {
      socialNetworks: allPrismicHomePage {
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
      {data.socialNetworks &&
        data.socialNetworks.edges.length > 0 &&
        data.socialNetworks.edges[0].node.data.social_networks.length > 0 &&
        data.socialNetworks.edges[0].node.data.social_networks.map(
          (socialNetwork) => {
            return (
              <a href={socialNetwork.social_network_link.url}>
                {socialNetwork.social_network_icon &&
                  socialNetwork.social_network_icon.url && (
                    <img
                      src={socialNetwork.social_network_icon.url}
                      alt={socialNetwork.social_network_icon.alt}
                    />
                  )}
              </a>
            )
          }
        )}
    </div>
  )
}

export default Social
