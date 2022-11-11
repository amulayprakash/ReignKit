const express = require("express");
const router = express.Router();

const passController = require("./../controllers/pass-controller");

router.get("/:id", passController.returnJson);

module.exports = router;
