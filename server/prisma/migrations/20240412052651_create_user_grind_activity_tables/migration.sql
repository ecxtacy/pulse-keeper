-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "photo_link" TEXT,
    "age" INTEGER,
    "profession" TEXT,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grind" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Grind_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "total_time" TIMESTAMP(3) NOT NULL,
    "ongoing" BOOLEAN NOT NULL,
    "last_started" TIMESTAMP(3) NOT NULL,
    "last_ended" TIMESTAMP(3) NOT NULL,
    "grind_id" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Grind_name_key" ON "Grind"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");

-- AddForeignKey
ALTER TABLE "Grind" ADD CONSTRAINT "Grind_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_grind_id_fkey" FOREIGN KEY ("grind_id") REFERENCES "Grind"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
