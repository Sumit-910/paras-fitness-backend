import { Request, Response, NextFunction } from "express";
import * as IssueRepo from "../repository/IssueRepo";
import { BadRequestError } from "../errors/BadRequest";
import { NotFoundError } from "../errors/NotFound";

const createIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.body.auth;
        const { category, description } = req.body;

        if (!category || !description) {
            throw new BadRequestError("Category and description are required to create an issue");
        }

        await IssueRepo.createFeedbackIssue(id, category, description);
        return res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        next(error);
    }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { issue_id, status } = req.body;

        if (!issue_id || !status) {
            throw new BadRequestError("Issue ID and status are required to update an issue");
        }

        const issue = await IssueRepo.getFeedbackIssue(issue_id); 
        if (!issue) {
            throw new NotFoundError(`Issue with ID ${issue_id} not found`);
        }

        await IssueRepo.updateFeedbackIssueStatus(issue_id, status);
        return res.status(200).json({ message: "Feedback status updated successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { issue_id } = req.body;

        if (!issue_id) {
            throw new BadRequestError("Issue ID is required to delete an issue");
        }

        const issue = await IssueRepo.getFeedbackIssue(issue_id); 
        if (!issue) {
            throw new NotFoundError(`Issue with ID ${issue_id} not found`);
        }

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
