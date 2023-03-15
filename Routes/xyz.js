import express from "express";
import { justForchecking, sgtbimitCheck } from "../Controllers/user.js";
const router = express.Router();


//just for checking
router.get("/", justForchecking);

router.get("/sgtbimit", sgtbimitCheck);



export default router;