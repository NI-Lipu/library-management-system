import express from "express";
import cors from "cors"
import { initDatabase } from "./config/initDb";
import authRouter from "./modules/auth/auth.router";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDatabase();

app.get("/", (req, res) => {
    res.send("Hello World");
});

//Register
app.use("/api/auth", authRouter)

export default app;
