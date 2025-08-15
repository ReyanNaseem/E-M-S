import { Router } from "express";
import { getAllUser, loginUser, registerUser, verifyUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewears/auth.middlewear.js";
import { addEmployee } from "../controllers/employee.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(authMiddleware,verifyUser);
router.route('/add-emp').post( authMiddleware, addEmployee );

router.route('/').get(getAllUser);

export default router;