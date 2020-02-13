const express = require('express')
const router = express.Router()
const transformers = require('../data/transformers')
const dinosaurs = require('../data/dinosaurs.json')
const short = require('../data/transformersShort.json')

router.get('/', function(req, res) {
  res.send('bad request - use a collection name, eg /transformers')
})

router.get('/transformers', (req, res) => res.send(transformers))
router.get('/dinosaurs', (req, res) => res.send(dinosaurs))
router.get('/short', (req, res) => res.send(short))

module.exports = router

