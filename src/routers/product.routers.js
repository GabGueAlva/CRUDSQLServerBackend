import { Router } from "express";
import { getDatabase, createData, getAlumno, deleteAlumno, updateAlumno} from "../controllers/products.controllers.js"

const router = Router()

router.get('/', getDatabase)
router.get('/:id', getAlumno)
router.post('/', createData)
router.delete('/:id', deleteAlumno)
router.put('/:id', updateAlumno)

export default router