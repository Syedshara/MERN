import express from "express";
import { getUser } from "../controller/user.js";
import { updateUser } from "../controller/user.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get('/', getUser);
router.put('/update/:uId', verifyToken, updateUser);

export default router