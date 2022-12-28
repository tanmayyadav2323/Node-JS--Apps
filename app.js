// const http = require('http');
const path = require('path');

const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(express.urlencoded({ extended: true }));

//It will automatically forward the requests to the public folder
app.use(express.static(path.join(__dirname,'public')));

//so the only routes starting with the admin will go to the admin routes
app.use('/admin',adminRoutes);
app.use(shopRoutes);

//It will be used for multiple requests
// app.use((req, res, next) => {
//     console.log("In the middleware");
//     next(); //It will go through the next middleware through this function
// })

//THE REQUEST GO THROUGH THE FILE FROM TOP TO BOTTOM
// app.use('/add-product', (req, res, next) => {   // The url must start with a slash
//     console.log("In the next middleware");
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
//     // res.send('<h1>Hello from Express! </h1>');
// });


// //This will for only work for the incoming post requests

// app.post('/product', (req, res, send) => {
//     console.log(req.body);
//     res.redirect('/');
// });


// app.use('/', (req, res, next) => {   // The url must start with a slash
//     console.log("In the next middleware");
//     res.send('<h1>Hello from Express! </h1>');
// });


//This will have the default path of / 
//if we are having any path then
//this error page will come
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);
// const server = http.createServer(app);
// server.listen(3000);