import express from 'express'
import { checkUser, userDelete, userGetALL, userLogin, userLogout, userProfile, userSignup, userUpdate } from '../../controller/userController.js';
import { authUser } from '../../middleware/authUser.js';
import { upload } from '../../middleware/imageUploadMiddleware.js';

const Router =express.Router();

// user signup and login

Router.post('/signup',userSignup)
Router.post('/login',userLogin)

Router.delete('/delete/:id',authUser,userDelete)
Router.put('/update/:id',authUser,upload.single('profile-pic'),userUpdate)


Router.get('/logout',userLogout)
Router.get('/check-user',authUser,checkUser)
Router.get('/profile',authUser,userProfile) 


export default Router  