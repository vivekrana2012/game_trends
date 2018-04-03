var express = require('express');
var app=express();
var bodyParser=require('body-parser');
const mongoClient = require('mongodb').MongoClient;

app.use(express.static(__dirname + '/static'));

app.get('/dota2_youtube_rss', function(request, response){
  mongoClient.connect('mongodb://game_trends:game_trends@localhost:27017/game_trends', function(error, db){
    if(error){
      return console.log(error);
    }

    db.collection('dota2_youtube_rss', function(error, collection){
      if(error){
        db.close();
        return console.log(error);
      }

      collection.find({}).toArray(function(error, result){
        if(error){
          db.close();
          return console.log(error);
        }

        db.close();
        response.json(result);
      });
    });

  });
});

app.listen(3000);
