const http = require('http');
const routes = require('./routes');

console.log(routes.someText);

//url is after / (slash)
//localhost:3000/test -->test -->url
const server = http.createServer(routes.handler);

//Execute the function stored in routes for the incoming requests
//Can only excess stuff can manipulate the file . That means we cannot 
//change the file we exported . 


server.listen(3000);