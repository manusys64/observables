const http = require('http');
const url = require('url')

const hostname = '127.0.0.1';
const port = 4200;


function handleServerRequest(request, response) {
    let urlParts = url.parse(request.url, true)
    switch(urlParts.pathname){
        case '/doit':
            JackWithAddress(urlParts, request, response)
            
            break;
        default:
            response.writeHead(404, {
                'Access-Control-Allow-Origin': '*'
            })
            response.end('Invalid API call')
            break
    }
}

function JackWithAddress(urlParts, request, response) {
    let address = urlParts.query.address ? urlParts.query.address : 'undefined';

    /*
        query the database, do business logic, hit another api what ever you want.
    */

    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.end(`you send me ${address}`)
}


const server = http.createServer((req, res) => {
  handleServerRequest(req, res)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});