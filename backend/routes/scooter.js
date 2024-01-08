const express = require('express');
const router = express.Router();
const scooterModel = require('../models/scooter');

require('dotenv').config();

router.get("/", (req, res) => scooterModel.getAll(res));
router.get("/lowbattery", (req, res) => scooterModel.getLowBatteryScooter(res));
router.get("/ids/:city", (req, res) => scooterModel.getBikeIdsFromCity(req.params.city, res));
router.get("/available", (req, res) => scooterModel.getAllAvailable(res));
router.get("/city/:city", (req, res) => scooterModel.getAllFromCity(req.params.city, res));
router.get("/:scooterId", (req, res) => scooterModel.getOne(req.params.scooterId, res));
router.post("/", (req, res) => scooterModel.create(req.body, res));
router.put("/:scooterId", (req, res) => scooterModel.update(req.params.scooterId, req.body, res));
router.put("/", (req, res) => scooterModel.updateMultiple(req.body, res));
router.delete("/", (req, res) => scooterModel.deleteAll(res));
router.delete("/:scooterId", (req, res) => scooterModel.delete(req.params.scooterId, res));


module.exports = router;
