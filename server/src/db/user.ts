import { PrismaClient } from "@prisma/client";
import { UserData, UserEditData } from "@ecxtacy/pulse-keeper-common";
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

export const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  return user;
};

export const getProfile = async (username: string) => {
  const profile = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      first_name: true,
      last_name: true,
      age: true,
      photo_link: true,
      profession: true,
      email: true,
    },
  });
  return profile;
};

const deleteUser = async (username: string) => {
  const user = await prisma.user.update({
    where: { username },
    data: { deleted: true },
  });
};

const editUserData = async (data: UserEditData) => {
  let key: keyof typeof data;
  const editData = { ...data, initial_username: undefined };
  for (key in editData) {
    if (!data[key]) {
      delete data[key];
    }
  }

  const user = await prisma.user.update({
    where: { username: data.initial_username },
    data: { ...editData },
  });
};

export const db = {
  checkUserExists,
  createUser,
  findUser,
  getProfile,
  deleteUser,
  editUserData,
};
