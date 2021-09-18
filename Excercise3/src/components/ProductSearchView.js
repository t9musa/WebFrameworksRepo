import React from 'react'
import ProductSearchResult from './ProductSearchResult'
import styles from './ProductSearchView.module.css'

export default function ProductSearchView(props) {
    return (
    <div>
        <div className={styles.productFrame}>
            {
             props.listings.map(listing => <ProductSearchResult key={listing.id} {...listing}/>)
            }
        </div>
    </div>
    )
}
