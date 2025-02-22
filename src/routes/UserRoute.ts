import { Router } from "express";

import { userController } from "../controllers/index";

import authorisation from "../middlewares/Authorisation";

import upload from "../middlewares/Multer";

const userRoute=Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user registration
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile operations
 */


/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     description: Retrieve a list of all workouts.
 *     responses:
 *       200:
 *         description: A list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "Full Body Workout"
 *                   duration:
 *                     type: number
 *                     example: 60
 *                   difficulty:
 *                     type: string
 *                     example: "Intermediate"
 *       404:
 *         description: No Data To Show in Workouts.
 *       500:
 *         description: Internal server error.
 */

userRoute.get("/all/users",[],userController.getAllUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Allows a registered user to log in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
userRoute.post("/auth/login", [], userController.loginUser);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     description: Registers a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields or invalid input
 *       500:
 *         description: Internal server error
 */
userRoute.post("/auth/signup", [], userController.signupUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Internal server error.
 */
userRoute.get('/users', [], userController.getAllUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user
 *     tags: [Users]
 *     description: Retrieve details of a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User found.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRoute.get("/single/users/", [authorisation], userController.getUserProfile);

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Updates details of an authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
userRoute.patch("/users", [authorisation], userController.updateUser);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Remove a user from the system.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRoute.delete("/users", [], userController.deleteUser);

userRoute.post('/users/photo',upload.single('photo'),userController.uploadProfilePhoto)


export default userRoute;