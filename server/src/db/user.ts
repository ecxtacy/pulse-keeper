import { PrismaClient } from "@prisma/client";
import { UserData, UserEditData } from "../interfaces";
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

export const findUserPassword = async (username: string) => {
  return await prisma.user.findUnique({ 
    where: {username},
    select: {
      password: true
    }
  });
};

export const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({ 
    where: { username }, 
    select: {
      username: true,
      first_name: true,
      last_name: true,
      email: true,
      password: true,
    }
  });
  return user;
};

export const getProfile = async (username: string) => {
  const profile = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      first_name: true,
      last_name: true,
      dob: true,
      photo_link: true,
      profession: true,
      email: true,
    },
  });
  return profile;
};

export const deleteUser = async (username: string) => {
  const user = await prisma.user.update({
    where: { username },
    data: { deleted: true },
  });
};

export const editUserData = async (data: UserEditData, username: string) => {
  let key: keyof typeof data;
  for (key in data) {
    if (!data[key]) {
      delete data[key];
    }
  }

  const user = await prisma.user.update({
    where: { username },
    data: { ...data },
  });
};
