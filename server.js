import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db_connection.js"

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Server is running! ");
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})