require("./project").server({
  //httpPort: process.env.PORT || 8080 // Optional, but added here for demo purposes
  "sslCert": "cert.pem",
  "sslKey":"key.pem",
}); 

/* const https = require('https');
var url = require('url');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.end("hello world\n");
}).listen(8000); */