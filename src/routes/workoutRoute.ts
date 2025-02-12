import { Router } from "express";

import { workController } from "../controllers/index";

import authorisation from "../middlewares/authorisation";

const workRoute=Router();

workRoute.get('/all/workouts',[],workController.getAllWorkoutByAll);
workRoute.get('/workouts',[authorisation],workController.getAllWorkoutByUser);
workRoute.post("/workouts",[authorisation],workController.createWorkout);
workRoute.get("/workouts/:id",[],workController.getSingleWokout);
workRoute.patch("/workouts",[authorisation],workController.updateWorkout);
workRoute.delete("/users",[],workController.deleteUser);

export default workRoute;