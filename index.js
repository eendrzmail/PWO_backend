var express = require('express');
app = express();
cors = require('cors');
bodyParser = require('body-parser');
require('dotenv').config()

var distDir = __dirname;

app.use(express.static(distDir));
app.use(cors());


users = require('./routes/users');
positions = require('./routes/positions');
employees = require('./routes/employees');


//parsery
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//dodanie routerów
app.use(users);
app.use(positions);
app.use(employees);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serwer uruchomiony. Nasluchuje na porcie ${port}`));