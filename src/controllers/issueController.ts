import { Request, Response, NextFunction } from "express";
import sequelize from "../db";

const createIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { category, description } = req.body;
        
        await sequelize.query("INSERT INTO feedback_issues (user_id, category, description, status) VALUES (?, ?, ?, 'pending')", { replacements: [id, category, description] });
        return res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        next(error);
    }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { issue_id, status } = req.body;
        
        await sequelize.query("UPDATE feedback_issues SET status=? WHERE issue_id=?", { replacements: [status, issue_id] });
        return res.status(200).json({ message: "Feedback status updated successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { issue_id } = req.body;
        
        await sequelize.query("DELETE FROM feedback_issues WHERE issue_id=?", { replacements: [issue_id] });
        return res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        next(error);
    }
};


export {
    createIssue,
    updateIssue,
    deleteIssue
}

