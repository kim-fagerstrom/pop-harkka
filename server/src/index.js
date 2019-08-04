const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.post('/check',(req,res) => {

  let message = "INCORRECT";

  if (req.body.code === "4242") {
    message = "CORRECT";
  }

  let data = {
    message: message
  };

  res.status(200).send(JSON.stringify(data));
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));