import express from 'express'


import { userGetALL } from '../../controller/userController.js'
import { adminDelete, adminLogin, adminLogout, adminProfile, adminSignup, checkAdmin } from '../../controller/adminController.js'
import { authAdmin } from '../../middleware/authAdmin.js'
import { theaterList } from '../../controller/theaterController.js'
import { movieList } from '../../controller/movieController.js'
import { totalPaymentList } from '../../controller/movieTicketController.js'




const router = express.Router()

router.post('/siginup',adminSignup)
router.post('/login',adminLogin)

router.delete('/account-delete/:id',authAdmin,adminDelete)

// 
router.get('/logout',authAdmin,adminLogout)
router.get('/profile',authAdmin,adminProfile)
router.get('/check-admin',authAdmin,checkAdmin)

// for dashboard
router.get('/all-users',authAdmin,userGetALL)
router.get('/theater-list',authAdmin ,theaterList)
router.get('/movie-list',authAdmin,movieList)
router.get('/payment-list',authAdmin,totalPaymentList)



export default router