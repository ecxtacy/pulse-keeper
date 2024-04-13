import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkUserExists = async (username: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email } 
      ]
    }
  });

  return user !== null;
};