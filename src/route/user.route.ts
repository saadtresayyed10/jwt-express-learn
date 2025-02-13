import express from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controller/user-controller/user.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", profile);

export default router;
