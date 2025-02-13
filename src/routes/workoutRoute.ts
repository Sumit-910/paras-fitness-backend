import { Router } from "express";

import { workController } from "../controllers/index";

import authorisation from "../middlewares/authorisation";

const workRoute=Router();

workRoute.get('/all/workouts',[],workController.getAllWorkoutByAll);
workRoute.get('/workouts',[authorisation],workController.getAllWorkoutByUser);
workRoute.post("/workouts",[authorisation],workController.createWorkout);
workRoute.get("/workouts/:workout_id",[],workController.getSingleWorkout);
workRoute.patch("/workouts",[authorisation],workController.updateWorkout);
workRoute.delete("/workouts",[authorisation],workController.deleteWorkout);

export default workRoute;