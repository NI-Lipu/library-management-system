import { RequestHandler } from "express";
import { authService } from "./auth.service";

const register: RequestHandler = async (req, res, next) => {
    try {
        const result = await authService.register(req.body)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Something wrong",
            error: error
        })
    }
}

const signIn: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            })
        }
        const result = await authService.signIn(email, password)
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Something wrong",
            error: error
        })
    }
}

export const authController = {
    register,
    signIn
}