import React, { useState } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { useTransition, animated } from 'react-spring'
import Image from 'gatsby-image'

import styles from './store-item.module.scss'

import 'leaflet/dist/leaflet.css'

const StoreItem = ({ data }) => {
  const [storeClicked, setStoreClicked] = useState(false)

  const popupTransition = useTransition(storeClicked, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <div
      className={styles.store}
      onClick={() => {
        setStoreClicked(true)
      }}
    >
      <div className={styles.storeVisuals}>
        <div className={styles.storeImage}>
          {data.store_cover &&
            data.store_cover.localFile &&
            data.store_cover.localFile.childImageSharp &&
            data.store_cover.localFile.childImageSharp.fluid && (
              <Image
                fluid={data.store_cover.localFile.childImageSharp.fluid}
                alt={data.store_cover.alt ? data.store_cover.alt : 'store item image'}
              />
            )}
        </div>
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.storeInformation}>
        <h2 className={styles.storeTitle}>{data.title}</h2>
        <p className={styles.storeAddress}>{data.address}</p>
        <a
          onClick={(e) => e.stopPropagation()}
          target={'_blank'}
          className={styles.storeMail}
          href={data.view_map_button[0].button_link.url}
        >
          {data.view_map_button[0].button_text}
        </a>
        <p className={styles.storeTelNumber}>{data.telephone_information}</p>
        {data.working_hours && (
          <div
            className={styles.workingHours}
            dangerouslySetInnerHTML={{ __html: data.working_hours.html }}
          ></div>
        )}
        {data.email_button.length > 0 && (
          <a
            onClick={(e) => e.stopPropagation()}
            className={styles.storeMail}
            href={data.email_button[0].button_link}
          >
            {data.email_button[0].button_text}
          </a>
        )}
      </div>
      {popupTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className={styles.informationBox}
            >
              <div
                className={styles.informationBoxBackground}
                onClick={(e) => {
                  e.stopPropagation()
                  setStoreClicked(false)
                }}
              ></div>
              <div className={styles.informationBoxContent}>
                <div class={styles.informationBoxText}>
                  <h2>{data.title}</h2>
                  <p>{data.address}</p>
                  {data.view_map_button.length > 0 &&
                    data.view_map_button[0].button_link.url && (
                      <a
                        onClick={(e) => e.stopPropagation()}
                        target={'_blank'}
                        className={styles.storeMail}
                        href={data.view_map_button[0].button_link.url}
                      >
                        {data.view_map_button[0].button_text}
                      </a>
                    )}
                  <p>{data.telephone_information}</p>
                  {data.working_hours && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.working_hours.html,
                      }}
                    ></div>
                  )}
                  {data.email_button.length > 0 && (
                    <a
                      onClick={(e) => e.stopPropagation()}
                      className={styles.storeMail}
                      href={data.email_button[0].button_link}
                    >
                      {data.email_button[0].button_text}
                    </a>
                  )}
                </div>
                <div className={styles.informationBoxImage}>
                  {data.store_cover &&
                    data.store_cover.localFile &&
                    data.store_cover.localFile.childImageSharp &&
                    data.store_cover.localFile.childImageSharp.fluid && (
                      <Image
                        fluid={data.store_cover.localFile.childImageSharp.fluid}
                        alt={data.store_cover.alt ? data.store_cover.alt : 'store building image'}
                      />
                    )}
                </div>
                <div className={styles.map}>
                  {typeof window !== 'undefined' &&
                    data.map_geolocation.latitude &&
                    data.map_geolocation.longitude && (
                      <Map
                        animate={true}
                        center={[
                          data.map_geolocation.latitude,
                          data.map_geolocation.longitude,
                        ]}
                        zoom={14}
                      >
                        <TileLayer
                          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                          subdomains={'abcd'}
                        />
                      </Map>
                    )}
                </div>
              </div>
            </animated.div>
          )
      )}
    </div>
  )
}

export default StoreItem
