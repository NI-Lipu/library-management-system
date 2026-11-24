import express from "express";
import cors from "cors"
import { initDatabase } from "./config/initDb";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDatabase();

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;
