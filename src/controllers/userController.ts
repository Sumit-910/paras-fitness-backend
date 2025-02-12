import { Request,Response,NextFunction } from "express";
import sequelize from "../db";
import bcrypt from 'bcryptjs';

const getAllUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {name,email,password,phone,address}=req.body;

        const [existingUser]:any=await sequelize.query("select * from users where email = ?",{
            replacements: [email]
        })

        if(existingUser.length>0){
            return res.json({message:"User with this email already exists"});
        }

        const salt=bcrypt.genSaltSync(10);
        const hashed_password=bcrypt.hashSync(password,salt);

        const [insertUser]:any=await sequelize.query("insert into users (name,email,password,phone,address) values (?,?,?,?,?)",{
            replacements:[name,email,hashed_password,phone,address]
        })

        if(!insertUser){
            return res.json({message:"Error while inserting the user in users"});
        }

        return res.status(200).json({message:"Person Added Successfully"});
    } catch (error) {
        next(error);
    }
}  

const signupUSer=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    return res.status(200).json({message:"ok"});
}  

const loginUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    return res.status(200).json({message:"ok"});
}  

const getSingleUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    return res.status(200).json({message:"ok"});
}  

const updateUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    return res.status(200).json({message:"ok"});
}  

const deleteUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    return res.status(200).json({message:"ok"});
}  

export {
    getAllUser,
    loginUser,
    signupUSer,
    getSingleUser,
    updateUser,
    deleteUser
}