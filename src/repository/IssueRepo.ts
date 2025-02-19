import sequelize from "../db";

// Creates a new feedback issue with 'pending' status
export const createFeedbackIssue = async (userId: number, category: string, description: string) => {
    try {
        await sequelize.query(
            "INSERT INTO feedback_issues (user_id, category, description, status) VALUES (?, ?, ?, 'pending')",
            { replacements: [userId, category, description] }
        );
    } catch (error) {
        throw new Error("Error creating feedback issue: " + error);
    }
};

// Updates the status of a specific feedback issue
export const updateFeedbackIssueStatus = async (issueId: number, status: string) => {
    try {
        await sequelize.query(
            "UPDATE feedback_issues SET status=? WHERE issue_id=?",
            { replacements: [status, issueId] }
        );
    } catch (error) {
        throw new Error("Error updating feedback issue status: " + error);
    }
};

// Deletes a feedback issue based on its issue_id
export const deleteFeedbackIssue = async (issueId: number) => {
    try {
        await sequelize.query(
            "DELETE FROM feedback_issues WHERE issue_id=?",
            { replacements: [issueId] }
        );
    } catch (error) {
        throw new Error("Error deleting feedback issue: " + error);
    }
};

// Retrieves a specific feedback issue based on its issue_id
export const getFeedbackIssue = async (issueId: number) => {
    try {
        const [issue]: any[] = await sequelize.query(
            "SELECT * FROM feedback_issues WHERE issue_id = ?",
            { replacements: [issueId] }
        );

        if (issue.length === 0) {
            return null; // Return null if no issue is found
        }

        return issue[0]; // Return the first issue found
    } catch (error) {
        throw new Error("Error fetching feedback issue: " + error);
    }
};
