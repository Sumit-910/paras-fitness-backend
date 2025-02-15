import { Request, Response, NextFunction } from "express";
import sequelize from "../db";
import { format } from "date-fns";

const getAllWorkoutByAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const [getAllWorkoutByAll]: any = await sequelize.query("SELECT * FROM workouts");

        if (!getAllWorkoutByAll.length) {
            return res.status(404).json({ message: "No Data To Show in Workouts" });
        }

        return res.status(200).json(getAllWorkoutByAll);
    } catch (error) {
        next(error);
    }
};

const getAllWorkoutByUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;

        const [getAllWorkoutByUser]: any = await sequelize.query("SELECT * FROM workouts WHERE user_id = ?", {
            replacements: [id]
        });

        console.log("getAllWorkoutByUser",getAllWorkoutByUser);

        if (getAllWorkoutByUser.length==0) {
            console.log("andar aya? ")
            return res.json({ status:404,message: "No Data To Show in Workouts By User" });
        }

        return res.status(200).json(getAllWorkoutByUser);
    } catch (error) {
        next(error);
    }
};

const createWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { exercise_type, duration, calories_burned, workout_date } = req.body;

        if (!exercise_type || !duration || !calories_burned || !workout_date) {
            return res.status(400).json({ message: "Enter All The Fields" });
        }

        const [existingExercise]: any = await sequelize.query("SELECT * FROM workouts WHERE workout_date = ? AND exercise_type = ? AND user_id = ?", {
            replacements: [workout_date, exercise_type, id]
        });

        if (existingExercise.length > 0) {
            return res.status(400).json({ message: "You have already added this exercise today" });
        }

        await sequelize.query("INSERT INTO workouts (user_id, exercise_type, duration, calories_burned, workout_date) VALUES (?, ?, ?, ?, ?)", {
            replacements: [id, exercise_type, duration, calories_burned, workout_date]
        });

        return res.status(201).json({ status:200,message: "Workout Added Successfully" });
    } catch (error) {
        next(error);
    }
};

const getSingleWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const { workout_id } = req.params;

        // console.log("id ",id);
        console.log("workout id ",workout_id);

        if (!workout_id) {
            return res.status(400).json({ message: "Enter All The Fields" });
        }

        const [singleWorkout]: any = await sequelize.query("SELECT * FROM workouts where workout_id = ?", {
            replacements: [workout_id]
        });

        if (!singleWorkout.length) {
            return res.status(404).json({ message: `Workout with workout_id=${workout_id} was not found` });
        }

        return res.status(200).json(singleWorkout[0]);
    } catch (error) {
        next(error);
    }
};

const updateWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log("kiuch aya ");

        const { id } = req.body.auth;
        const { workout_id, exercise_type, duration, calories_burned, workout_date } = req.body;

        console.log("body ",req.body);

        if (!workout_id || !exercise_type || !duration || !calories_burned || !workout_date) {
            return res.status(400).json({ message: "Enter All The Fields" });
        }

        console.log("passed test")

        const formattedDate = format(new Date(workout_date), "yyyy-MM-dd");

        await sequelize.query("UPDATE workouts SET exercise_type = ?, duration = ?, calories_burned = ?, workout_date = ? WHERE user_id = ? AND workout_id = ?", {
            replacements: [exercise_type, duration, calories_burned, formattedDate, id, workout_id]
        });

        return res.status(200).json({ message: "Workout Updated Successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteWorkout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { workout_id } = req.body;

        if (!workout_id) {
            return res.status(400).json({ message: "Workout ID is required" });
        }

        await sequelize.query("DELETE FROM workouts WHERE user_id = ? AND workout_id = ?", {
            replacements: [id, workout_id]
        });

        return res.status(200).json({ status:200,message: "Workout Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

export { getAllWorkoutByAll, createWorkout, getSingleWorkout, updateWorkout, deleteWorkout, getAllWorkoutByUser };