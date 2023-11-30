const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const enableAuth = require('../models/auth')
const passport = require('passport')

router.use(enableAuth)
// Provisory loginpage for oauth testing
router.get('/login/google', passport.authenticate('google'));

// Processing the auth response and redirects to start
router.get('/oauth2/redir/google',
passport.authenticate('google', {failureRedirect: '/login', failureMessage: true}),
function(req, res) {
    res.redirect('/');
});


router.get("/", (req, res) => userModel.getAll(res));
router.get("/:userId", (req, res) => userModel.getOne(req.params.userId, res));
router.post("/", (req, res) => userModel.create(req, res));
router.put("/:userId", (req, res) => userModel.update(req.params.userId, req.body, res));
router.delete("/:userId", (req, res) => userModel.delete(req.params.userId, res));



module.exports = router;
