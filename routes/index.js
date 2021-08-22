import express from 'express';
const router = express.Router();
import { registerController, loginController, userController, refreshController, invalidPathController } from '../controllers';
import { auth } from '../middlewares';


router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/users/:contact', auth, userController.getUserDetails);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout);
router.all('*', invalidPathController.invalid);


export default router;