const express = require("express");
const upload = require("../Config/multer.js");
const router = express.Router();
const { AdministrationAdd,AdministrationUpdate,dataCheck,AdministrationDelete,SingleAdministrationDisplay,AdministrationDisplay } = require ("../Controllers/Administration.js");
const {PlacementIntershipsAdd,PlacementIntershipsSingle,PlacementIntershipsDisplay,PlacementIntershipsDelete,PlacementIntershipsUpdate,dataCheckInterShip} = require("../Controllers/PlacementInternship")
const {TestimonialAdd,TestimonialDisplay,TestimonialUpdate,TestimonialDelete} = require("../Controllers/Testimonials")


//just for checking
// router.get("/", justForchecking);
router.post("/Administration/Administration_Add",upload.single('image'),AdministrationAdd);
router.post("/Administration/Administration_Delete",AdministrationDelete);
router.get("/Administration/Administration_Display",AdministrationDisplay);
router.post("/Administration/Single_Administration_Display",SingleAdministrationDisplay);
router.post("/Administration/Administration_Update/:_id",dataCheck,upload.single('image'),AdministrationUpdate);3

//Placement and Intership Routes 
router.post("/Placement_Intership/PlacementInterships_Add",upload.single('image'),PlacementIntershipsAdd);
router.get("/Placement_Intership/PlacementInterships_Display",PlacementIntershipsDisplay);
router.post("/Placement_Intership/PlacementInterships_Single",PlacementIntershipsSingle);
router.post("/Placement_Intership/PlacementInterships_Delete",PlacementIntershipsDelete);
router.post("/Placement_Intership/PlacementInterships_Update/:_id",dataCheckInterShip,upload.single('image'),PlacementIntershipsUpdate);

//Testimonial Routes
router.post("/Testimonial/Testimonial_Add",TestimonialAdd);
router.get("/Testimonial/Testimonial_Display",TestimonialDisplay);
router.post("/Testimonial/Testimonial_Update/:_id",TestimonialUpdate);
router.post("/Testimonial/Testimonial_Delete",TestimonialDelete);


module.exports = router;    