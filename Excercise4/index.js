/*
The task of excercise 4 is to create an API
with Express JS to support basic operations 
needed to run an e-commerce app
No database, stored in the Memory
The operations needed are the following:
*create a new product (name, manufacturer, 
 category, description, price,
 bonus image)
* get all products
* get singular product
* modify a product
* Search for products based on 
  name, manufacturer,category
        USER
* Create user (basic information name, address etc.)
    Purchase / Invoice
* Purchase products for a user -> create invoice with information of all the bought products + total sum
* Get invoices of a user
* Get a single invoice of a user
* Delete invoice of a user
*/
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { all } = require('express/lib/application');

app.use(bodyParser.json());

let products = [
    {
    id: uuidv4(),
    name: 'Roomba 3000',
    manufacturer: 'Henry', 
    category: 'Automatic Vacuum',
    description:'Automatic Vacuum, that sweeps the floors automatically',
    price: '399',
    },
    {
    id: uuidv4(),
    name: "Auto-Lawnmover Maximus",
    manufacturer: "Husqvarna", 
    category: "Automatic Lawnmower",
    description:"Lawnmower that keeps care of your grass daily",
    price: "450"
    }];

    let users = [
      {
        userID: uuidv4(),
        name: 'Jack Jones',
        address: '123 MainStrt.',
        phone: '12332112332',
        shoppingCart: [],
        invoices: []
    }];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//get all products
app.get('/products', (req, res) => {
    res.send(products)
  })

//get a singular products
app.get('/products/:id', (req,res) => {
    const result = products.find(d => d.id === req.params.id)
    res.json(result);
})

//create a new product (POST)
app.post('/products', (req,res) => {
    console.log('Creating a new product');
    console.log(req.body);
    products.push({
        id: uuidv4(),
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price
    })
    console.log('Product name: ' + req.body.name);
    res.send('Creating a new product');
})

//modify a product (Patch)

app.patch('/products/:id', (req,res) => {
  const {name, manufacturer, category, description, price} = req.body;
  const product= products.find((product) => product.id === req.params.id);

  if (name) product.name=name;
  if (manufacturer) product.manufacturer=manufacturer;
  if (category) product.category=category;
  if (description) product.description=description;
  if (price) product.price=price;
    
  res.send('Product with the id '+ req.params.id + ' has been updated');
})

//delete singular product
app.delete('/products/:id', (req,res) => {
products = products.filter((product) => product.id !==req.params.id )
res.send("Product with id "+req.params.id+" deleted")
})

//delete all products
app.delete('/products', (req,res) => {
  products.splice(0, products.length);
  res.send('All products deleted');
})

/*Search for products based on 
  name, manufacturer,category*/

app.get('/search', (req, res) => {

 let productSearchText= "vac";
 let result = products.filter((product) => 
  product.name.includes(productSearchText) ||
  product.name.toLowerCase().includes(productSearchText) || 
  product.manufacturer.includes(productSearchText) || 
  product.manufacturer.toLowerCase().includes(productSearchText) ||
  product.category.includes(productSearchText) ||
  product.category.toLowerCase().includes(productSearchText));
  
  res.send(result);
  console.log('Results for searchString '+ productSearchText+ ' is '+result);
});
//create a new user
app.post('/users', (req, res) => {
  users.push({
    userID: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  })
  res.send('User successfully created')
})
//get all users
app.get('/users', (req, res) => {
  res.json(users);
})
//delete user
app.delete('/users/:id', (req,res) => {
  users = users.filter((users) => users.userID !==req.params.id )
  res.send("User with id "+req.params.id+" deleted")
  })

// add item to shopping cart body input is userID 
//and json input is productID and amount
app.post('/purchase/:id', (req, res) => {
  const userID = users.find(d => d.userID === req.params.id);
  const productList = products.find(d=> d.id === req.body.productID);
  if (userID !== undefined) {
  const x = {
    id: req.body.productID,
    name: productList.name,
    price: productList.price,
    amount: req.body.amount
  }
  userID.shoppingCart.push(x)
  res.send("Added the given amount of items to cart")
  }
  res.send("Operation failed, maybe it was the wrong id?");
})
//get shoppingcart contents with user id
app.get('/cart/:id', (req, res) => {
  const userID = users.find(d => d.userID === req.params.id);
  if (userID !== undefined) {
    res.send(userID.shoppingCart);
  } else {
    res.send("Something went wrong")
  }
})

//buy everthing in your shopping cart (input is userID)
app.post('/buyShoppingcart', (req, res) => {
  const userID = users.find(d => d.userID === req.body.id);
  let finalPrice=0;
  let productIds = []; 
  let product;
  let productNames = [];
  let productName;
  
    for(z=0; z < userID.shoppingCart.length; z++) {
      finalPrice += userID.shoppingCart[z].price*userID.shoppingCart[z].amount;
    }
    for(z=0; z < userID.shoppingCart.length; z++) {
      productName= userID.shoppingCart[z].name;
      product = userID.shoppingCart[z].id;
    for(b=1; b<=userID.shoppingCart[z].amount; b++) {
      productNames.push(productName)
      productIds.push(product);
    }}
  const y = {
    id: uuidv4(),
    productIDs: productIds,
    productNames: productNames,
    totalPrice: finalPrice
  }
  if (userID !== undefined) {
    userID.invoices.push(y);
    userID.shoppingCart.splice(0,userID.shoppingCart.length);
  res.send('successful operation'); 
  } else {
    res.send("Something went wrong")
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})