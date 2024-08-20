import express from 'express'
import { movieTicket, ticketTest } from '../../controller/movieTicketController.js'
import { authUser } from '../../middleware/authUser.js';

const router = express.Router()
// payement route

router.post('/:user/:movie/:theater',authUser,movieTicket)
router.get('/:user/:theater',authUser,ticketTest)



export default router