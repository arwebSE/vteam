const express = require('express');
const router = express.Router();
const scooterModel = require('../models/scooter');

require('dotenv').config();

router.get("/", (req, res) => scooterModel.getAll(res));
router.get("/:scooterId", (req, res) => scooterModel.getOne(req.params.scooterId, res));
router.post("/", (req, res) => scooterModel.create(req.body, res));
router.put("/:scooterId", (req, res) => scooterModel.update(req.params.scooterId, req.body, res));
router.delete("/", (req, res) => scooterModel.deleteAll(res));
router.delete("/:scooterId", (req, res) => scooterModel.delete(req.params.scooterId, res));


module.exports = router;
