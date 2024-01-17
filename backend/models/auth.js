const express = require('express');
const router = express.Router();

var passport = require('passport');
var GoogleAuth = require('passport-google-oauth20');
const database = require('../databases/sql/database.js');
const session = require('express-session');
require('dotenv').config();

function enableAuth() {
    // Initializing passport and session..
    router.use(session({
        secret: "boi",
        resave: false,
        saveUninitialized: false


    }));
    router.use(passport.initialize());
    router.use(passport.session());



    passport.use(new GoogleAuth({
        clientID: '123314154390-dbgte1hjv7a79ugi5v6vvdp4qu3itvru.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:1337/oauth2/redir/google',
        scope: ['profile'],
        state: true
    },
        // Verifies the user, in this case
        function verify(acessToken, refreshToken, profile, callback) {

            database.get('SELECT * FROM Users WHERE authprov = ? AND user_authid = ?', [
                'google',
                profile.id
            ], function (err, cred) {
                if (err) { return callback(err); }

                if (!cred) {
                    var id = this.lastid
                    // First time logging in with google on the site.
                    database.run('INSERT INTO Users (username, authprov, userrole, user_authid) VALUES (?, ?, ?, ?)', [
                        profile.displayName,
                        'google',
                        'user',
                        profile.id
                    ], function (err) {
                        if (err) { return callback(err); }

                        var user = {
                            id: id,
                            name: profile.displayName,

                        };

                        return callback(null, user);;
                    });
                } else {
                    // User has logged in with google before.
                    database.get('SELECT * FROM Users WHERE user_authid = ?', [cred.user_authid], function (err, user) {
                        if (err) { return callback(err); }
                        if (!cred) { return callback(null, false); }
                        return callback(null, user);;

                    });

                }

            });
            passport.serializeUser(function (user, callback) {
                process.nextTick(function () {
                    callback(null, {
                        id: user.id,
                        name: user.name
                    });
                });
            });

            passport.deserializeUser(function (userId, callback) {
                process.nextTick(function () {
                    return callback(null, userId);
                });
            });
        }

    ));
    return router;
}

module.exports = enableAuth;