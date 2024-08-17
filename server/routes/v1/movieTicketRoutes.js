import express from 'express'
import { movieTicket } from '../../controller/movieTicketController.js'


const router = express.Router()

router.post('/',movieTicket)



export default router