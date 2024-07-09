import express from "express";
import { getUser } from "../controller/user.js";
import { updateUser, deleteUser, signoutUser } from "../controller/user.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get('/', getUser);
router.put('/update/:uId', verifyToken, updateUser);
router.delete('/delete/:uId', verifyToken, deleteUser)
router.post('/signout', signoutUser);

export default router