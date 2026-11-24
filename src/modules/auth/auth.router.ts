import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

//Register
authRouter.post('/register', authController.register)


export default authRouter;