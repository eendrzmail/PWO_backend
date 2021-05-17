var express = require('express');
const router = require('./routes/users');
app = express();
cors = require('cors');
bodyParser= require('body-parser');
require('dotenv').config()


var distDir = __dirname;
app.use(express.static(distDir));


users= require('./routes/users');
cars= require('./routes/cars');
rental= require('./routes/rental');

app.use(cors());

//parsery
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//dodanie routerów
app.use(users);
app.use(cars);
app.use(rental);

router.get('/api', (req,res) => {

    res.send([{"endpoint":"/register", "methods":"POST"}, {"endpoint":"/login", "methods":"POST"},
              {"endpoint":"/cars", "methods":"POST"}, {"endpoint":"/rental", "methods":["POST","GET"]}])
})

const port= process.env.PORT || 3000;
app.listen(port, () => console.log(`Serwer uruchomiony. Nasluchuje na porcie ${port}`));