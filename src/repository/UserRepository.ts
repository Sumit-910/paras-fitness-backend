import  sequelize  from "../db/index"
import { QueryTypes } from "sequelize";

export const getAllUsers = async () => {
    return await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });
};

export const getUserByEmail = async (email: string) => {
    return await sequelize.query("SELECT * FROM users WHERE email = ?", {
        replacements: [email],
        type: QueryTypes.SELECT,
    });
};

export const getUserById = async (id: number) => {
    return await sequelize.query("SELECT * FROM users WHERE user_id = ?", {
        replacements: [id],
        type: QueryTypes.SELECT,
    });
};

export const insertUser = async (name: string, email: string, password: string, phone: string, address: string) => {
    return await sequelize.query(
        "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
        { replacements: [name, email, password, phone, address], type: QueryTypes.INSERT }
    );
};

export const updateUserPassword = async (email: string, newPassword: string) => {
    return await sequelize.query("UPDATE users SET password = ? WHERE email = ?", {
        replacements: [newPassword, email],
        type: QueryTypes.UPDATE,
    });
};

export const deleteUserByEmail = async (email: string) => {
    return await sequelize.query("DELETE FROM users WHERE email = ?", {
        replacements: [email],
        type: QueryTypes.DELETE,
    });
};
