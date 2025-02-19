import userRoute from "./UserRoute";
import workRoute from "./WorkoutRoute";
import fitnessRoute from "./FitnessRoute";

import express from "express";

// Create an instance of the Express router
const router=express.Router();

// Define route handlers
router.use('/',userRoute);
router.use('/',workRoute);
router.use('/',fitnessRoute);

// Export the router for use in the main server file
export default router;

