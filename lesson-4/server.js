const logEvent = require("./logEvent");
const path = require("path");
const http = require("http");
const fs = require("fs");
const fsPromise = require("fs").promises;

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

const PORT = process.env.PORT || 3500;

const serveFie = async(filePath, contentType, response) => {
    try {
        const data = await fsPromise.readFile(filePath, 'utf8');
        response.writeHead(200, {'Content-Type': contentType });
        response.end(data)
        
    } catch (error) {
        console.log(error);
        response.statusCode = 500;
        response.end()
    }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath;

  if (contentType === "text/html" && req.url === "/") {
    filePath = path.join(__dirname, "views", "index.html");
  } else if (contentType === "text/html" && req.url.slice(-1) === "/") {
    filePath = path.join(__dirname, "views", req.url);
  } else if (contentType === "text/html") {
    filePath = path.join(__dirname, "views", req.url);
  } else {
    filePath = path.join(__dirname, req.url);
  }


  if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath)

  if(fileExists) {

  }else {
    switch(path.parse(filePath).base){
        case 'old-page.html': 
            res.writeHead(301, {"Location": '/new-page.html'});
            break
        case 'www-page.hmtl':
            res.writeHead(301, {"Location": '/'});
            res.end();
            break
        default:
    }
  }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

// emitter.on("log", (msg) => logEvent(msg))

//     emitter.emit("log", "Log event emitted!")
