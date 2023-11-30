const express = require('express');
const router = express.Router();
const confenableAuth = require('../models/auth')
const enableAuth = confenableAuth();
const passport = require('passport');

router.use(enableAuth)
// Provisory loginpage for oauth testing
router.get('/login/google', passport.authenticate('google'));

// Processing the auth response and redirects to start
router.get('/oauth2/redir/google',
passport.authenticate('google', {failureRedirect: '/login', failureMessage: true}),
function(req, res) {
    res.redirect('/');
});


module.exports = router;