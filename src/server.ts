import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entities/User";

import express from "express";
import morgan from "morgan";

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req,res) => res.send("Hello world!!"))

app.listen(5000, async()=>{
    console.log('Server is running at port 5000')

    try{
        await createConnection()
        console.log('Database connected!')
    }catch(err){
        console.log(err)
    }
})