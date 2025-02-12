import { Router } from "express";

import { userController } from "../controllers/index";

import authorisation from "../middlewares/authorisation";

const userRoute=Router();

userRoute.get('/users',[],userController.getAllUser);
userRoute.post("/login/users",[],userController.loginUser);
userRoute.post("/signup/users",[],userController.signupUSer);
userRoute.get("/users/:id",[],userController.getSingleUser);
userRoute.patch("/users",[authorisation],userController.updateUser);
userRoute.delete("/users",[],userController.deleteUser);

export default userRoute;