  import React from 'react';
  import ProductSearchView from './components/ProductSearchView';
  import TopBar from './components/TopBar'
  import data from './data.json'
  import AdminMode from './components/AdminMode'
  
  class App extends React.Component 
  {

    constructor(props) 
      {
        super(props); 
        this.state ={
          productSearchText: "",  
          listings: data.listings,
          adminModeActive: false,
        }
      }
      onProductSearch = (event) => {
        console.log('Keyboard event');
        console.log(event.target.value);
        this.setState({ productSearchText: event.target.value });
      }

      deleteProduct = productId => this.setState({
        items: this.state.listings.filter(listing => listing.id !== productId)})

      addProduct = (name, producer, rating, price, arrivaldate) => {
        let newProductList = [...this.state.listings];
        newProductList.push({
          id: newProductList.length + 1,
          name: name,
          producer: producer,
          rating: rating,
          price: price,
          arrivaldate: arrivaldate
        });
        this.setState({
          listings: newProductList
        });
      }


    render() 
    {
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
              items={ this.state.listings }
              deleteItem={ this.deleteProduct }
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