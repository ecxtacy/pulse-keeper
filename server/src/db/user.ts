import { PrismaClient } from "@prisma/client";
import { UserData } from "@ecxtacy/pulse-keeper-common";
import { hashPassword } from "../lib/bcrypt";
const prisma = new PrismaClient();

export const checkUserExists = async (username: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  return user !== null;
};

export const createUser = async (userData: UserData) => {
  const hashedPassword = await hashPassword(userData.password);
  const user = await prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });
  return user;
};

export const db = { checkUserExists, createUser };
