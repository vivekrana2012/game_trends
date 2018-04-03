const request = require('request');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const mongoClient = require('mongodb').MongoClient;

request('https://www.youtube.com/feeds/videos.xml?channel_id=UCKy1dAqELo0zrOtPkf0eTMw', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  parser.parseString(body, function(error, result){
    if(error) { return console.log(error); }

    mongoClient.connect("mongodb://game_trends:game_trends@localhost:27017/game_trends", function(error, db){
      if(error){
        return console.log(error);
      }

      db.collection("ign_youtube_rss", function(error, collection){
        if(error){
          db.close();
          return console.log(err);
        }

        var entries = result.feed.entry;
        entries.forEach((entry) => {
          collection.insertOne({'title': entry.title[0], 'id': entry['yt:videoId'][0], 'author': entry.author[0].name[0],
            'published': entry.published[0], 'updated': entry.updated[0]}, function(error, result){
              if(error){ console.log(error); }
          });
        });
      });

    });
  });
});
