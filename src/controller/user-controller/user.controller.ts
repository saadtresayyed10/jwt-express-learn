import { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../../service/user-service/user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body;
    const user = await registerUser(email, name, password, phone);
    res.status(201).json({ message: "User added successfully", data: user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "User logged in", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfull" });
};

export const profile = async (req: any, res: Response) => {
  try {
    const user = await userProfile(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
