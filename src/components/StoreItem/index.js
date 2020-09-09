import React, {useState} from 'react'

import styles from './store-item.module.scss'
import shop1 from '../../img/test/shop1.jpg'
import {Map, TileLayer} from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

const StoreItem = () => {

    const [storeClicked, setStoreClicked] = useState(false)

    return (
    <div className={styles.store} onClick={() => {setStoreClicked(true)}}>
        <div className={styles.storeVisuals}>
            <img src={shop1} className={styles.storeImage} alt=''/>
            <div className={styles.overlay}></div>
        </div>
        <div className={styles.storeInformation}>
            <h2 className={styles.storeTitle}>
                Supreme Los Angeles
            </h2>
            <p className={styles.storeAddress}>
                439 North Fairfax Ave LA 90036
            </p>
            <a onClick={e => e.stopPropagation()} target={'_blank'} className={styles.storeMail} href={'https://www.google.com/maps'}>View Map</a>
            <p className={styles.storeTelNumber}>
                Tel 323-655-6205
            </p>
            <div className={styles.workingHours}>
                <p>Open 11 - 7 (MON-SAT)</p>
                <p>12 - 6 (SUN)</p>
            </div>
            <a onClick={e => e.stopPropagation()} className={styles.storeMail} href={'mailto:info@minus1.com'}>email Belgrade store</a>
        </div>
        {
            storeClicked && 
            <div className={styles.informationBox}>
                <div className={styles.informationBoxBackground} onClick={(e) => {e.stopPropagation();setStoreClicked(false)}} ></div>
                <div className={styles.informationBoxContent}>
                    <div class={styles.informationBoxText}>
                        <h2>Supreme Los Angeles</h2>
                        <p>439 North Fairfax Ave LA 90036</p>
                        <a onClick={e => e.stopPropagation()} target={'_blank'} className={styles.storeMail} href={'https://www.google.com/maps'}>View Map</a>
                        <p>Tel 323-655-6205</p>
                        <div>
                            <p>Open 11 - 7 (MON-SAT)</p>
                            <p>12 - 6 (SUN)</p>
                        </div>
                        <a onClick={e => e.stopPropagation()} className={styles.storeMail} href={'mailto:info@minus1.com'}>email Belgrade store</a>
                    </div>
                    <img src={shop1} alt=''/>
                    <div className={styles.map}>
                        <Map animate={true} center={[51.505, -0.09]} zoom={13}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                        </Map>
                    </div>
                </div>
            </div>
        }
    </div>
    )
}

export default StoreItem