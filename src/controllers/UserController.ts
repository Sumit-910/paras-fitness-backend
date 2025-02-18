import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as UserRespository from "../repository/UserRepository"
dotenv.config();

export const getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const users = await UserRespository.getAllUsers();
        if (!users.length) {
            return res.status(404).json({ message: "No Data To Show in Users" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const signupUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.json({ message: "Enter All The Fields" });
        }

        const existingUser = await UserRespository.getUserByEmail(email);
        if (existingUser.length > 0) {
            return res.json({ message: "User with this email already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(password, salt);

        await UserRespository.insertUser(name, email, hashed_password, phone, address);
        return res.json({ status: 200, message: "Person Added Successfully" });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "Enter All The Fields" });
        }

        const user:any = await UserRespository.getUserByEmail(email);
        if (user.length === 0) {
            return res.json({ message: "Enter Correct Email" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user[0].user_id, email: user[0].email },
            process.env.JWT_SECRET!,
            { expiresIn: "8h" }
        );

        return res.json({ status: 200, message: "Log in successfully", token, user });
    } catch (error) {
        next(error);
    }
};

export const getSingleUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({ message: "ID is not sent in URL" });
        }

        const user = await UserRespository.getUserById(Number(id));
        if (user.length === 0) {
            return res.json({ message: "User was not found with given ID" });
        }

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email } = req.body.auth;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.json({ message: "New Password was not entered" });
        }

        const user:any = await UserRespository.getUserByEmail(email);
        if (!user.length) {
            return res.json({ message: "User not found" });
        }

        const oldPassword:any = user[0].password;
        if (bcrypt.compareSync(newPassword, oldPassword)) {
            return res.json({ message: "Old Password and New Password cannot be the same" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed_newPassword = bcrypt.hashSync(newPassword, salt);
        await UserRespository.updateUserPassword(email, hashed_newPassword);

        return res.json({ message: "New Password updated successfully" });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email } = req.body;
        const user = await UserRespository.getUserByEmail(email);
        if (!user.length) {
            return res.json({ message: "The person to delete was not found" });
        }

        await UserRespository.deleteUserByEmail(email);
        return res.status(200).json({ message: "Person was deleted successfully" });
    } catch (error) {
        next(error);
    }
};
