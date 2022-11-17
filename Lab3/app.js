const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
   
const app = express();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
 
let dbClient;
 
app.use(express.static(__dirname + "/public"));
 
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("gamesdb").collection("games");
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
 
app.get("/api/games", function(req, res){
        
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, games){
         
        if(err) return console.log(err);
        res.send(games)
    });
     
});
app.get("/api/games/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, game){
               
        if(err) return console.log(err);
        res.send(game);
    });
});
   
app.post("/api/games", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const GameName = req.body.name;
    const ReleaseDate = req.body.date;
    const Developer = req.body.dev;
    const game = {name: GameName, dev:Developer, date: ReleaseDate};
    
    const collection = req.app.locals.collection;
    collection.insertOne(game, function(err, result){
               
        if(err) return console.log(err);
        res.send(game);
    });
});
    
app.delete("/api/games/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) return console.log(err);    
        let game = result.value;
        res.send(game);
    });
});
   
app.put("/api/games", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const GameName = req.body.name;
    const ReleaseDate = req.body.date;
    const Developer = req.body.dev;

    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({_id: id}, { $set: {date: ReleaseDate, name: GameName, dev: Developer}},
         {returnOriginal: false },function(err, result){
               
        if(err) return console.log(err);     
        const game = result.value;
        res.send(game);
    });
});
 
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
