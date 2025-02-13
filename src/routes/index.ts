import userRoute from "./userRoute";
import workRoute from "./workoutRoute";
import fitnessRoute from "./fitnessRoute";

import express from "express";

const router=express.Router();

router.use('/',userRoute);
router.use('/',workRoute);
router.use('/',fitnessRoute);

export default router;

