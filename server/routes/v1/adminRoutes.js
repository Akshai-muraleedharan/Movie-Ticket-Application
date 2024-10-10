import express from 'express'


import { userGetALL } from '../../controller/userController.js'
import {  adminDelete, adminGet, adminLogin, adminLogout, adminProfile, AdminTheaterOwnerDelete, adminUpdate, checkAdmin, userDeleteByAdmin,changeRole, subAdminDelete, usersInActive, usersActive, theaterApprove, adminSendMail} from '../../controller/adminController.js'
import { authAdmin } from '../../middleware/authAdmin.js'
import { theaterList } from '../../controller/theaterController.js'
import { movieList } from '../../controller/movieController.js'
import { totalPaymentList } from '../../controller/movieTicketController.js'
import { upload } from '../../middleware/imageUploadMiddleware.js'
import {  loginErrorHandler } from '../../middleware/error.js'
import { movieRatingDelete, movieRatingGetAdmin, movieRatingGetAll } from '../../controller/ratingController.js'
import { ownerGetALL } from '../../controller/theaterOwnerController.js'





const router = express.Router()


router.post('/login',loginErrorHandler,adminLogin)

router.delete('/account-delete',authAdmin,adminDelete)


router.put('/update',authAdmin,upload.single('profile'),adminUpdate)

// 
router.post('/logout',authAdmin,adminLogout)
router.get('/profile',authAdmin,adminProfile)
router.get('/check-admin',authAdmin,checkAdmin)

// for dashboard
router.post('/users-role/:id',authAdmin,changeRole)
router.post('/users-email',authAdmin,adminSendMail)
router.put('/users-inActive/:id',authAdmin,usersInActive)
router.put('/users-Active/:id',authAdmin,usersActive)
router.put('/theater-approve/:id',authAdmin,theaterApprove)
router.get('/all-users',authAdmin,userGetALL)
router.get('/all-admin',authAdmin,adminGet)
router.get('/theater-list',authAdmin ,theaterList)
router.get('/movie-list',authAdmin,movieList)
router.get('/payment-list',authAdmin,totalPaymentList)
router.get('/rating-All',authAdmin,movieRatingGetAll)
router.get('/movie-rating',authAdmin,movieRatingGetAdmin)
router.get('/owner-All',authAdmin,ownerGetALL)
router.delete('/sub-admin/delete/:id',authAdmin,subAdminDelete) 
router.delete("/rating/:id", authAdmin, movieRatingDelete);
router.delete("/user/:id", authAdmin, userDeleteByAdmin);
router.delete("/owner/:id", authAdmin, AdminTheaterOwnerDelete);

  

export default router