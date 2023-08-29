const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const mysql = require('mysql');
const formidable = require('express-formidable');
const utils = require('./utils');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

app.use(formidable());

app.post('/', (req, res) => {
  if(!utils.validateForm(req.fields)){
    res.status(400);
    res.send("Invalid form data!");
  }

  const query = `INSERT INTO user(name, email) VALUES(${con.escape(req.fields.name)}, ${con.escape(req.fields.email)})`
  con.query(query, (err, resp) => {
    if(err){
      console.log(err.code)
      if(err.code=='ER_DUP_ENTRY'){
        res.status(409).send('Thanks for your interest!');
      }else{
        res.status(500).send('Something went wrong!');
      }

      return;
    }

    res.status(200).send('Thanks for your interest!')
  })
});

app.listen(port, () => {
  con.connect(function(err) {
    if (err) throw err;
    console.log("app started!");
  });
})