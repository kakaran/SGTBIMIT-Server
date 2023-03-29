const express = require("express");
const upload = require("../Config/multer.js");
const formidable = require('express-formidable');
const router = express.Router();
const { AdministrationAdd, AdministrationUpdate, AdministrationImageDisplay, AdministrationDelete, SingleAdministrationDisplay, AdministrationDisplay } = require("../Controllers/Administration.js");
const { PlacementIntershipsAdd, PlacementIntershipsSingle, PlacementIntershipsDisplay, PlacementIntershipsDelete, PlacementIntershipsUpdate, PlacementIntershipsImageDisplay } = require("../Controllers/PlacementInternship")
const { TestimonialAdd, singleTestimonialDisplay, TestimonialDisplay, TestimonialUpdate, TestimonialDelete } = require("../Controllers/Testimonials")
const { recruitersAdd, recruitersUpdate, recruitersDisplay, recruitersDelete, RecruiterImageDisplay } = require('../Controllers/Recruiters');
const { FacultyAdd, FacultyDelete, FacultyImageDisplay, FacultyDisplay, FacultySingle, FacultyUpdate } = require("../Controllers/Facultys");
const { SocietyAdd, SocietyDelete, SocietyDisplay, SingleSocietyDisplay, SocietyImageDisplay, SocietyUpdate } = require("../Controllers/Society");
const { EResourcesAdd, EResourcesDisplay, EResourcesUpdate, EResourcesSingle, EResourcesDelete } = require("../Controllers/E-Resources");

//just for checking
// router.get("/", justForchecking);


router.post("/Administration/Administration_Add", formidable(), AdministrationAdd);
router.post("/Administration/Administration_Delete/:_id", AdministrationDelete);
router.get("/Administration/Administration_Display", AdministrationDisplay);
router.get("/Administration/AdministrationImageDisplay/:_id", AdministrationImageDisplay);
router.post("/Administration/Single_Administration_Display/:_id", SingleAdministrationDisplay);
router.post("/Administration/Administration_Update/:_id", formidable(), AdministrationUpdate); 3

//Placement and Intership Routes 
router.post("/Placement_Intership/PlacementInterships_Add", formidable(), PlacementIntershipsAdd);
router.get("/Placement_Intership/PlacementInterships_Display", PlacementIntershipsDisplay);
router.get("/Placement_Intership/PlacementInterships_Single/:_id", PlacementIntershipsSingle);
router.post("/Placement_Intership/PlacementInterships_Delete/:_id", PlacementIntershipsDelete);
router.post("/Placement_Intership/PlacementInterships_Image_Display/:_id", PlacementIntershipsImageDisplay);
router.post("/Placement_Intership/PlacementInterships_Update/:_id", formidable(), PlacementIntershipsUpdate);

//Faculty Routes 
router.post("/Faculty/Faculty_Add", formidable(), FacultyAdd);
router.get("/Faculty/Faculty_Display", FacultyDisplay);
router.get("/Faculty/Faculty_Image_Display/:_id", FacultyImageDisplay);
router.get("/Faculty/FacultySingle/:_id", FacultySingle);
router.post("/Faculty/Faculty_Delete/:_id", FacultyDelete);
router.post("/Faculty/Faculty_Update/:_id", formidable(), FacultyUpdate);


//Testimonial Routes
router.post("/Testimonial/Testimonial_Add", TestimonialAdd);
router.get("/Testimonial/Testimonial_Display", TestimonialDisplay);
router.post("/Testimonial/Testimonial_Update/:_id", TestimonialUpdate);
router.post("/Testimonial/Testimonial_Delete", TestimonialDelete);
router.post("/Testimonial/single_Testimonial_Display", singleTestimonialDisplay)

//Recruiters Routes 
router.post("/Recruiters/recruiters_Add", formidable(), recruitersAdd);
router.post("/Recruiters/recruiters_Update/:_id", formidable(), recruitersUpdate);
router.get("/Recruiters/recruiters_Display", recruitersDisplay);
router.get("/Recruiters/Recruiter_Image_Display/:_id", RecruiterImageDisplay);
router.post("/Recruiters/recruiters_Delete/:_id", recruitersDelete);


//Society Routes
router.post("/Society/Society_Add", formidable(), SocietyAdd);
router.post("/Society/Society_Delete/:_id", SocietyDelete);
router.get("/Society/Society_Display", SocietyDisplay);
router.get("/Society/Society_Image_Display/:_id", SocietyImageDisplay);
router.get("/Society/Single_Society_Display/:_id", SingleSocietyDisplay);
router.post("/Society/Society_Update/:_id", formidable(), SocietyUpdate); 3


//E_Resources Routes
router.post('/E_Resources/EResources_Add', EResourcesAdd);
router.get('/E_Resources/EResources_Display', EResourcesDisplay);
router.post('/E_Resources/EResources_Single_Display', EResourcesSingle);
router.post('/E_Resources/EResources_Update/:_id', EResourcesUpdate);
router.post("/E_Resources/EResources_Delete/:id", EResourcesDelete);


module.exports = router;    