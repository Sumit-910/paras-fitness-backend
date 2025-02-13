import { Router } from "express";

import { fitnessController } from "../controllers/index";

import authorisation from "../middlewares/authorisation";

const fitnessRoute=Router();

fitnessRoute.get('/goals',[authorisation],fitnessController.getAllFitnessGoals);
fitnessRoute.post('/goals',[authorisation],fitnessController.createFitnessGoal);
fitnessRoute.patch("/goals",[],fitnessController.updateFitnessGoal);
fitnessRoute.get("/goals/:goal_id",[],fitnessController.getSingleFitnessGoal);
fitnessRoute.delete("/goals",[],fitnessController.deleteFitnessGoal);

export default fitnessRoute;