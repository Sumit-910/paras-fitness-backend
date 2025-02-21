import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"


// Middleware for authorization
const authorisation=async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const auth:any=req.headers.authorization;

        // console.log("auth",auth);

        if(!auth || !auth.startsWith("Bearer ")){
            throw new Error("Token Not Provided Properly")
        }

        const token=auth.split(" ")[1];

        // console.log("token",token);

        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET as string);

            req.body.auth=decoded;
            next();
        } catch (error) {
            throw new Error("Inavalid or expired token");
        }
    } catch (error) {
        next(error);
    }
}

export default authorisation;