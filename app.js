const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => res.send("Nothing to see here :( maybe it will work?"));
app.get('/healthcheck', (req, res) => res.send("I am healthy!"));

// app.get('/getView', (req, res) => res.json(myView));

app.listen(3000, () => console.log('Example app listening on port 3000!'))