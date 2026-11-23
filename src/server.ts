import app from "./app";
import config from "./config";
import { pool } from "./config/db";

const PORT = config.port;

const startServer = async () => {
    try {
        const time = await pool.query("SELECT NOW()");
        console.log("Database connected successfully on: ", time.rows[0].now);

        app.listen(PORT, () => {
            console.log(`Server Listening on PORT: ${PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect server", error);
    }
};

startServer()
