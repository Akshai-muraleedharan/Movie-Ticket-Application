import express from 'express'
import { checkOwner,  ownerDelete, ownerLogin, ownerLogout,  ownerProfile, ownerSignup,  ownerUpdate } from '../../controller/theaterOwnerController.js'
import { authOwner } from '../../middleware/authOwner.js'
import { userGetALL } from '../../controller/userController.js'
import { totalPaymentList } from '../../controller/movieTicketController.js'
import { upload } from '../../middleware/imageUploadMiddleware.js'
import { errorSignupHandler, loginErrorHandler } from '../../middleware/error.js'

const router = express.Router()
//  theater owner signup and login
router.post('/siginup',errorSignupHandler,ownerSignup)
router.post('/login',loginErrorHandler,ownerLogin)
router.delete('/account-delete/:theaterId',authOwner,ownerDelete)
router.put('/update',authOwner,upload.single('profile'),ownerUpdate)
router.get('/logout',authOwner,ownerLogout)
router.get('/profile',authOwner,ownerProfile)
router.get('/check-owner',authOwner,checkOwner)
// for access
router.get('/all-users',authOwner,userGetALL)
router.get('/payment-list',authOwner,totalPaymentList)

export default router