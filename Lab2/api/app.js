require('dotenv').config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {

    if(process.argv[2] == 'env'){
      res.send(process.env.CHANGED_HELLO);
    }
    else
      res.send(process.env.HELLO);
});

app.get("/user", (req, res) => {

    res.send({name: process.env.NAME, age: process.env.AGE});
});


module.exports = app;