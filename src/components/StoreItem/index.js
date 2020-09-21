import React, {useState} from 'react'
import {Map, TileLayer} from 'react-leaflet'
import {useTransition, animated} from 'react-spring'
import Image from 'gatsby-image'


import styles from './store-item.module.scss'

import 'leaflet/dist/leaflet.css';

const StoreItem = ({data}) => {

    const [storeClicked, setStoreClicked] = useState(false)

    const popupTransition = useTransition(storeClicked, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return (
    <div className={styles.store} onClick={() => {setStoreClicked(true)}}>
        <div className={styles.storeVisuals}>
            <div className={styles.storeImage}>
                <Image fluid={data.store_cover.localFile.childImageSharp.fluid} alt={data.store_cover.alt} />
            </div>
            <div className={styles.overlay}></div>
        </div>
        <div className={styles.storeInformation}>
            <h2 className={styles.storeTitle}>
                {data.title}
            </h2>
            <p className={styles.storeAddress}>
                {data.address}
            </p>
            <a onClick={e => e.stopPropagation()} target={'_blank'} className={styles.storeMail} href={data.view_map_button[0].button_link}>{data.view_map_button[0].button_text}</a>
            <p className={styles.storeTelNumber}>
                {data.telephone_information}
            </p>
            <div className={styles.workingHours} dangerouslySetInnerHTML={{__html:data.working_hours.html}}>
            </div>
            <a onClick={e => e.stopPropagation()} className={styles.storeMail} href={data.email_button[0].button_link}>{data.email_button[0].button_text}</a>
        </div>
        {
            popupTransition.map(({item, key, props}) => 
                item && 
            <animated.div key={key} style={props} className={styles.informationBox}>
                <div className={styles.informationBoxBackground} onClick={(e) => {e.stopPropagation();setStoreClicked(false)}} ></div>
                <div className={styles.informationBoxContent}>
                    <div class={styles.informationBoxText}>
                        <h2>{data.title}</h2>
                        <p>{data.address}</p>
                        <a onClick={e => e.stopPropagation()} target={'_blank'} className={styles.storeMail} href={data.view_map_button[0].button_link}>{data.view_map_button[0].button_text}</a>
                        <p>{data.telephone_information}</p>
                        <div dangerouslySetInnerHTML={{__html:data.working_hours.html}}>
                        </div>
                        <a onClick={e => e.stopPropagation()} className={styles.storeMail} href={data.email_button[0].button_link}>{data.email_button[0].button_text}</a>
                    </div>
                    <div className={styles.informationBoxImage}>
                        <Image fluid={data.store_cover.localFile.childImageSharp.fluid} alt={data.store_cover.alt} />
                    </div>
                    <div className={styles.map}>
                        {typeof window !== 'undefined' &&
                            <Map animate={true} center={[data.map_geolocation.latitude,data.map_geolocation.longitude]} zoom={13}>
                                <TileLayer
                                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                                />
                            </Map>
                        }
                    </div>
                </div>
            </animated.div>
            )
        }
    </div>
    )
}

export default StoreItem