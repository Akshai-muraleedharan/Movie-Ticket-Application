import express from 'express'

const app = express()
const port =process.env.PORT || 4001 




app.listen(port,()=> {
    console.log(`server is working on port ${port}`);
    
})
