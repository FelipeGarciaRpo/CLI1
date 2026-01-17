import express from 'express';
import dotenv from "dotenv";
import {toNodeHandler} from "better-auth/node";
import cors from "cors";
import { auth } from './lib/auth.js';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
)

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/me", async (req,res)=>{
    const session = await auth.api.getSession({
        headers: fromNoneHeaders(req.headers),
    });
    return res.json(session);
})

app.get("/health", (req, res)=>{
    res.send("OK");
});

app.listen(process.env.PORT || 3005, ()=>{
    console.log(`App running on server http://localhost:${process.env.PORT}`)
})