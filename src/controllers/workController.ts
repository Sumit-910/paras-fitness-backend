import { Request,Response,NextFunction } from "express";
import sequelize from "../db";

const getAllWorkoutByAll=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const [getAllWorkoutByAll]:any=await sequelize.query("select * from workouts");

        if(!getAllWorkoutByAll){
            return res.status(404).json({message:"No Data To Show in Workouts"});
        }

        return res.status(200).json(getAllWorkoutByAll);
    } catch (error) {
        next(error);
    }
}

const getAllWorkoutByUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {id}=req.body.auth;

        const [getAllWorkoutByUser]:any=await sequelize.query("select * from workouts where user_id=?",{
            replacements:[id]
        });

        if(!getAllWorkoutByUser){
            return res.status(404).json({message:"No Data To Show in Workouts By User"});
        }

        return res.status(200).json(getAllWorkoutByUser);
    } catch (error) {
        next(error);
    }
}

const createWorkout=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {id}=req.body.auth;

        const {exercise_type,duration,calories_burned,workout_date}=req.body;

        if(!exercise_type || !duration || !calories_burned || !workout_date){
            return res.json({message:"Enter All The Fields"});
        }

        const [existingExcercise]=await sequelize.query("select * from workouts where workout_date=? AND exercise_type=? AND user_id=?",{
            replacements:[workout_date,exercise_type,id]
        })

        if(existingExcercise.length>0){
            return res.json({message:"You have already added this excercise today"});
        }

        const [insertWorkout]=await sequelize.query("insert into workouts (user_id,exercise_type,duration,calories_burned,workout_date) values (?,?,?,?,?)",{
            replacements:[id,exercise_type,duration,calories_burned,workout_date]
        })

        if(!insertWorkout){
            return res.json({message:"Error while inserting workout"});
        }

        return res.status(200).json({message:"Workout Added Successfully"});
    } catch (error) {
        next(error);
    }
}

const getSingleWokout=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {id}=req.body.auth;

        const {workout_id}=req.body;

        if(!workout_id){
            return res.json({message:"Enter All The Fields"});
        }

        const [singleWorkout]=await sequelize.query("select * from workout where user_id=? and workout_id=?",{
            replacements:[id,workout_id]
        })

        if(singleWorkout.length==0){
            return res.json({message:`Workout with workout_id=${workout_id} was not found`})
        }

        return res.status(200).json(singleWorkout);
    } catch (error) {
        next(error);
    }
}

const updateWorkout=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        
    } catch (error) {
        
    }
}

const deleteUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        
    } catch (error) {
        
    }
}

export{
    getAllWorkoutByAll,
    createWorkout,
    getSingleWokout,
    updateWorkout,
    deleteUser,
    getAllWorkoutByUser
}