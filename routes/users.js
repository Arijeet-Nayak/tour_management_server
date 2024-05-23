import express from 'express'
import { deleteUser, updateUser,getSingleUser} from '../controllers/userController.js';
const router = express.Router()

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

// update user
router.put("/:id",verifyUser, updateUser);
//get delete user
router.delete("/:id",verifyUser, deleteUser);
// get single user
router.get("/:id",verifyUser , getSingleUser);
// get all user
// router.get("/",verifyAdmin, getAllUser);

export default router