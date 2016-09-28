//npm install --save
//npm install nunjucks --save

"use strict";

var express = require('express');
var nunjucks = require('nunjucks');
var app = express();


//nunjucks konfigurálása
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

//middleware
app.use(function(req,res, next){
  console.log(req.method + " " + req.url);
  next();
})

//statikus kérés
app.use(express.static('public'));


//nunjucks template használata
app.get('/hello/:name', function(req,res){
    const name = req.params.name;
    const city = req.query.city;
    res.render('hello.njk', { name, city });
});

app.get('/alma/oldala', function(req,res){
    res.render('alma.njk');
});

app.post('/alma/oldala', function(req, res){
    const count = req.body.count;
    res.render('alma.njk', {count});
});

//get kérés
app.get('/alma', function(req,res){
    res.end("Alma");
});


//egyszerű szerver
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Elindult a szerver pronyó!");
});