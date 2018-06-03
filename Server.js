var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // mqtt.init(req, res, next);
  next();
});


app.get('/scrape', function(req, res){

  //All the web scraping magic will happen here
  url = 'https://news.ontario.ca/cabinet/en';
  var metadata = {};
  var parsedResults = [];


    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            var $ = cheerio.load(html);

            $('.bioRow','.clearfix').filter(function(){

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);
                //console.log(data);
                  data.each(function(i, element){
                    var profilepic1 = data.children().children().children().attr('src');
                    //console.log('heyoo',profilepic1);
                    var profilepic2 = data.children().next().children().children().attr('src');
                    //console.log('new url',url1);
                    var name1 = data.children().children().next().children().children().children().text();
                    //console.log(name1);
                    var name2 = data.children().next().children().next().children().children().children().text();
                    //console.log(name1);
                    var para1 =  data.children().children().next().children().next().children().text();
                    //console.log(para1);
                    var para2 =  data.children().next().children().next().children().next().children().text();
                    //console.log(para3);

                    metadata = {
                       //headshot1 : profilepic1,
                       //title1: name1,
                       //about1 : para1,
                       headshot2 : profilepic2,
                       title2 : name2,
                       about2 : para2

                  }
                   console.log(metadata);
                  parsedResults.push(metadata);
                   //res.setHeader('Content-Type', 'application/json');

                   //res.end(me)
                });
            })
            res.send(parsedResults);

        }
    })
})

app.listen('8081')

console.log('Server listening on port 8081');

exports = module.exports = app;
