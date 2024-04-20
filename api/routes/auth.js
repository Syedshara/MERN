import express from "express";
import { createUser, getUsers , google } from "../controller/auth.js";

const router = express.Router();

router.post('/signup',createUser);
router.post('/signin',getUsers);
router.post('/google',google);
export default router