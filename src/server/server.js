const express = require('express') 
const app = express() 
const mysql = require("mysql");
const bodyParser = require('body-parser');
const port = 4444     // react default=3000

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
    host : '127.0.0.1',
    port: '3306',
    user : 'vegan_id',    // id
    password : '190131',
    database : 'Vegan',
});

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('start');
});

connection.connect(function (err) {
  if (err)
    console.log(err);
  else
    console.log('connected');
})

app.get('/member', function(req, res) {
  connection.query('select * from member', function(err, rows) {
    if (err)
      console.log(err)
    else {
      console.log(rows);
      res.send(rows);
    }
  })
}) 

app.get('/product', function(req, res) {
  connection.query('select * from product', function(err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.get('/save_product', function(req, res) {
  connection.query('select * from product', function(err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.get('/search', function(req, res) {
  connection.query('select * from product', function(err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.get('/check_vegan', function(req, res) {
  connection.query('select * from product', function(err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})