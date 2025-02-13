import { Request, Response, NextFunction } from "express";
import sequelize from "../db";


const getAllFitnessGoals = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;

        // console.log("id ",id);
        
        const[getAllFitness]=await sequelize.query("select * from fitness_goals where user_id=?",{
            replacements:[id]
        });

        // console.log("fitness ",getAllFitness);

        if(getAllFitness.length==0){
            return res.json({message:"There is no data to show in your goals"})
        }

        return res.status(200).json(getAllFitness);
    } catch (error) {
        next(error);
    }
};


const createFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log("aya ??")
        const { id } = req.body.auth;

        const { goal_type, target_value, current_progress, start_date, end_date } = req.body;

        if(!goal_type || !target_value || !current_progress || !start_date || !end_date){
            return res.status(400).json({ message: "Enter All The Fields" });
        }
        
        const[insertFitness]=await sequelize.query("INSERT INTO fitness_goals (user_id, goal_type, target_value, current_progress, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)", { replacements: [id, goal_type, target_value, current_progress, start_date, end_date] });

        return res.status(200).json({ message: "Fitness goal created successfully" });
    } catch (error) {
        next(error);
    }
};

const getSingleFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const { goal_id } = req.params;

        if(!goal_id){
            return res.status(400).json({ message: "Enter All The Fields" });
        }
        
        const [getSingleGoal]=await sequelize.query("select * from fitness_goals where goal_id=?",{
            replacements:[goal_id]
        });
        
        return res.status(200).json(getSingleGoal);
    } catch (error) {
        next(error);
    }
};

const updateFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const { goal_id, target_value, current_progress, status } = req.body;

        if(!goal_id || !target_value || !current_progress || !status){
            return res.status(400).json({ message: "Enter All The Fields" });
        }
        
        const [updateGoal]=await sequelize.query("UPDATE fitness_goals SET target_value=?, current_progress=?, status=? WHERE goal_id=?", { replacements: [target_value, current_progress, status, goal_id] });
        
        return res.status(200).json({ message: "Fitness goal updated successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteFitnessGoal = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body;

        if(!id){
            return res.status(400).json({ message: "Enter All The Fields" });
        }
        
        const [deleteField]=await sequelize.query("DELETE FROM fitness_goals WHERE goal_id=?", { replacements: [id] });
        return res.status(200).json({ message: "Fitness goal deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export {
    createFitnessGoal,
    updateFitnessGoal,
    deleteFitnessGoal,
    getSingleFitnessGoal,
    getAllFitnessGoals
};