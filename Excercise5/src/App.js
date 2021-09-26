import React from 'react';
import ProductSearchView from './components/ProductSearchView';
import TopBar from './components/TopBar'
import AdminMode from './components/AdminMode'
import axios from 'axios'

class App extends React.Component 
{
  constructor(props) 
    {
      super(props); 
      this.state ={
        productSearchText: "",  
        listings: [],
        adminModeActive: false,
      }
      console.log("Constructor");
    }
    componentDidMount() {
      console.log("Mounted");
      axios.get('http://localhost:4000/listings')
      .then(response => {
        console.log(response);
        this.setState({ listings: response.data.listings })
      })
      .catch(err => console.log(err));
    }

    onProductSearch = (event) => {
      console.log('Keyboard event');
      console.log(event.target.value);
      this.setState({ productSearchText: event.target.value });
    }

    deleteProduct = (productID) => {
      axios.delete('http://localhost:4000/listings/'+productID,{
        id: productID
      })
      .then(response =>{
        console.log(response);
        this.setState({listings: response.data.listings})
      })
      .catch(err =>console.log(err));
    }

    addProduct = (name, producer, rating, price, arrivaldate) => {
      console.log("Adding a new product");
      axios.post('http://localhost:4000/listings', {
        name: name,
        producer: producer,
        rating: rating,
        price: price,
        arrivaldate: arrivaldate,
      })
      .then(function (response) {
        console.log(response);
        this.setState({ listings: response.data.listings })
      })
      .catch(function (error) {
        console.log(error);
      });
      
      let newProductList = [...this.state.listings];
      this.setState({
        listings: newProductList
      }); 
    }

  render() 
  {
    console.log("Render");
    let output = 
    <>
      <div> 
          <TopBar productSearchText={this.state.productSearchText} onProductSearch={this.onProductSearch}></TopBar>
          
          <ProductSearchView
          listings={ this.state.listings.filter((listing) => listing.name.toLowerCase().includes(this.state.productSearchText) || listing.name.includes(this.state.productSearchText)) }
          />
          <button onClick={() => this.setState({adminModeActive: !this.state.adminModeActive})}>Admin mode</button>
      </div>
    </> 

if(this.state.adminModeActive) {
output = <AdminMode
            disableAdminMode={() => this.setState({adminModeActive: false}) }
            addProduct={ this.addProduct }
            listings={ this.state.listings }
            deleteProduct={ this.deleteProduct }
         />;
}

    return (
    <>
    { output }
    </>
    )
  }
}
export default App;