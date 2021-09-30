const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { all } = require('express/lib/application');
const productData = require('./data.json');
const cors = require('cors'); 

app.use(bodyParser.json());
app.use(cors());

////////////////////////
// Arrays used in EX4 //
////////////////////////

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
    name: 'Auto-Lawnmover Maximus',
    manufacturer: 'Husqvarna', 
    category: 'Automatic Lawnmower',
    description:'Lawnmower that keeps care of your grass daily',
    price: '450'
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

//default page for localhost:4000
app.get('/', (req, res) => {
  res.json('hello world');
})

////////////////////////////////////////////////////////////////////
// PATCH, POST, DELETE AND GET functions used for EX4 (standalone) //
////////////////////////////////////////////////////////////////////

//EX4 uses uuidv4() to create unique identifiers, so you need
//to copy and paste them to get the functions to work.

//GET all products
//USE THIS REQUEST TO GET THE PRODUCT ID'S FOR THE OTHER FUNCTIONS//
/*POSTMAN:
http://localhost:4000/products/
*/
app.get('/products', (req, res) => {
  res.json(products);
  })

//GET a singular product. Use "get all products" to get the productID
/*Postman:
http://localhost:4000/products/"product ID here"

for example the following:
http://localhost:4000/products/2f0e7d0e-1845-4a58-a6c8-eadf6dee44d1
*/
app.get('/products/:id', (req,res) => {
    const result = products.find(d => d.id === req.params.id)
    res.json(result);
})

//GET all products but depending on the "productSearchText", the results differ.
//Search for products based on name, manufacturer, and category
//type "http://localhost:4000/search" to browser, and consider the "productSearchText"
//as the searchbar
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

   //create a new product (POST)
   //http://localhost:4000/products
   /*POSTMAN, body, raw, JSON
   "{
    "name":"Fire alarm",
    "manufacturer": "Volvo",
    "category":"Home security",
    "description": "Secure your house",
    "price": "100"
   }"
     */
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
  res.send('New product added');
})

//modify a product (PATCH)
//http://localhost:4000/products/"productID"
/*
{
    "name": "DifferentName"
}
*/
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

//DELETE a singular product
//http://localhost:4000/products/"productID"
app.delete('/products/:id', (req,res) => {
  products = products.filter((product) => product.id !==req.params.id )
  res.send("Product with id "+req.params.id+" deleted")
  })

  //DELETE all products
  //http://localhost:4000/products
  app.delete('/products', (req,res) => {
    products.splice(0, products.length);
    res.send('All products deleted');
  })

//create a new user (POST)
//NOTE that you should use the default user for further testing
/* http://localhost:4000/users
"{
    "name": "Jimbo Jones",
    "address":"Jumbo Road 5",
    "phone": "555555555"
}"
*/
app.post('/users', (req, res) => {
  users.push({
    userID: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  })
  res.send('User successfully created')
})

  //GET all users
  //USE THIS REQUEST TO GET THE USER ID'S FOR THE OTHER FUNCTIONS//
  // http://localhost:4000/users
app.get('/users', (req, res) => {
  res.json(users);
})

//DELETE a user
//http://localhost:4000/users/"userID"
app.delete('/users/:id', (req,res) => {
  users = users.filter((users) => users.userID !==req.params.id )
  res.send("User with id "+req.params.id+" deleted")
  })


// add (POST) a product and an amount to the shopping cart array inside the users array
//  http://localhost:4000/purchase/"userID"
/*
  "{
    "productID": ""productID"",
    "amount": 3
  }"
*/
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
  res.send("Added the given amount of items to the cart")
  }
  res.send("Operation failed, maybe it was the wrong id?");
})
//GET shoppingcart contents with user id
// http://localhost:4000/cart/"userID"

app.get('/cart/:id', (req, res) => {
  const userID = users.find(d => d.userID === req.params.id);
  if (userID !== undefined) {
    res.send(userID.shoppingCart);
  } else {
    res.send("Something went wrong")
  }
})

//buy (POST) everthing in your shopping cart with userID. Empty your shoppingcart in
//the users array and add the contents to the invoices array with the total price and
//the amount of products

//  http://localhost:4000/buyShoppingcart
/*
"{
    "id": ""userID""
}"
*/
app.post('/buyShoppingcart', (req, res) => {
  const userID = users.find(d => d.userID === req.body.id);
  let finalPrice=0;
  let productIds = []; 
  let product;
  let productNames = [];
  let productName;
    //adding information the to the arrays above with for loops and 
    //later pushing them to the
    //invoice array on a later row
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
    userID.shoppingCart.splice(0,userID.shoppingCart.length); //clear out shoppingcart for future purchases
  res.send('Invoice was added successfully'); 
  } else {
    res.send("Something went wrong")
  }
  })

  //GET all invoices from users array
  // http://localhost:4000/invoices/"userID"
  
  app.get('/invoices/:id', (req, res) => {
    const userID = users.find(d => d.userID === req.params.id);
    if (userID !== undefined) {
      res.send(userID.invoices);
    } else {
      res.send("Something went wrong")
    }
  })

////////////////////////////////////////////////////
// Here are the post and delete functions for EX5 //
////////////////////////////////////////////////////

//these functions aren't a part of EX4


  //get all listings
  app.get('/listings', (req, res) => {
    res.json(productData);
    })

//create a new product to listings
//you can use the web application adminmode 
//to add and delete listings, here is an example for postman
/*
"{
    "id": 5,
    "name": "summin",
    "producer": "someone",
    "rating": "5.0",
    "price": 800,
    "arrivalDate": "September 1911"
}""
*/
app.post('/listings', function (req, res) {
  console.log("Found the right post request")
  productData.listings.push({
    id: productData.listings.length+1,
    name: req.body.name,
    producer: req.body.producer,
    rating: req.body.rating,
    price: req.body.price,
    arrivalDate: req.body.arrivalDate,
  })
  res.send(productData);
})
//delete singular listing
//listingID
app.delete('/listings/:id', (req,res) => {
  console.log(req.params.id)
  var parameterToInt = parseInt(req.params.id);
  let index = productData.listings.findIndex((element)=>element.id===parameterToInt)
  if (index !== -1) {
  console.log(index);
  var x = productData.listings.splice(index, 1);
  console.log(x);
  }
  else{
    console.log("operation failed...index was " +index)
  }
  res.send(productData);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})