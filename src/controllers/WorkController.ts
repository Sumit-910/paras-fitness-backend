import { Request, Response, NextFunction } from "express";
import { format } from "date-fns";
import * as workoutRepo from "../repository/WorkoutRepo";
import { BadRequestError } from "../errors/BadRequest";
import { NotFoundError } from "../errors/NotFound";
import { ConflictError } from "../errors/ConflictError";

//Fetch all workouts from the database.
const getAllWorkoutByAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const workouts = await workoutRepo.getAllWorkouts();

        if (!workouts.length) {
            throw new NotFoundError("No Data To Show in Workouts");
        }

        return res.status(200).json(workouts);
    } catch (error) {
        next(error);
    }
};

//Fetch all workouts for a specific user.
const getAllWorkoutByUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const workouts = await workoutRepo.getWorkoutsByUser(id);

        if (!workouts.length) {
            throw new NotFoundError("No Data To Show in Workouts By User");
        }

        return res.status(200).json(workouts);
    } catch (error) {
        next(error);
    }
};

//Create a new workout entry for a user.
const createWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { exercise_type, duration, calories_burned, workout_date } = req.body;

        if (!exercise_type || !duration || !calories_burned || !workout_date) {
            throw new BadRequestError("Enter All The Fields");
        }

        const existingExercise = await workoutRepo.findWorkout(id, workout_date, exercise_type);

        if (existingExercise.length > 0) {
            throw new ConflictError("You have already added this exercise today");
        }

        await workoutRepo.createWorkout(id, exercise_type, duration, calories_burned, workout_date);

        return res.status(201).json({ status: 200, message: "Workout Added Successfully" });
    } catch (error) {
        next(error);
    }
};

//Fetch a single workout entry by its ID.
const getSingleWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { workout_id } = req.params;

        if (!workout_id) {
            throw new BadRequestError("Workout ID is required");
        }

        const workout = await workoutRepo.getWorkoutById(parseInt(workout_id));

        if (!workout.length) {
            throw new NotFoundError(`Workout with workout_id=${workout_id} was not found`);
        }

        return res.status(200).json(workout[0]);
    } catch (error) {
        next(error);
    }
};

//Update an existing workout entry.
const updateWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { workout_id, exercise_type, duration, calories_burned, workout_date } = req.body;

        if (!workout_id || !exercise_type || !duration || !calories_burned || !workout_date) {
            throw new BadRequestError("Enter All The Fields");
        }

        const formattedDate = format(new Date(workout_date), "yyyy-MM-dd");

        await workoutRepo.updateWorkout(id, workout_id, exercise_type, duration, calories_burned, formattedDate);

        return res.status(200).json({ message: "Workout Updated Successfully" });
    } catch (error) {
        next(error);
    }
};

//Delete a workout entry by its ID.
const deleteWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { workout_id } = req.body;

        if (!workout_id) {
            throw new BadRequestError("Workout ID is required");
        }

        await workoutRepo.deleteWorkout(id, workout_id);

        return res.status(200).json({ status: 200, message: "Workout Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

export { getAllWorkoutByAll, createWorkout, getSingleWorkout, updateWorkout, deleteWorkout, getAllWorkoutByUser };
