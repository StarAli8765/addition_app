const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");

const app = express();

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use('/public/images', express.static(__dirname + '/public/images/'));


app.post('/api/add', (req, res) => {
  // console.log(req.body);
  var sum = req.body.number1 + req.body.number2;
  res.send(JSON.stringify({ result: sum }));

});


app.listen(5000, () =>
  console.log('Express server is running on localhost:5000')
);
