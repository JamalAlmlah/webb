const posts = require("./posts");
const http = require("http");
const StringDecodeer = require("string_decoder").StringDecoder;

const httpServer = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Request-Method", "*");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  response.setHeader("Access-Control-Allow-Headers", "*");
  if (request.method === "OPTIONS") {
    response.writeHead(200);
    response.end();
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
    payload += decoder.write(data);
  });
  request.on("end", () => {
    payload += decoder.end();

    if (route === "forum" && method === "GET") {
      response.setHeader("Conent-Type", "application/json");
      response.writeHead(200);
      response.end(JSON.stringify({ post: "En forum post" }));
    } else if (route === "posts" && method === "POST") {
      console.log(payload);
      const post = JSON.parse(payload);
      const data = {
        title: post.title,
        excerpt: post.content,
        content: post.content,
        writtenBy: post.name,
        id: posts.length + 1,
      }
      posts.push(data);
      response.writeHead(200);
      response.end();
    } else if (route === "posts" && method === "GET") {
      if (dynamicArguments.length === 0) {
        response.setHeader("Connet-Type", "application/json");
        response.writeHead(200);
        response.end(JSON.stringify(posts));
      } else {
        const id = dynamicArguments[0];
        const poster = posts.filter(post => post.id == id);
        response.setHeader("Connet-Type", "application/json");
        response.writeHead(200);
        response.end(JSON.stringify(poster));
      }
    } else {
      response.writeHead(404);
      response.end("Sidan kunde inte hittas");
    }
  });
});
httpServer.listen(8000, () => console.log("webbserver startad på port 8000"));
