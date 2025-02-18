import { Router } from "express";
import { fitnessController } from "../controllers/index";
import authorisation from "../middlewares/Authorisation";

const fitnessRoute = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 *
 * /goals:
 *   get:
 *     summary: Get all fitness goals
 *     tags: [Fitness Routes]
 *     security:
 *       - BearerAuth: []
 *     description: Retrieve a list of all fitness goals for the authenticated user.
 *     responses:
 *       200:
 *         description: Successfully retrieved fitness goals.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   target:
 *                     type: string
 *                   progress:
 *                     type: number
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *       500:
 *         description: Internal Server Error.
 */
fitnessRoute.get('/goals', [authorisation], fitnessController.getAllFitnessGoals);

/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Create a new fitness goal
 *     tags: [Fitness Routes]
 *     security:
 *       - BearerAuth: []
 *     description: Allows users to create a new fitness goal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - target
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Lose 5kg in 2 months"
 *               target:
 *                 type: string
 *                 example: "Lose weight"
 *               progress:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Fitness goal created successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *       500:
 *         description: Internal Server Error.
 */
fitnessRoute.post('/goals', [authorisation], fitnessController.createFitnessGoal);

/**
 * @swagger
 * /goals:
 *   patch:
 *     summary: Update an existing fitness goal
 *     tags: [Fitness Routes]
 *     description: Modify details of an existing fitness goal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - progress
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               progress:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Fitness goal updated successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       404:
 *         description: Not Found - Goal with given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */
fitnessRoute.patch("/goals", [], fitnessController.updateFitnessGoal);

/**
 * @swagger
 * /goals/{goal_id}:
 *   get:
 *     summary: Get a specific fitness goal
 *     tags: [Fitness Routes]
 *     description: Retrieve details of a fitness goal by its ID.
 *     parameters:
 *       - in: path
 *         name: goal_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the fitness goal to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved fitness goal details.
 *       400:
 *         description: Bad request - Invalid ID format.
 *       404:
 *         description: Not found - No goal exists with the given ID.
 *       500:
 *         description: Internal Server Error.
 */
fitnessRoute.get("/goals/:goal_id", [], fitnessController.getSingleFitnessGoal);

/**
 * @swagger
 * /goals/{id}:
 *   delete:
 *     summary: Delete a fitness goal
 *     tags: [Fitness Routes]
 *     description: Remove a fitness goal by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the fitness goal to delete.
 *     responses:
 *       200:
 *         description: Fitness goal deleted successfully.
 *       400:
 *         description: Bad request - Invalid ID format.
 *       404:
 *         description: Not found - No goal exists with the given ID.
 *       500:
 *         description: Internal Server Error.
 */
fitnessRoute.delete("/goals/:id", [], fitnessController.deleteFitnessGoal);

export default fitnessRoute;
