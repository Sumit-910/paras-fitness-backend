import userRoute from "./userRoute";
import express from "express";

const router=express.Router();

router.use('/',userRoute);

export default router;

