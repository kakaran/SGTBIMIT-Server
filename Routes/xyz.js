const express = require("express");
const { AdministrationAdd,AdministrationUpdate,dataCheck,AdministrationDelete,SingleAdministrationDisplay,PlacementIntershipsAdd,AdministrationDisplay } = require ("../Controllers/user.js");
const upload = require("../Config/multer.js");
const router = express.Router();



//just for checking
// router.get("/", justForchecking);
router.post("/Administration/Administration_Add",upload.single('image'),AdministrationAdd);
router.post("/Administration/Administration_Delete",AdministrationDelete);
router.get("/Administration/Administration_Display",AdministrationDisplay);
router.post("/Administration/Single_Administration_Display",SingleAdministrationDisplay);
router.post("/Administration/Administration_Update/:_id",dataCheck,upload.single('image'),AdministrationUpdate);
router.post("/Administration/PlacementInterships_Add",upload.single('image'),PlacementIntershipsAdd);



module.exports = router;    