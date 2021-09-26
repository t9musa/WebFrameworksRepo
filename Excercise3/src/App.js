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