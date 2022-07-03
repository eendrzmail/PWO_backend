var express = require('express');
const router = require('./routes/users');
app = express();
cors = require('cors');
bodyParser = require('body-parser');
require('dotenv').config()

var distDir = __dirname;

app.use(express.static(distDir));
app.use(cors());


users = require('./routes/users');


//parsery
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//dodanie routerów
app.use(users);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serwer uruchomiony. Nasluchuje na porcie ${port}`));