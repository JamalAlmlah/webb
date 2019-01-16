require("./posts");
const http = require("http");
const StringDecodeer = require("string_decoder").StringDecoder;

const httpServer = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Methods', '*');
  response.setHeader('Access-Control-Allow-Headrs', 'OPTIONS, GET');
  response.setHeader('OPTIONS', '*');
  if (request.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let route = request.url;
  const method = request.method;
  let dynamicArguments = request.url.split("/");
  route = dynamicArguments[1];
  dynamicArguments = dynamicArguments.splice(2);
  const headers = request.headers;
  const decoder = new StringDecodeer("utf8");
  let payload = "";
  request.on("data", data => {
    payload += decoder.end();
  });
  request.on("end", () => {
    payload += decoder.end();
  });
  if (route === "forum" && method === "GET") {
    response.setHeader("Conent-Type", "application/json");
    response.writeHead(200);
    response.end(JSON.stringify({ post: "En forum post" }));
  }
});
httpServer.listen(8000, () => console.log("webbserver startad på port 8000"));
