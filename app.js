const express = require('express')
const path = require('path')
const http = require('http')
const initSocketio = require('./services/socketIo')
const apiRouter = require('./routes/api')
const port = process.env.PORT || 3000

const app = express()
const server = http.Server(app)

app.use(express.static('public'))
app.use('/data', apiRouter)
app.get('/healthcheck', (req, res) => res.send('I am healthy!'))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

initSocketio(server)

server.listen(port, () => {
  console.log(`Trumps listening on port ${port}!`)
  console.log(`CMD + click to view http://localhost:${port}`)
})
