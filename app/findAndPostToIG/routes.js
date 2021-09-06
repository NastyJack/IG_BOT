const express = require("express");
const router = express.Router();
const findAndPostToIG = require("./controller");

router.post("/makePost", findAndPostToIG.makePost);
router.post("/isPosted", findAndPostToIG.isPosted);
router.post("/viewDb", findAndPostToIG.viewDb);
router.post("/clearLocalDb", findAndPostToIG.clearLocalDb);

module.exports = router;
