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

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("User with this email do not exists");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Password incorrect");

  const token = generateToken(user.id);
  return { token, user };
};

export const userProfile = async (userId: string) => {
  return await prisma.users.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, phone: true, createdAt: true },
  });
};
