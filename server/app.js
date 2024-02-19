const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const fs = require('fs')

const app = express();

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use('/public/images', express.static(__dirname + '/public/images/'));

var storage = multer.diskStorage({

  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(null, "Avartar.jpg")
  }
})

var upload = multer({ storage: storage }).array('file');

app.post('/api/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)

  })

});
app.post('/api/add', (req, res) => {
  // console.log(req.body);
  var sum = req.body.number1 + req.body.number2;
  res.send(JSON.stringify({ result: sum }));

});

app.post('/api/addinfo', (req, res) => {
  // console.log(req.body);
  var text = req.body.name + "\n==========\n" + req.body.bio;
  fs.writeFile('info.txt', text, (err) => {
      if (err) {
        return;
      }
  })
  res.send(JSON.stringify({ result: "Ok" }));
});

function read(fileName = 'info.txt'){
  return new Promise((resolve, reject)=>{
      fs.readFile(fileName, 'utf-8', (err, data)=>{
          if (err) reject(err.message)
          resolve(data)
      })
  })
}

app.get('/api/getinfo', async (req, res) => {
  // console.log(req.body);
  
    let data = await read()
    console.log(data)
    
    const info_arr = data.split("\n==========\n");
    
    if (info_arr.length ==0 ){
      res.send(JSON.stringify({ name: "", bio: "" }));
    }
    let name = info_arr[0];
    let bio = info_arr[1];
    res.send(JSON.stringify({ name: name, bio: bio }));
});


app.listen(5000, () =>
  console.log('Express server is running on localhost:5000')
);
