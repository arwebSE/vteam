const express = require('express');
const router = express.Router();
const usertoBikeModel = require('../models/userToBike');

router.get("/", (req, res) => usertoBikeModel.getAll(res));
router.get("/:idUsertobike", (req, res) => usertoBikeModel.getOne(req.params.idUsertobike, res));
router.post("/", (req, res) => usertoBikeModel.create(req.body, res));
router.put("/:idUsertobike", (req, res) => usertoBikeModel.update(req.params.idUsertobike, req.body, res));
router.delete("/:idUsertobike", (req, res) => usertoBikeModel.delete(req.params.idUsertobike, res));

module.exports = router;
