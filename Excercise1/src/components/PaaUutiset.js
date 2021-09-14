import React from 'react'
import styles from './PaaUutiset.module.css'


export default function PaaUutiset() 
{
    return (
    <div className={styles.paaUutisetContainer}>

        <div className={styles.keskiLaatikko}>
            <div className={styles.paaUutisetBox}>
                <img className= {styles.image} src='hesariPNG.png' alt='KuvaIkoni' />
                <h2>Täällä on pääkuvan uutiskappale Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</h2>
            </div>
            <div className={styles.paaUutisetBox}>
                <img className= {styles.image} src='hesariPNG.png' alt='KuvaIkoni' />
                <h2>Täällä on toinen uutiskappale Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</h2>
            </div>
        </div>


        <div className={styles.luetuimmat}>
            <h2 className={styles.LuetuimmatTeksti}>Luetuimmat</h2>
                <div className={styles.palkki}>
                    <div className={styles.numero}>1</div>
                    <div className={styles.uutiset}>SampleTextSampleTextSampleText</div>
                    
                </div>
                <div className={styles.palkki}>
                    <div className={styles.numero}>2</div>
                    <div className={styles.uutiset}> Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</div>
                </div>
                <div className={styles.palkki}>
                    <div className={styles.numero}>3</div>
                    <div className={styles.uutiset}> Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</div>
                </div>
                <div className={styles.palkki}>
                    <div className={styles.numero}>4</div>
                    <div className={styles.uutiset}> Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</div>
                </div>
                <div className={styles.palkki}>
                    <div className={styles.numero}>5</div>
                    <div className={styles.uutiset}> Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</div>
                </div>
                <div className={styles.palkki}>
                    <div className={styles.numero}>6</div>
                    <div className={styles.uutiset}> Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</div>
                </div>
                <div className={styles.palkki}>
                    <div className={styles.numero}>7</div>
                    <div className={styles.uutiset}> Täällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisiaTäällä on uutisia</div>
                </div>
                <div className={styles.palkki}>
                    <button className={styles.uutiset}> Näytä lisää</button>
                </div>
        </div>

        
    </div>
    )
}


