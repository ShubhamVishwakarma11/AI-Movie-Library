import express from "express";
import { loginUser, signupUser } from "../controller/userController";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

export default router;
