var express = require('express');
const multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const fs = require('fs');

const uploadDirectory = 'uploads/';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size})
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
