/*
  Warnings:

  - You are about to drop the column `user_id` on the `LoginToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `LoginToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `LoginToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LoginToken" DROP CONSTRAINT "LoginToken_user_id_fkey";

-- DropIndex
DROP INDEX "LoginToken_user_id_key";

-- AlterTable
ALTER TABLE "LoginToken" DROP COLUMN "user_id",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LoginToken_username_key" ON "LoginToken"("username");

-- AddForeignKey
ALTER TABLE "LoginToken" ADD CONSTRAINT "LoginToken_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
