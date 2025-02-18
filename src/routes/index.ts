import userRoute from "./UserRoute";
import workRoute from "./WorkoutRoute";
import fitnessRoute from "./FitnessRoute";

import express from "express";

const router=express.Router();

router.use('/',userRoute);
router.use('/',workRoute);
router.use('/',fitnessRoute);

export default router;

