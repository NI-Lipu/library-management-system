import { pool } from "./db";

const createUserQuery =`
CREATE TABLE IF NOT EXISTS Users(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role VARCHAR(25) CHECK(role IN('admin', 'member')) DEFAULT 'member'
)
`

export const initDatabase= async()=>{
    await pool.query(createUserQuery);
    
}