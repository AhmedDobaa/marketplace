
var express= require('express');
let pool = require('./dbconnection/mysqlPool');
var cors = require('cors');
var bodyParser= require('body-parser');
const http = require('http');

// routes
var users= require('./route/user.route');
var products= require('./route/products.route');
var orders= require('./route/orders.route');

// documentation
const swaggerUi= require('swagger-ui-express');
const swaggerDocument= require('./swagger.json');

var app= express();

app.use(cors());

// If you're using express > 4.16, you can use express.json() and express.urlencoded()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// bodyParser is deprecated in express >  4.16
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);

app.listen(3000, ()=> {
     console.log('server started .....')
})

// http.createServer( app )
//     .listen(3000);


module.exports = app