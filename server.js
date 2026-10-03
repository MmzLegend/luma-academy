const http = require("http"),
  fs = require("fs"),
  path = require("path");
const root = __dirname;
http
  .createServer((req, res) => {
    const p = new URL(req.url, "http://localhost").pathname;
    const file = path.join(root, p === "/" ? "index.html" : p);
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end();
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("Not found");
      }
      res.setHeader(
        "Content-Type",
        {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "text/javascript",
          ".svg": "image/svg+xml",
        }[path.extname(file)] || "application/octet-stream",
      );
      res.end(data);
    });
  })
  .listen(8894, "127.0.0.1", () =>
    console.log("Luma Academy: http://127.0.0.1:8894"),
  );
