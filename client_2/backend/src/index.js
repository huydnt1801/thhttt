import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resolve } from "path";
import http from "http";
import { Server } from "socket.io";
import Router from "./router.js";

dotenv.config();

const PORT = process.env.PORT ?? 6401;

const boost = async () => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on("sent-message", (data) => {
            io.emit("receive-message", data);
        })

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        });
    });
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

    server.listen(PORT, () => {
        console.log("App is running at port", PORT);
    });

}

boost();