import express, { json } from "express";
import { getUser } from "../controller/user.js";
const router = express.Router();

router.get('/',getUser);

export default router