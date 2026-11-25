import { pool } from "../../config/db";
import { jwtHelpers } from "../../utils/jwtHelpers";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { IUser } from "./auth.interface";
import bcrypt from 'bcrypt';

const register = async (payload: IUser) => {
    const { name, email, password, role } = payload;

    const hashedPassword = await passwordHelpers.hashPassword(password);

    const result = await pool.query(`
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, password, role`,
        [name, email, hashedPassword, role])

    return result.rows[0];
}

const signIn = async (email: string, password: string) => {
    const result = await pool.query(`
        SELECT * FROM users
        WHERE email=$1`,
        [email]);

    if (result.rowCount === 0) {
        throw new Error("Invalid email or password");
    }
    const user = result.rows[0];

    const isMatched = await passwordHelpers.comparePassword(password, user.password);
    if (!isMatched) {
        throw new Error("Invalid email or password");
    }

    const token = jwtHelpers.generateToken({ id: user.id, email: user.email, role: user.role });

    return {
        token,
        user
    }

}

export const authService = {
    register,
    signIn
}