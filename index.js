var express = require('express');
cors = require('cors');
app = express();
bodyParser= require('body-parser');
require('dotenv').config()

var distDir = __dirname;
app.use(express.static(distDir));


//załadowanie kontrolerów
test= require('./routes/test');
users= require('./routes/users');

app.use(cors());

//parsery
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//dodanie kontrolerów
app.use(test);
app.use(users);

const port= process.env.PORT || 3000;
app.listen(port, () => console.log(`Serwer uruchomiony. Nasluchuje na porcie ${port}`));