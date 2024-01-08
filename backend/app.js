require('dotenv').config()

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;

// Routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth')
const cityRoute = require('./routes/city');
const scooterRoute = require('./routes/scooter');
const zoneRoute = require('./routes/zone');
const userToBikeRoute = require('./routes/userToBike');
const logRoute = require('./routes/log');

//Middleware
app.use(cors())

// API key validation middleware
function validateApiKey(req, res, next) {
    //const apiQueryKey = req.query['API-KEY'];
    const apiKey = req.get('API-KEY');

    if ((!apiKey || apiKey !== `BOI-API-KEY`) && (process.env.APIKEY !== 'BOI-API-KEY')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

// Use the API key validation middleware for all routes
app.use(validateApiKey);

// app.use(options('*', cors()));
app.disable('x-powered-by');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    //res.send('Hello World!');
    res.sendFile(__dirname + '/routes/test.html');
});

// process.env.ENV = 'simulation';

app.use("/oauth2", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/city", cityRoute);
app.use("/v1/scooter", scooterRoute);
app.use("/v1/zone", zoneRoute);
app.use("/v1/userToBike", userToBikeRoute);
app.use("/v1/log", logRoute);
// Serve the form at the '/form' route
/*app.get('/form', (req, res) => {
    
});*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
