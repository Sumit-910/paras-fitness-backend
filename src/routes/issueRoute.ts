import { Router } from "express";
import { issueController } from "../controllers/index";

const issueRoute = Router();

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create a new issue
 *     tags: [Issue Routes]
 *     description: Allows users to create a new issue.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Bug in login page"
 *               description:
 *                 type: string
 *                 example: "The login page throws an error when submitting incorrect credentials."
 *     responses:
 *       201:
 *         description: Issue created successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
issueRoute.post('/issues', [], issueController.createIssue);

/**
 * @swagger
 * /issues/{id}:
 *   patch:
 *     summary: Update an existing issue
 *     tags: [Issue Routes]
 *     description: Modify details of an existing issue.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the issue to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated title for issue"
 *               description:
 *                 type: string
 *                 example: "Updated description for issue."
 *     responses:
 *       200:
 *         description: Issue updated successfully.
 *       400:
 *         description: Bad request - Invalid data.
 *       404:
 *         description: Not found - No issue with the given ID.
 *       500:
 *         description: Internal Server Error.
 */
issueRoute.patch("/issues/:id", [], issueController.updateIssue);

/**
 * @swagger
 * /issues/{id}:
 *   delete:
 *     summary: Delete an issue
 *     tags: [Issue Routes]
 *     description: Remove an issue by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the issue to delete.
 *     responses:
 *       200:
 *         description: Issue deleted successfully.
 *       400:
 *         description: Bad request - Invalid ID format.
 *       404:
 *         description: Not found - No issue with the given ID.
 *       500:
 *         description: Internal Server Error.
 */
issueRoute.delete("/issues/:id", [], issueController.deleteIssue);


export default issueRoute;