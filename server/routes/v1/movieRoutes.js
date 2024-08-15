import express from 'express'
import { movieCreate, movieDelete, movieList, movieUpdate } from '../../controller/movieController.js'

const router = express.Router()


router.get('/',movieList)
router.post('/Movie-create',movieCreate)
router.put('/movie-update/:id',movieUpdate)
router.delete('/movie-delete/:id',movieDelete)

export default router