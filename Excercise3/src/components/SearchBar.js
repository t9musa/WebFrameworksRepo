import React, { Component } from 'react'

export default class SearchBar extends Component {

    
    render() {
        return (
            <div>
                <div>
                    <input className="SearchBar" style={{width: '320px', height: '20px'}} 
                    type="text" placeholder='Search here' onChange={ this.props.onProductSearch }
                     value={ this.props.productSearchText }/>
                </div>
            </div>
        )
    }
}
