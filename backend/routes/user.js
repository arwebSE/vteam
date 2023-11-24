const express = require('express');
const router = express.Router();

const userModel = require('../models/user');

router.get("/", (req, res) => userModel.getAll(res));

module.exports = router;
