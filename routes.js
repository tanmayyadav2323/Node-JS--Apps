const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    //url both the string and has the folloung value
    if (url === '/') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type = "text" name="message"><button type="submit">Send</button></form><body>');
        res.write('</html>');
        return res.end();
        //It sends the input request by the server and make it acccessible via the assigned name.
        //Not to return the response but to come out from this function
    }

    if (url === '/message' && method === 'POST') {
        //stream - all  packets are going to the request
        //buffer -- like a bus stop, packets are in buffer before going to the req
        //chunk -- the data packets 

        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        //The bus stop
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            //Bcoz we know the incoming req will be text --> converted to string.
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message); // Sync method will stop the code exectutaion until this file is created like await
            //It will block all the incoming requests to the server 
            //avoid sync as it will block the code executiom

            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302; // The resource requested has temporaliry moved to the url
                res.setHeader('Location', '/');
                return res.end();
            });
        });

    }

    //The respose code to the incoming req
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page </title><head>');
    res.write('<body><h1>Hello from node.js server </h1><body>');
    res.write('</html>');
    res.end();
    //Need to end 
}

// module.exports = {
//     handler : requestHandler,
//     someText : 'Some hard coded text'
// };

exports.handler = requestHandler;
exports.someText = 'Some hard coded Text';