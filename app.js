const express = require('express')
// const path = require('path')
const transformers = require('./data/transformers.json')
const port = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))

// app.get('/', (req, res) => res.send("Nothing to see here :("));
app.get('/healthcheck', (req, res) => res.send('I am healthy!'))

app.get('/data/transformers', (req, res) => res.send(transformers))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  console.log(`CMD + click to view http://localhost:${port}`)
})
