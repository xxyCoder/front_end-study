const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const data = Buffer.alloc(1024).fill(666);
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  if (/xhr/.test(url)) {
    res.end(data);
    return ;
  } else if (/fetch/.test(url)) {
    if (/read/.test(url)) {
      res.end(data);
    } else if (/get-json/.test(url)) {
      res.end(JSON.stringify("fetch get"));
    } else if (/post-json/.test(url)) {
      let content = "";
      req.on("data", chunk => {
        content += chunk;
      });
      req.on("end", () => {
        console.log("post: ",content);
      })
    }
  }
});

server.listen(3000);