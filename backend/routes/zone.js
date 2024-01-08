const express = require('express');
const router = express.Router();
const zoneModel = require('../models/zone');

router.get("/", (req, res) => zoneModel.getAll(res));
// router.get("/:zoneId", (req, res) => zoneModel.getOne(req.params.zoneId, res));
router.get("/city/:city", (req, res) => zoneModel.getCityZones(res, req.params.city));
router.get("/nogo/:city", (req, res) => zoneModel.getNoGoZones(res, req.params.city));
router.get("/restricted/:city", (req, res) => zoneModel.getRestrictedZones(res, req.params.city));
router.post("/", (req, res) => zoneModel.create(req, res));
router.put("/:zoneId", (req, res) => zoneModel.update(req.params.zoneId, req.body, res));
router.delete("/:zoneId", (req, res) => zoneModel.delete(req.params.zoneId, res));

module.exports = router;
