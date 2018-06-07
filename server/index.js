//IMPORTS / REQUIRES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

//VARIABLES
const app = express();
const port = 3008;

//TOP LEVEL MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(__dirname + './../public/build'));

massive(process.env.DATABASE).then(function(db) {
  app.set('db', db);
});

//ENDPOINTS
/////Create/////
//app.post('/api/login')
//app.post('/api/add_to_cart’)

/////Read/////
//app.get('/api/check_login')
//app.get('/api/get_products/:category')
//app.get(‘/api/get_product/:id’)
//app.get(‘/api/search’) (user url query)

/////Update/////
//app.put('/api/update_quantity/:id') (carry amount on body)
//app.put('/api/finish_check_out') (have a purchased column say ‘true’)

/////Delete/////
//app.delete('/api/delete_from_cart/:id')

//LISTEN
app.listen(port, () => console.log(`listening on port ${port}!`));