import React from 'react'
import styles from './YlaPalkki.module.css'

export default function YlaPalkki() {
return (
<div className={styles.tausta}>
    <div className = {styles.YlaPalkkiContainer}>
                
        <div className="YlaPalkki" style={{fontSize: '23px'}}> HELSINGIN SANOMAT</div>
        <div> Uutiset</div>
        <div className="YlaPalkki" style={{flex:0.5}}>Lehdet</div>
    
        <button className="YlaPalkki" style={{color: 'rgb(0, 25, 76)', backgroundColor:'white', borderRadius: '5px', height: '35px', width: '75px'}}><b>Tilaa</b> </button>
        <div> <b>Kirjaudu</b></div>
        <img className= {styles.image} src='kayttajaIkoni.png' alt='KuvaIkoni' />
        <div><b>Hae</b></div>
        <img className= {styles.image} src='hakuIkoni.png' alt='KuvaIkoni' />
        <div><b>Valikko</b></div>
        <img className= {styles.image} src='valikkoIkoni.png' alt='KuvaIkoni' />
        
    </div>
</div>
)
}
