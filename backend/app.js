require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cityRoute = require("./routes/city");
const scooterRoute = require("./routes/scooter");
const zoneRoute = require("./routes/zone");
const userToBikeRoute = require("./routes/userToBike");
const logRoute = require("./routes/log");

// Middleware
app.use(cors());

// API key validation middleware
function validateApiKey(req, res, next) {
    const apiKey = req.get("API-KEY");
    if (
        (!apiKey || apiKey !== "BOI-API-KEY") &&
        process.env.APIKEY !== "BOI-API-KEY"
    ) {
        console.log(req.path);
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
}

// Exkludera /ouath2 routes från API-KEY
app.use((req, res, next) => {
    if (
        req.path === "/oauth2/login/google" ||
        req.path === "/oauth2/redir/google"
    ) {
        return next();
    } else {
        validateApiKey(req, res, next);
    }
});

app.disable("x-powered-by");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/routes/test.html");
});

// process.env.ENV = 'simulation';

app.use("/oauth2", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/city", cityRoute);
app.use("/v1/scooter", scooterRoute);
app.use("/v1/zone", zoneRoute);
app.use("/v1/userToBike", userToBikeRoute);
app.use("/v1/log", logRoute);

module.exports = app;