import { Request, Response, NextFunction } from "express";
import * as IssueRepo from "../repository/IssueRepo";

const createIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { category, description } = req.body;

        await IssueRepo.createFeedbackIssue(id, category, description);
        return res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        next(error);
    }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { issue_id, status } = req.body;
        await IssueRepo.updateFeedbackIssueStatus(issue_id, status);
        return res.status(200).json({ message: "Feedback status updated successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { issue_id } = req.body;

        await IssueRepo.deleteFeedbackIssue(issue_id);
        return res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export {
    createIssue,
    updateIssue,
    deleteIssue
};
