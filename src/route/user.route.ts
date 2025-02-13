import express from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controller/user-controller/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/profile", authMiddleware, profile);

export default router;
