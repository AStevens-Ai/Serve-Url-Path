const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    const urlLink = url.parse(req.url, true);
    const path = urlLink.path;

    if (path === "/") {
      serveHtmlFile("index.html", res);
    } else if (path === "/about") {
      serveHtmlFile("aboutme.html", res);
    } else if (path === "/contact") {
      serveHtmlFile("contact-me.html", res);
    } else {
      serveHtmlFile("404.html", res);
    }
  })
  .listen(8080);

function serveHtmlFile(filePath, res) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Error Reading File");
    } else {
      res.write(data);
      res.end();
    }
  });
}
