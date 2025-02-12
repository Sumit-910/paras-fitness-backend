import userRoute from "./userRoute";
import workRoute from "./workoutRoute";
import express from "express";

const router=express.Router();

router.use('/',userRoute);
router.use('/',workRoute);

export default router;

