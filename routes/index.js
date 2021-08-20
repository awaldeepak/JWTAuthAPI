import express from 'express';
const router = express.Router();
import { registerController, loginController, userController } from '../controllers';
import { auth } from '../middlewares';


router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/users/:contact', auth, userController.getUserDetails);


export default router;