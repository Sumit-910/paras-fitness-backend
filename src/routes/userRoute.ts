import { Router } from "express";

import { userController } from "../controllers/index";

const userRoute=Router();

userRoute.get('/users',userController.getAllUser);
userRoute.post("/login/users",userController.loginUser);
userRoute.post("/signup/users",userController.signupUSer);
userRoute.get("/users/:id",userController.getSingleUser);
userRoute.patch("/users",userController.updateUser);
userRoute.delete("/users",userController.deleteUser);

export default userRoute;