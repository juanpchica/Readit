import "reflect-metadata";
import {createConnection} from "typeorm";

import express, { response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import  authRoutes from "../routes/auth";
import trim from "./middlewere/trim";


const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(trim);
app.use(cookieParser());

app.get('/', (_,res) => res.send("Hello world!!"))
app.use("/api/auth",authRoutes);


app.listen(5000, async()=>{
    console.log('Server is running at port 5000')

    try{
        await createConnection()
        console.log('Database connected!')
    }catch(err){
        console.log(err);
        
    }
})