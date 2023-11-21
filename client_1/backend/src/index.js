import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resolve } from "path";
import Router from "./router.js";

dotenv.config();

const PORT = process.env.PORT ?? 6301;

const boost = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static("./"));

    app.get("/", async (req, res) => {
        return res.send("<h1>Hello World</h1>")
    });

    app.use("/api/v1", Router)

    app.get("*", async (req, res) => {
        return res.send("<h1>Hello World</h1>")
        // return res.sendFile(resolve("./index.html"));
    });

    app.use((err, req, res, next) => {
        return res.status(500).json({
            result: "FAIL",
            message: "ERROR FROM SERVER",
            error: err
        });
    });

    app.listen(PORT, () => {
        console.log("App is running at port", PORT);
    });

}

boost();