const express = require("express");
const multer = require("multer");
const { uploadMediaToCloudinary } = require("../controllers/courseControllers");
const router = express.Router();

const upload = multer({ dest: "uploads/" });


//upload media
router.post("/upload",upload.single('file'),uploadMediaToCloudinary );

module.exports = router;
