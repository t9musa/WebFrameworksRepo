import React from "react";
import Title from './components/Title';
import ShoppingList from './components/ShoppingList';
import styles from './App.module.css';
import './App.css';

/* A ES6 class style stateful component for the shopping list application */
class App extends React.Component {
  constructor(props)
  {
    /* You should call super(props) before any other statement. 
       Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
    */
    super(props);

    this.state = {
      items: [
        { id: 1, value: 'Milk', qty: 5, unit: 'ltr' },
        { id: 2, value: 'Bananas', qty: 6, unit: 'pcs' },
        { id: 3, value: 'Bread', qty: 3, unit: 'x' },
        { id: 4, value: 'Eggs', qty: 16, unit: 'x' }
      ]
    };
  }
      /* setTimeout(() => {
        //this.state.item = []
        this.setState({ items: [...this.state.items, {id: 5, value: "carrots", qty: 5}] } );
      
          }, 2000);
          */
          //this.addSomeCarrots = this.addSomeCarrots.bind(this);
   //changes
  //tehtävässä 2 pitää käyttää for lausetta että käydään kaikki listat läpi ja nähdään että onko
  //siellä jo olemassa vaikka porkkanoita. Jos on sitten uuden rivin sijaaan tulee 
  //addSomeCarrots= () =>{
  //  this.setState({ items: [...this.state.items, {id: 5, value: "carrots", qty: 1, unit: 'x'}] } ); 
  //}
  //vanhan systeemin mukaan jokainen tuote tarvitsi oman set.state rivinsä
  /*
  addSomeStrawberries= () =>{
    this.setState({ items: [...this.state.items, {id: 6, value: "strawberries", qty: 5, unit: 'x'}] } );
  }
  addSomeYoghurt= () =>{
    this.setState({ items: [...this.state.items, {id: 7, value: "Yoghurt", qty:2, unit: 'x'}] } );
  }
  addSomeBeer= () =>{
    this.setState({ items: [...this.state.items, {id: 8, value: "Beer", qty:3, unit: 'x'}] } );
  }
  */
  addFootItem = (stuffDescription, quantity) => 
  {
    return () => 
    {
      const searchResult=this.state.items.findIndex((element, index, array) => 
      {
        if (element.value === stuffDescription)
        { return true; 
        } 
        else 
        {
        return false
        }
      });

      if(searchResult !== -1) {
        console.log("Success! The id number: " + searchResult + " matches the " + stuffDescription);
        let newItems = [...this.state.items];
        newItems[searchResult].qty += quantity;

        this.setState({items: newItems});
      } else {
        console.log("Did not find id matching that number!");
        this.setState({
          items:
          [...this.state.items,
            {
              id: this.state.items.length +1,
              value: stuffDescription, qty:quantity
            }
          ]
        });
      }    
   }
 }

  removeBasedOnID =(idToBeRemoved) => {
    console.log("Delete item in id: "+ idToBeRemoved );
    let newItems = this.state.items.filter(item => item.id !== idToBeRemoved)
    this.setState({items: newItems});
    /*
    let indexToBeDeleted = this.state.items.findIndex(item=> item.id === idToBeRemoved);

    if (indexToBeDeleted !== -1) 
    {
      let newItems = [...this.state.items];
      newItems.splice(indexToBeDeleted, 1);
      this.setState({items: newItems});
    }
    */
  }
  //oma yritys johon lisätty splice
  removeFoodItem=(stuffDescription) => 
  {
    return () => 
    {
      const searchResult=this.state.items.findIndex((element, index, array) => 
      { if (element.value === stuffDescription)
        { return true; 
        } else {
        return false
        }
      });
      if(searchResult !== -1) {
        console.log("Success! The id number: " + searchResult + " matches the " + stuffDescription);
        let newItems = [...this.state.items];
        newItems.splice(this.state.items.value[searchResult], 1);
        this.setState({items: newItems});
      } else {
        console.log("Did not find id matching that number!");
        console.log("Nothing to delete");
      }}}

  render()
  {
    const { applicationDescription, applicationName } = this.props;
    return <div className={ styles.shoppingList }>
      <Title 
        applicationDescription={ applicationDescription }
        applicationName={ applicationName }
      />
      <ShoppingList items={ this.state.items } removeBasedOnID={this.removeBasedOnID}/>

        <button onClick={ this.addFootItem ("Carrots", 5) }> Add Carrots!</button>
        <button onClick={ this.addFootItem ("Strawberries", 2) }> Add Strawberries!</button>
        <button onClick={ this.addFootItem ("Yoghurt", 1) }> Add Yoghurt!</button>
        <button onClick={ this.addFootItem ("Beer", 6) }> Add Beer!</button>

      <div className="App" style={{display: 'flex', flexDirection: 'row'}}>
        <button onClick={ this.removeFoodItem ("Carrots") }>Delete Carrots</button>
        <button onClick={ this.removeFoodItem ("Strawberries") }>Delete Strawberries</button>
        <button onClick={ this.removeFoodItem ("Yoghurt") }>Delete Yoghurt</button>
        <button onClick={ this.removeFoodItem ("Beer") }>Delete Beer</button>
      </div>
    </div>
  }
}

export default App;