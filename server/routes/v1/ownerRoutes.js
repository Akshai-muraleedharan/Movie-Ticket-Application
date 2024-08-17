import express from 'express'
import { checkOwner, ownerDelete, ownerLogin, ownerLogout, ownerProfile, ownerSignup } from '../../controller/theaterOwnerController.js'
import { authOwner } from '../../middleware/authOwner.js'




const router = express.Router()

router.post('/siginup',ownerSignup)
router.post('/login',ownerLogin)

router.delete('/account-delete/:id',authOwner,ownerDelete)


router.get('/logout',authOwner,ownerLogout)
router.get('/profile/:id',authOwner,ownerProfile)
router.get('/check-owner',authOwner,checkOwner)



export default router