import { ActivityData } from "@ecxtacy/pulse-keeper-common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createActivity = async (data: ActivityData) => {
  const initialTime = new Date(0);
  const activity = await prisma.activity.create({
    data: {
      ...data,
      ongoing: false,
      total_time: new Date(0),
      last_ended: initialTime,
      last_started: initialTime,
    },
  });

  return activity;
};

export const getActivities = async (grind_id: number) => {
  const data = await prisma.activity.findMany({ where: { grind_id } });
  return data;
};
