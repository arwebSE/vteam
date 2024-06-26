const express = require('express');
const router = express.Router();
const confenableAuth = require('../models/auth')
const enableAuth = confenableAuth();
const passport = require('passport');
router.use(enableAuth)
    // Provisory loginpage for oauth testing
router.get('/login/google', (req, res) => {
    passport.authenticate('google', { scope: 'profile' })(req, res);
});
// Processing the auth response and redirects to start
router.get('/redir/google',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/', failureMessage: true }),
    function(req, res) {
        const state = req.query.state;
        userid = req.user.userId
        res.redirect(`http://localhost:3000/?state=${state}&userid=${userid}`);
    });


module.exports = router;