import express from 'express'
import apiRouter from './routes/index.js'
import dbConnect from './config/db.js'

const app = express()
const port =process.env.PORT || 4001 

dbConnect()

app.use('/api',apiRouter)

app.listen(port,()=> {
    console.log(`server is working on port ${port}`);
    
})
 