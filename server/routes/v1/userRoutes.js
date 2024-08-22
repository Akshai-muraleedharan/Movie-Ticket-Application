import express from 'express'
import { bookedMovies, checkUser, userDelete, userGetALL, userLogin, userLogout, userProfile, userSignup, userSoftDelete, userUpdate } from '../../controller/userController.js';
import { authUser } from '../../middleware/authUser.js';
import { upload } from '../../middleware/imageUploadMiddleware.js';

const Router =express.Router();

// user signup and login

Router.post('/signup',userSignup)
Router.post('/login',userLogin)

Router.put('/soft-delete',authUser,userSoftDelete)

Router.delete('/delete/:id',authUser,userDelete)
Router.put('/update/:id',authUser,upload.single('profile-pic'),userUpdate)


Router.get('/logout',userLogout)
Router.get('/check-user',authUser,checkUser)
Router.get('/profile',authUser,userProfile) 
Router.get('/booked-movies',authUser,bookedMovies) 


export default Router  