const express = require('express');
const router = express.Router();
const logModel = require('../models/log');



router.get("/", (req, res) => logModel.getAll(res));
router.get("/:logId", (req, res) => logModel.getOneUser(req.params.logId, res));
router.post("/", (req, res) => logModel.create(req.body, res));
router.put("/:logId", (req, res) => logModel.update(req.params.logId, req.body, res));
router.delete("/:logId", (req, res) => logModel.delete(req.params.logId, res));




module.exports = router;