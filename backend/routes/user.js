const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const userModel = require('../models/user');

var GoogleAuth = require('passport-google-oauth20');
var passport = require('passport');
require('dotenv').config();






passport.use(new GoogleAuth({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'oauth2/redir/google',
    scope: [ 'profile' ],
    state: true

},


))

router.get("/", (req, res) => userModel.getAll(res));
router.get("/:userId", (req, res) => userModel.getOne(req.params.userId, res));
router.post("/", (req, res) => userModel.create(req, res));
router.put("/:userId", (req, res) => userModel.update(req.params.userId, req.body, res));
router.delete("/:userId", (req, res) => userModel.delete(req.params.userId, res));

// Provisory loginpage for oauth testing
router.get('/login', passport.authenticate('google'));

// Processing the auth response and redirects to start
router.get('/oauth2/redir/google',
passport.authenticate('google', {failureRedirect: '/login', failureMessage: true}),
function(req, res) {
    res.redirect('/');
});


module.exports = router;
