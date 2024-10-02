import express from 'express'
import apiRouter from './routes/index.js'
import dbConnect from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin:process.env.CLIENT_DOMAIN,
    credentials:true,
   
}))


const port =process.env.PORT || 4001 

dbConnect()
app.get('/',(req,res)=> {
    res.send("hello my dear friend")
})
app.use('/api',apiRouter)

app.listen(port,()=> {
    console.log(`server is working on port ${port}`);
    
})
 