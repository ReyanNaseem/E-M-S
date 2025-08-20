import { Router } from "express";
import { getAllUser, loginUser, registerUser, uploadImage, verifyUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewears/auth.middlewear.js";
import { addEmployee, deleteEmployee, getAllEmployee, getEmployee, updateEmployee } from "../controllers/employee.controller.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(authMiddleware,verifyUser);

const upload = multer({storage});
router.route('/upload').post( upload.single('image'),authMiddleware,uploadImage );

router.route('/add-emp').post( authMiddleware, addEmployee );
router.route('/get-emp').get( authMiddleware, getAllEmployee );
router.route('/get-empdetails:id').get( authMiddleware, getEmployee );
router.route('/delete-emp:id').delete( authMiddleware, deleteEmployee );
router.route('/update-emp:id').put( authMiddleware, updateEmployee );

router.route('/').get(getAllUser);

export default router;