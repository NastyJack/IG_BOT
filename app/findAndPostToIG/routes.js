const express = require("express");
const router = express.Router();
const findAndPostToIG = require("./controller");

router.post("/makePost", findAndPostToIG.makePost);

module.exports = router;
