import express from 'express'
import {  theaterCreate, theaterDelete, theaterList, theaterMovieShedule, theaterSingle, theaterUpdate } from '../../controller/theaterController.js'
import { authOwner } from '../../middleware/authOwner.js'


const router = express.Router()
// create new theater 
router.post('/create-theater',authOwner,theaterCreate)
router.post('/movie-shedule/:id',authOwner,theaterMovieShedule)
router.put('/update-theater/:id',authOwner,theaterUpdate)
router.delete('/delete-theater/:id',authOwner,theaterDelete)
router.get('/single-theater/:id',authOwner,theaterSingle)



router.get('/',authOwner ,theaterList)



export default router