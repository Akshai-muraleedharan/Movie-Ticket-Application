import express from 'express'
import {   seatCreate, theaterCreate, theaterDelete, theaterList, theaterMovieShedule, theaterSheduleDelete, theaterSingle, theaterSingleUser, theaterUpdate } from '../../controller/theaterController.js'
import { authOwner } from '../../middleware/authOwner.js'
import { authUser } from '../../middleware/authUser.js'


const router = express.Router()
// create new theater 
router.post('/create-theater',authOwner,theaterCreate)
router.post('/create-seat/:id',seatCreate)





router.post('/movie-shedule/:id/',authOwner,theaterMovieShedule);

router.put('/update-theater/:id',authOwner,theaterUpdate);

router.delete('/delete-theater/:id',authOwner,theaterDelete);

router.put('/delete-shedule/theaterId/:id/sheduleId/:movieId',authOwner,theaterSheduleDelete);

router.get('/single-theater',authOwner,theaterSingle);

// for user
router.get('/user-theater/:id',authUser,theaterSingleUser);


 

router.get('/',authOwner ,theaterList)



export default router