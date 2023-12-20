const express = require('express');
const router = express.Router();
const confenableAuth = require('../models/auth')
const enableAuth = confenableAuth();
const passport = require('passport');
router.use(enableAuth)
// Provisory loginpage for oauth testing
router.get('/login/google', (req, res) => {
    console.log('Reached /login/google route. If this is the second time the user logs in with google, they will instantly be redirected to home.');
    const state = 'loginstate'
    passport.authenticate('google', { state })(req, res);
  });
// Processing the auth response and redirects to start
router.get('/redir/google',
passport.authenticate('google', {failureRedirect: 'http://localhost:3000/', failureMessage: true}),
function(req, res) {
  const state = req.query.state; // Get the state query parameter
  res.redirect(`http://localhost:3000/oauthlogin/?state=${state}`);
});


module.exports = router; 