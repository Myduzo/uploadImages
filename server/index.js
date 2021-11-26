const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.static('data'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'data')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({storage}).array('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
});

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})
