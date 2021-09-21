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
*/
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

let products = [
    {
    id: uuidv4(),
    name: 'Roomba 3000',
    manufacturer: 'Henry', 
    category: 'Automatic Vacuum',
    description:'Automatic Vacuum, that sweeps the floors automatically',
    price: '$399',
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

//delete a singular product
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})