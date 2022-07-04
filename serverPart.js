const http = require('http');
const fs = require('fs');
const path = require('path'); // lib for working vith path in 

const PORT = 3000;
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`); // automatic create path for routing on server use actual path and url req
let basePath = '';

const server = http.createServer ((req, res) => {
    console.log('Server request');
    console.log('Just for test');

    res.setHeader('content-Type', 'text/html'); //use html out data

    switch(req.url){                                   // basic routing for DOME
        case '/':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end;
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;                   //set code for status of request 404 page not found
            break;
    };
        fs.readFile(basePath, (err, data) => {
            if (err) {
                console.log(err);
                res.statusCode = 500;              //set code for status of request 500 server error
                res.end();                         //end processing of request
            }
            else {
               res.write(data); 
               res.end();
            }

        });
});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Server started on port ${PORT}`);
});