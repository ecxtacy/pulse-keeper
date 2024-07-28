import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const logintoken__get = async (username: string) => {
  return await prisma.loginToken.findFirst({
    where: { username }
  });
};

export const logintoken__upsert = async (username: string, token: string) => {
  const upsert_token = await prisma.loginToken.upsert({
    where: {
      username: username,
    },
    update: {
      token: token,
    },
    create: {
      username: username,
      token: token,
    }
  });
};
