import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express's Request to include "user"
export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.user = decoded; // Attach user to request
    next(); // Move to next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
