const express = require('express');
const router = express.Router();

const userModel = require('../models/user');

router.get("/", (req, res) => userModel.getAll(res));
router.get("/:userId", (req, res) => userModel.getOne(req.params.userId, res));
router.post("/", (req, res) => userModel.create(req, res));
router.put("/:userId", (req, res) => userModel.update(req.params.userId, req.body, res));
router.delete("/:userId", (req, res) => userModel.delete(req.params.userId, res));

module.exports = router;