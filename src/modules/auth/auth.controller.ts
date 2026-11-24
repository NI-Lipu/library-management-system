import { RequestHandler } from "express";
import { authService } from "./auth.service";

const register: RequestHandler = async (req, res, next) => {
    try {
        const result = await authService.register(req.body)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Something wrong",
            error: error
        })
    }
}

export const authController = {
    register
}