import React from "react";
import ShoppingListItem from './ShoppingListItem';


const ShoppingList = props => {
  return <ul>
    {
      props.items.map(i => <ShoppingListItem {...i} key={ i.id }/>)
    }
  </ul>
}

export default ShoppingList;