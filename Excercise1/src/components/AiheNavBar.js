import React from 'react'
import styles from './AiheNavBar.module.css'

export default function AiheNavBar() {
    return (

    <div className = {styles.tausta}>
        <div className={styles.AihePalkkiContainer}> 
             <div>HS Visio</div>
             <div>Luetuimmat</div>
             <div>Uusimmat</div>
             <div>Politiikka</div>
             <div>Kaupunki</div>
             <div>Kulttuuri</div>
             <div>Tiede</div>
             <div>Hyvinvointi</div>
             <div>Ruoka</div>
             <div>Nyt</div>
        </div>
    </div>
    )
}
