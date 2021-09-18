import React from 'react'
import styles from './ProductSearchResult.module.css'

export default function ProductSearchResult(props) {
    return (
        <div className={styles.productContainer}>
            <div>
                <img src={`/images/${props.image}`} />
            </div>
            <div className="ProductSearchResult" style={{paddingTop:"15px", paddingBottom:"10px"}}>Name: { props.name }</div>
            <div>Producer: { props.producer }</div>
            <div>Rating: { props.rating } stars out of 5.0</div>
            <div>Price: ${ props.price }</div>
            <div>Arrival date: { props.arrivaldate }</div>
        </div>
    )
}
