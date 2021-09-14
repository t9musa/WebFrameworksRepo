import React from 'react'
import styles from './Title.module.css'


    const Title = props => {
        return  <div className="test">
            <h1 className= {styles.title}>{props.applicationName} </h1>
            <div clasNanme={styles.titleSub}>{props.applicationDescription} </div>

        </div>
}

export default Title;


