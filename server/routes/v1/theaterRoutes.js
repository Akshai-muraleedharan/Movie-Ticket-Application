import express from 'express'
import {  theaterCreate } from '../../controller/theaterController.js'



const router = express.Router()

router.post('/create-theater',theaterCreate)




export default router