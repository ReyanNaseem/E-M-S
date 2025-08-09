import { Router } from "express";
import { getAllUser, loginUser, registerUser, verifyUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewears/auth.middlewear.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(authMiddleware,verifyUser);
router.route('/').get(getAllUser);

export default router;