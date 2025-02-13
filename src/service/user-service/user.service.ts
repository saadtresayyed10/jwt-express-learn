import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../db/lib";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.users.create({
    data: {
      name,
      password: hashedPassword,
      email,
      phone,
    },
  });
};
