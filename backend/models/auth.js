const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

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
        saveUnitialized: true


    }));
    router.use(passport.initialize());
    router.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        database.get('SELECT * FROM Users WHERE userId = ?', [id], function(err, user) {
            done(err, user)
        });
    });

    passport.use(new GoogleAuth({
        clientID: '123314154390-dbgte1hjv7a79ugi5v6vvdp4qu3itvru.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'oauth2/redir/google',
        scope: [ 'profile' ],
        state: true
        },
        function verify(acessToken, refreshToken, profile, callback) {
            database.get('SELECT * FROM Credentials WHERE authprov = ? AND user_subject = ?', [
                'google',
                profile.id
            ], function(err, cred) {
                if (err) {return callback(err); }

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
                        ], function(err) {
                            if (err) {return callback(err); }

                            var user = {
                                id: id,
                                name: profile.displayName
                            };
                            callback(null, user);
                        });
                    });
                    } else {
                        // User has logged in with google before.
                        database.get('SELECT * FROM Users WHERE userID = ?', 
                        [cred.userId], function(err, user) {
                            if (err) { return callback(err); }
                            if (!err) { return callback(null, false); }
                            callback(null, user);



                        });

                    }
                    
                });
                }
    ));
    return router
            }

module.exports = enableAuth;