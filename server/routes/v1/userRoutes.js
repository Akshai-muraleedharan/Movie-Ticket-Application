import express from 'express'
import { checkUser, userDelete, userGetALL, userLogin, userLogout, userProfile, userSignup } from '../../controller/userController.js';
import { authUser } from '../../middleware/authUser.js';

const Router =express.Router();

// user signup and login

Router.post('/signup',userSignup)
Router.post('/login',userLogin)

Router.delete('/delete/:id',authUser,userDelete)


Router.get('/logout',userLogout)
Router.get('/check-user',authUser,checkUser)
Router.get('/profile',authUser,userProfile)


export default Router  