import { pool } from "../../config/db";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { IUser } from "./auth.interface";

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

export const authService = {
    register
}