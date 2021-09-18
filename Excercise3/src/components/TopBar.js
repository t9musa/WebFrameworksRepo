    import styles from './TopBar.module.css'
    import React from 'react'
    import SearchBar from './SearchBar'


    class TopBar extends React.Component 
    {
        render() 
        {
            return (
            <div> 
                <div className={styles.topBarcontainer}>
                    <h2>Welcome to Amazing.com</h2>
                    <SearchBar productSearchText={this.props.productSearchText} onProductSearch={this.props.onProductSearch}/>
                </div>
            </div>
            )
        }
    }
    export default TopBar;

