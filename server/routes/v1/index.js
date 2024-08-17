import express from 'express';
import Router from './userRoutes.js';
import adminRoute from './adminRoutes.js';
import movieRoute from './movieRoutes.js'
import movieTicket from './movieTicketRoutes.js'
import theater from './theaterRoutes.js'
const v1Router =express.Router()

v1Router.use('/user',Router)
v1Router.use('/movie',movieRoute)
v1Router.use('/adminsignup',adminRoute)
v1Router.use('/movie-ticket',movieTicket)
v1Router.use('/theater',theater)


 export default v1Router