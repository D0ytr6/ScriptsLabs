const client = require('./client.js');
const express = require("express");
const conf = require("./service")

const fs = require("fs");
 
const app = express();

app.use(function(request, response, next){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});
 
app.use("/", async function (request, response, next) {
    const result = await client.makeRequest();
    response.send(result.data);
  });
  
module.exports = app;
