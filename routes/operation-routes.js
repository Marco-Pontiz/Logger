import {Router} from 'express';
import controller from '../controller/operation-controller';
import  {auth} from './middlewares/auth.middlewares'

const router = Router();

router.get('/sum', controller.suma0ps),
router.get('/substrack', controller.resta0ps),
router.get('/multiply', controller.multiplicar0ps),
router.get('/divide', controller.dividir0ps),
router.get('/all', auth, controller.getAll0ps)

export default router;