import { Request,Response,NextFunction } from "express";
import sequelize from "../db";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

const getAllUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const [getAlluser]:any=await sequelize.query("select * from users");

        if(!getAlluser){
            return res.status(404).json({message:"No Data To Show in Users"});
        }

        return res.status(200).json(getAlluser);
    } catch (error) {
        next(error);
    }
}  

const signupUSer=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {name,email,password,phone,address}=req.body;

        if(!name || !email || !password || !phone || !address){
            return res.json({message:"Enter All The Fields"});
        }

        console.log("kya data aya ",req.body);

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

        return res.json({status:200,message:"Person Added Successfully"});
    } catch (error) {
        next(error);
    }
}  

const loginUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.json({message:"Enter All The Fields"});
        }

        const [correctEmail]:any=await sequelize.query("select * from users where email=?",{
            replacements:[email]
        })

        if(correctEmail.length==0){
            return res.json({message:"Enter Correct Email"});
        }

        const validPassword = await bcrypt.compare(password, correctEmail[0].password);
        if (!validPassword) {
            return res.json({message:"Invalid Credentials"});
        }

        const token=jwt.sign({id:correctEmail[0].user_id,email:correctEmail[0].email},process.env.JWT_SECRET!,{expiresIn:'8h'});

        return res.json({status:200,message:"log in succesfully",token:token,user:correctEmail});

    } catch (error) {
        
    }
}  

const getSingleUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const id=req.params.id;

        if(!id){
            return res.json({message:"Id is not sent in URL"});
        }

        const [singleUser]=await sequelize.query('select * from users where user_id=?',{
            replacements:[id]
        })

        if(singleUser.length==0){
            return res.json({message:"user was not found with given id"});
        }

        return res.status(200).json(singleUser);
    } catch (error) {
        next(error);
    }
    return res.status(200).json({message:"ok"});
}  

const updateUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {email}=req.body.auth;
        const {newPassword}=req.body;

        if(!newPassword){
            return res.json({message:"New Password was not entered"});
        }

        const [findPerson]:any=await sequelize.query("select * from users where email=?",{
            replacements:[email]
        })

        console.log("findPerson ",findPerson);

        const oldPassword=findPerson[0].password;

        if(oldPassword==newPassword){
            return res.json({message:"Old Password and New Password Can not be same"});
        }

        const salt=bcrypt.genSaltSync(10);
        const hashed_newPassword=bcrypt.hashSync(newPassword,salt);

        const [updatePasswordPerson]=await sequelize.query("update users set password=? where email=?",{
            replacements:[hashed_newPassword,email]
        })

        return res.json({message:"New Password made"});
    } catch (error) {
        next(error);
    }
}  

const deleteUser=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const {email}=req.body;

        const [foundPerson]=await sequelize.query("select * from users where email=?",{
            replacements:[email]
        })

        if(foundPerson.length==0){
            return res.json({message:"The person to delete was not found"});
        }

        const [deletePerson]=await sequelize.query("delete from users where email=?",{
            replacements:[email]
        })

        return res.status(200).json({message:"person was deleted successfully"});
    } catch (error) {
        next(error);
    }
}  

export {
    getAllUser,
    loginUser,
    signupUSer,
    getSingleUser,
    updateUser,
    deleteUser
}