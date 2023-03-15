import express from "express";
import { justForchecking, sgtbimitCheck } from "../Controllers/user";
const router = express.Router();


//just for checking
router.get("/", justForchecking);

router.get("/sgtbimit", sgtbimitCheck);