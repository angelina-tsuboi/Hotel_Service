const express = require('express');
const app = express();
const port = 2432 || process.env.PORT;
let ejs = require('ejs')
const path = require('path')

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.listen(port, (err) => {
    err ? console.log("Oops there was an error: " + error) : console.log("Port is up on " + port);
})