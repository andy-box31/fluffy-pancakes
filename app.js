const express = require('express')
const path = require('path')
const socketio = require('./services/socketIo')
var apiRouter = require('./routes/api');
const port = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))
app.use('/data', apiRouter);
app.get('/healthcheck', (req, res) => res.send('I am healthy!'))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

socketio(app)

app.listen(port, () => {
  console.log(`Trumps listening on port ${port}!`)
  console.log(`CMD + click to view http://localhost:${port}`)
})
