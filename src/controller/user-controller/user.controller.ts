import { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../../service/user-service/user.service";
import { AuthRequest } from "../../middleware/authMiddleware";
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await registerUser(name, email, password, phone);
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
  res.status(200).json({ message: "Logout successful" });
};

export const profile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const user = await userProfile(req.user.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
