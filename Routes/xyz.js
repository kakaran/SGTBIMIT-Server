const express = require("express");
const { AdministrationAdd, justForchecking,AdministrationDelete,AdministrationDisplay } = require ("../Controllers/user.js");
const upload = require("../Config/multer.js");
const router = express.Router();



//just for checking
router.get("/", justForchecking);
router.post("/Administration/AdministrationAdd", upload.single('image'),AdministrationAdd);
router.post("/Administration/AdministrationDelete",AdministrationDelete);
router.get("/Administration/AdministrationDisplay",AdministrationDisplay);



module.exports = router;    