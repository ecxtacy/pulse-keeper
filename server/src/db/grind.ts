import { GrindData } from "../interfaces";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGrind = async (data: GrindData, username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  const grind =
    user &&
    (await prisma.grind.create({
      data: {
        ...data,
        user_id: user.id,
      },
      select: {
        name: true,
        archived: true,
        id: true,
      },
    }));

  return grind;
};
