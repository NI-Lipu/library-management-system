import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

//Register
authRouter.post('/register', authController.register)
authRouter.post('/signin', authController.signIn)


export default authRouter;