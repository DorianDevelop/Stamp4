const express = require('express');
var cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

//Création des routers, 1 router par base de donnée
const stamp3Router = require('./src/routes/stamp3');
const stamp3UutRouter = require('./src/routes/stamp3uut');
const stamp3AteRouter = require('./src/routes/stamp3ate');
const stamp3DrvRouter = require('./src/routes/stamp3drv');

//Affiliation de tout les routers a une URI
app.use('/stamp3', stamp3Router);
app.use('/stamp3uut', stamp3UutRouter);
app.use('/stamp3ate', stamp3AteRouter);
app.use('/stamp3drv', stamp3DrvRouter);

//'Allume' l'API est la fait écouter sur un port spécifique de localhost
app.listen(process.env.PORT, () => console.log('Server Started on Port : ' + process.env.PORT));
