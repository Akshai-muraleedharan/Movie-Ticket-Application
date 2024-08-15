import express from 'express';
import Router from './userRoutes.js';
import adminRoute from './adminRoutes.js';
import movieRoute from './movieRoutes.js'

const v1Router =express.Router()

v1Router.use('/user',Router)
v1Router.use('/movie',movieRoute)
v1Router.use('/adminsignup',adminRoute)


 export default v1Router