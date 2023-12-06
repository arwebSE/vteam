const express = require('express');
const router = express.Router();
const confenableAuth = require('../models/auth')
const enableAuth = confenableAuth();
const passport = require('passport');

router.use(enableAuth)
// Provisory loginpage for oauth testing
router.get('/login/google', (req, res) => {
    console.log('Reached /login/google route');
    passport.authenticate('google')(req, res);
  });
// Processing the auth response and redirects to start
router.get('/redir/google',
passport.authenticate('google', {failureRedirect: 'http://localhost:1337/', failureMessage: true}),
function(req, res) {
    res.redirect('http://localhost:1337/');
    console.log("User is now logged in!");
});


module.exports = router;