import React, { Component } from 'react'

class AdminMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newProductName: "",
          newProducer: "",
          newRating: "",
          newItemPrice: "",
          newArrivalDate: "",
        }
      }

      addProduct = () => {
        this.props.addProduct(this.state.newProductName, this.state.newProducer, this.state.newRating, this.state.newItemPrice, this.state.newArrivalDate);
      }

        onDeleteProductClick = (productID) => {
        console.log("clicked delete for item id " + productID);
        this.props.deleteProduct(productID);
        }   

    render() {
        return (
            <div>
                <h1>Add a new listing</h1>

                <div>
                    Name<input type="text" onChange={ (event) => this.setState({ newProductName: event.target.value }) }/>
                </div>
                <div>
                    Producer<input type="text" onChange={ (event) => this.setState({ newProducer: event.target.value }) }/>
                </div>
                <div>
                    Rating<input type="text" onChange={ (event) => this.setState({ newRating: event.target.value }) }/>
                </div>
                <div>
                    Price<input type="text" onChange={ (event) => this.setState({ newItemPrice: event.target.value }) }/>
                </div>
                <div>
                    Arrival Date<input type="text" onChange={ (event) => this.setState({ newArrivalDate: event.target.value }) }/>
                </div>
                <button onClick={ this.addProduct }>Add listing</button>

                <button onClick={ this.props.disableAdminMode }>Disable admin mode</button>
            
                <h2>List of featured products</h2>
                { this.props.listings.map((product, index) =>
                <div key ={index}>
                    <button onClick={() => this.onDeleteProductClick(product.id)}>X</button>,{product.name}, {product.producer}, {product.rating}, {product.price}, {product.arrivaldate}
                </div>)}
                
            </div>
        )
    }
}

export default AdminMode;