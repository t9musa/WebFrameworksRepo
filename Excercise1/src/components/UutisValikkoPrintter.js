import React from 'react'
import styles from './UutisValikkoPrintter.module.css'


export default function UutisValikkoPrintter(props) {
    return (
        <div className={ styles.NewsContainer}>
        <span className={styles.PaaOtsikko}>
            {props.topic}:
            </span> {props.body}
        </div>
    )
}
