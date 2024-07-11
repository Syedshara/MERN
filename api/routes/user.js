import express from "express";
import { getUser } from "../controller/user.js";
import { updateUser, deleteUser, signoutUser, getuser, getuserc } from "../controller/user.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get('/', getUser);
router.put('/update/:uId', verifyToken, updateUser);
router.delete('/delete/:uId', verifyToken, deleteUser)
router.post('/signout', signoutUser);
router.get("/getuser", verifyToken, getuser)
router.get("/:userId", getuserc)

export default router