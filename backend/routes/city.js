const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const cityModel = require('../models/city');

require('dotenv').config();




router.get("/", (req, res) => cityModel.getAll(res));
router.get("/:cityId", (req, res) => cityModel.getOne(req.params.cityId, res));
router.post("/", (req, res) => cityModel.create(req, res));
router.put("/:cityId", (req, res) => cityModel.update(req.params.cityId, req.body, res));
router.delete("/:cityId", (req, res) => cityModel.delete(req.params.cityId, res));




module.exports = router;