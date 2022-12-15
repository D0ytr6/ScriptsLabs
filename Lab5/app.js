const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const {
    MONGO_DB_HOSTNAME,
    MONGO_DB_PORT,
    MONGO_DB
} = process.env

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}
const url = `mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB}`;

const gameScheme = new Schema({name: String, dev: String, date: String}, {versionKey: false});
const Game = mongoose.model("Game", gameScheme);
 
app.use(express.static(__dirname + "/public"));
 
mongoose.connect(url, options, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

  
app.get("/api/games", function(req, res){
        
    Game.find({}, function(err, games){
 
        if(err) return console.log(err);
        res.send(games)
    });
});
 
app.get("/api/games/:id", function(req, res){
         
    const id = req.params.id;
    Game.findOne({_id: id}, function(err, game){
          
        if(err) return console.log(err);
        res.send(game);
    });
});
    
app.post("/api/games", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
    
    const GameName = req.body.name;
    const ReleaseDate = req.body.date;
    const Developer = req.body.dev;

    const game = new Game({name: GameName, dev: Developer, date: ReleaseDate});
        
    game.save(function(err){
        if(err) return console.log(err);
        res.send(game);
    });
});
     
app.delete("/api/games/:id", function(req, res){
         
    const id = req.params.id;
    Game.findByIdAndDelete(id, function(err, game){
                
        if(err) return console.log(err);
        res.send(game);
    });
});
    
app.put("/api/games", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const GameName = req.body.name;
    const ReleaseDate = req.body.date;
    const Developer = req.body.dev;

    const newGame = {name: GameName, dev: Developer, date: ReleaseDate};
     
    Game.findOneAndUpdate({_id: id}, newGame, {new: true}, function(err, game){
        if(err) return console.log(err); 
        res.send(game);
    });
});
