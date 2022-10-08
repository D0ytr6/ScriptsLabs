// // підключення express
// const express = require("express");
// // створюємо об’єкт додатка
// const app = express();
// // визначаємо обробник для маршруту "/"
// app.get("/", (request, response) => {
    
//     // відправляємо відповідь
//     response.send("<h2>Привет Express!</h2>");
// });

// app.get("/about", (request, response) => {
     
//   response.send("<h1> About </h1>");
// });
 
// app.get("/contact", (request, response) => {
   
//   response.send("<h1> Contacts </h1>");
// });

// // починаємо прослуховувати підключення на 3000 порту
// app.listen(3000);



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