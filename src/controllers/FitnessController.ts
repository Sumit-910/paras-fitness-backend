import { Request, Response, NextFunction } from "express";
import * as fitnessGoalsRepo from "../repository/FitnessRep";
import { BadRequestError } from "../errors/BadRequest";
import { NotFoundError } from "../errors/NotFound";

const getAllFitnessGoals = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const fitnessGoals = await fitnessGoalsRepo.getAllFitnessGoals(id);

        if (!fitnessGoals.length) {
            throw new NotFoundError("There is no data to show in your goals");
        }

        return res.status(200).json(fitnessGoals);
    } catch (error) {
        next(error);
    }
};

const createFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { goal_type, target_value, current_progress, start_date, end_date } = req.body;

        if (!goal_type || !target_value || !current_progress || !start_date || !end_date) {
            throw new BadRequestError("Enter All The Fields");
        }

        await fitnessGoalsRepo.createFitnessGoal(id, goal_type, target_value, current_progress, start_date, end_date);

        return res.status(201).json({ message: "Fitness goal created successfully" });
    } catch (error) {
        next(error);
    }
};

const getSingleFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { goal_id } = req.params;

        if (!goal_id) {
            throw new BadRequestError("Goal ID is required");
        }

        const goal = await fitnessGoalsRepo.getSingleFitnessGoal(parseInt(goal_id));

        if (!goal.length) {
            throw new NotFoundError(`Goal with goal_id=${goal_id} was not found`);
        }

        return res.status(200).json(goal[0]);
    } catch (error) {
        next(error);
    }
};

const updateFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { goal_id, target_value, current_progress, status } = req.body;

        if (!goal_id || !target_value || !current_progress || !status) {
            throw new BadRequestError("Enter All The Fields");
        }

        await fitnessGoalsRepo.updateFitnessGoal(goal_id, target_value, current_progress, status);

        return res.status(200).json({ message: "Fitness goal updated successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError("Goal ID is required");
        }

        await fitnessGoalsRepo.deleteFitnessGoal(parseInt(id));

        return res.status(200).json({ message: "Fitness goal deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getAllFitnessGoals, createFitnessGoal, getSingleFitnessGoal, updateFitnessGoal, deleteFitnessGoal };
