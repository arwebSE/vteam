const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
router.get("/", (req, res) => userModel.getAll(res));
router.get("/:userId", (req, res) => userModel.getOne(req.params.userId, res));
router.get("/ver/:username/:passwd", (req, res) => userModel.passVerif(req.params.username, req.params.passwd, res));
router.post("/", (req, res) => userModel.create(req, res));
router.put("/:userId", (req, res) => userModel.update(req.params.userId, req.body, res));
router.delete("/:userId", (req, res) => userModel.delete(req.params.userId, res));
router.put("/:userId/addMoney", (req, res) => {
    userModel.addMoney(req.params.userId, req.body.amount, res);
    console.log("Route");
});
router.get("/")

module.exports = router;
