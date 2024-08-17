import express from 'express'
import { movieTicket } from '../../controller/movieTicketController.js'
import { authUser } from '../../middleware/authUser.js';

const router = express.Router()
// payement route

router.post('/',authUser,movieTicket)



export default router