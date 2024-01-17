import dotenv from 'dotenv'
dotenv.config()

import express from "express";
const app = express()

import bodyParser from "body-parser";
import mongoose from "mongoose";
import chalk from 'chalk';
import ConsultationRouter from './routers/consultation.js'
import cors from 'cors'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.use('/consultation', ConsultationRouter)

async function main (){
    try{
        const result = await mongoose.connect(process.env.URL_DATABASE_MONGOOSE)
        console.log(chalk.green('Database Connected Successfully.'));
}catch(err){
    throw new Error('Não foi possivel se connectar com o banco de dados')
}
}

main()


app.get('/', (req, res)=>{res.send("ok")})

export default app