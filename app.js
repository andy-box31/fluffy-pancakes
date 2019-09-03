const express = require('express')
// const path = require('path')
const transformers = require('./data/transformers.json')
const dinosaurs = require('./data/dinosaurs.json')
const short = require('./data/transformersShort.json')
const port = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))

// app.get('/', (req, res) => res.send("Nothing to see here :("));
app.get('/healthcheck', (req, res) => res.send('I am healthy!'))

app.get('/data/transformers', (req, res) => res.send(transformers))
app.get('/data/dinosaurs', (req, res) => res.send(dinosaurs))
app.get('/data/transformersShort', (req, res) => res.send(short))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  console.log(`CMD + click to view http://localhost:${port}`)
})
