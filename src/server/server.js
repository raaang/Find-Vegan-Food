const express = require('express')
const app = express()
const mysql = require("mysql");
const bodyParser = require('body-parser');
const port = 4444     // react default=3000

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'vegan_id',    // id
  password: '190131',
  database: 'Vegan',
});

var server = app.listen(port, function () {
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

app.get('/member', function (req, res) {
  connection.query('select * from member', function (err, rows) {
    if (err)
      console.log(err)
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.get('/product', function (req, res) {
  connection.query('select * from product', function (err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post('/product/insert', function (req, res) {
  const data = req.body;
  // console.log(data);
  connection.query('insert into product values(?,?,?)', [data.barcode, data.foodNum, data.foodName],
    function (err, rows, fields) {
      if (err)
        console.log(err);
      else {
        console.log(rows);
        res.send(rows);
      }
    })
})

app.get('/save_product', function (req, res) {
  connection.query('select * from product', function (err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.get('/search', function (req, res) {
  connection.query('select * from product', function (err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.get('/check_vegan', function (req, res) {
  // console.log('req: '+req);
  // console.log(data);
  // const sql = 'select * from check_vegan where rawmat_name="req.body"';
  connection.query('select * from check_vegan', function (err, rows) {
    if (err)
      console.log(err);
    else {
      console.log(rows[0]);
      res.send(rows);
    }
  })
})

var rawmatList = [];

app.post('/check_vegan/find', function (req, res) {
  console.log('print vegan find');
  console.log(req.body);
  const rawList = req.body.rawmatList;

  var i;
  for (i = 0; i < rawList.length; i++) {
    connection.query('select * from check_vegan where rawmat_name=?', rawList[i], function (err, rows) {
      if (err)
        console.log(err);
      else {
        console.log(rows[0]);
        rawmatList.push(rows[0]);
        // res.send(rows);
      }
    })
  }
  console.log(rawmatList);
})