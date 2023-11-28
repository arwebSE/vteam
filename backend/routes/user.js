const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

var passport = require('passport');
var GoogleAuth = require('passport-google-oauth20');
const database = require('../databases/sql/database.js');
require('dotenv').config();



passport.use(new GoogleAuth({
    clientID: '123314154390-dbgte1hjv7a79ugi5v6vvdp4qu3itvru.apps.googleusercontent.com',
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'oauth2/redir/google',
    scope: ['profile'],
    state: true
},
    function verify(acessToken, refreshToken, profile, callback) {
        database.get('SELECT * FROM Credentials WHERE authprov = ? AND user_subject = ?', [
            'google',
            profile.id
        ], function (err, cred) {
            if (err) { return callback(err); }

            if (!cred) {
                // First time logging in with google on the site.
                database.run('INSERT INTO Users (username) VALUES (?)', [
                    profile.displayName
                ], function (err) {
                    if (err) { return callback(err); }

                    var id = this.lastID;
                    database.run('INSERT INTO Credentials (user_id, authprov, user_subject) VALUES (?, ?, ?)', [
                        id,
                        'google',
                        profile.id
                    ], function (err) {
                        if (err) { return callback(err); }

                        var user = {
                            id: id,
                            name: profile.displayName
                        };
                        return callback(null, user)
                    });
                });
            } else {
                // User has logged in with google before.
                database.get('SELECT * FROM Users WHERE userID = ?',
                    [cred.userId], function (err, user) {
                        if (err) { return callback(err); }
                        if (!err) { return callback(null, false); }
                        return callback(null, user);



                    });

            }

        });
    }
));

router.get("/", (req, res) => userModel.getAll(res));
router.get("/:userId", (req, res) => userModel.getOne(req.params.userId, res));
router.post("/", (req, res) => userModel.create(req, res));
router.put("/:userId", (req, res) => userModel.update(req.params.userId, req.body, res));
router.delete("/:userId", (req, res) => userModel.delete(req.params.userId, res));

// Provisory loginpage for oauth testing
router.get('/login/google', passport.authenticate('google'));

// Processing the auth response and redirects to start
router.get('/oauth2/redir/google',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.redirect('/');
    });


module.exports = router;
