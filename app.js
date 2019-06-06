const express = require('express');
const app = express();

const port = process.env.PORT || 3000

app.use(express.static('public'));

app.get('/', (req, res) => res.send("Nothing to see here :("));
app.get('/healthcheck', (req, res) => res.send("I am healthy!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
