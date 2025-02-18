import { Router } from "express";
import { workController } from "../controllers/index";
import authorisation from "../middlewares/Authorisation";

const workRoute = Router();

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
 * /all/workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     description: Retrieve a list of all available workouts.
 *     responses:
 *       200:
 *         description: Workouts retrieved successfully.
 *       404:
 *         description: No workouts found.
 *       500:
 *         description: Internal Server Error.
 */
workRoute.get("/all/workouts", [], workController.getAllWorkoutByAll);

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get workouts for the authenticated user
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     description: Retrieve all workouts associated with the logged-in user.
 *     responses:
 *       200:
 *         description: Workouts retrieved successfully.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal Server Error.
 */
workRoute.get("/workouts", [authorisation], workController.getAllWorkoutByUser);

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     description: Add a new workout to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - duration
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Leg Day"
 *               duration:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: Workout created successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal Server Error.
 */
workRoute.post("/workouts", [authorisation], workController.createWorkout);

/**
 * @swagger
 * /workouts/{workout_id}:
 *   get:
 *     summary: Get a single workout by ID
 *     tags: [Workouts]
 *     description: Retrieve details of a workout by its ID.
 *     parameters:
 *       - in: path
 *         name: workout_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the workout to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved workout details.
 *       404:
 *         description: Workout not found.
 *       500:
 *         description: Internal Server Error.
 */
workRoute.get("/workouts/:workout_id", [], workController.getSingleWorkout);

/**
 * @swagger
 * /workouts:
 *   patch:
 *     summary: Update an existing workout
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     description: Modify details of an existing workout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workout_id:
 *                 type: string
 *                 example: "abcd1234"
 *               name:
 *                 type: string
 *                 example: "Updated Leg Day"
 *               duration:
 *                 type: integer
 *                 example: 75
 *     responses:
 *       200:
 *         description: Workout updated successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       404:
 *         description: Workout not found.
 *       500:
 *         description: Internal Server Error.
 */
workRoute.patch("/workouts", [authorisation], workController.updateWorkout);

/**
 * @swagger
 * /workouts:
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     description: Remove a workout from the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workout_id:
 *                 type: string
 *                 example: "abcd1234"
 *     responses:
 *       200:
 *         description: Workout deleted successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       404:
 *         description: Workout not found.
 *       500:
 *         description: Internal Server Error.
 */
workRoute.delete("/workouts", [authorisation], workController.deleteWorkout);

export default workRoute;
