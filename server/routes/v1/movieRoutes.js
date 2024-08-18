import express from 'express'
import { movieCreate, movieDelete, movieList, movieUpdate } from '../../controller/movieController.js'
import { authOwner } from '../../middleware/authOwner.js'
import { upload } from '../../middleware/imageUploadMiddleware.js'
const router = express.Router()

// new movie routes

router.get('/',authOwner,movieList)
router.post('/Movie-create',authOwner,upload.single('movie-image'),movieCreate)
router.put('/movie-update/:id',authOwner,movieUpdate)
router.delete('/movie-delete/:id',authOwner,movieDelete)

export default router