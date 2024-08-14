import express from 'express'
import { userLogin, userLogout, userProfile, userSignup } from '../../controller/userController.js';
import { authUser } from '../../middleware/authUser.js';

const Router =express.Router();

Router.post('/signup',userSignup)
Router.post('/login',userLogin)
Router.post('/logout',userLogout)
Router.get('/profile/:id',authUser,userProfile)

export default Router  