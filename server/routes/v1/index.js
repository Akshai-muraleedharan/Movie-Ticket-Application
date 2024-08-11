import express from 'express';
import userRoute from './userRoutes.js';
import adminRoute from './adminRoutes.js';
import clientRoute from './clientRoutes.js';

const v1Router =express.Router()

v1Router.use('/usersignup',userRoute)
v1Router.use('/adminsignup',adminRoute)
v1Router.use('/clientsignup',clientRoute)

 export default v1Router