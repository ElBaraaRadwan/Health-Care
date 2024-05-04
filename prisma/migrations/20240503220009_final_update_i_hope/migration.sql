/*
  Warnings:

  - The primary key for the `nurse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nurseId` on the `nurse` table. All the data in the column will be lost.
  - The primary key for the `paitent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paitentId` on the `paitent` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nationalID]` on the table `Nurse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Nurse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Nurse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nationalID]` on the table `Paitent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Paitent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Paitent` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Nurse` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nationalID` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Paitent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nationalID` to the `Paitent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nurse` DROP FOREIGN KEY `Nurse_nurseId_fkey`;

-- DropForeignKey
ALTER TABLE `paitent` DROP FOREIGN KEY `Paitent_nurseID_fkey`;

-- DropForeignKey
ALTER TABLE `paitent` DROP FOREIGN KEY `Paitent_paitentId_fkey`;

-- AlterTable
ALTER TABLE `nurse` DROP PRIMARY KEY,
    DROP COLUMN `nurseId`,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `nationalID` INTEGER NOT NULL,
    ADD COLUMN `phone` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `paitent` DROP PRIMARY KEY,
    DROP COLUMN `paitentId`,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `nationalID` INTEGER NOT NULL,
    ADD COLUMN `phone` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `user`;

-- CreateIndex
CREATE UNIQUE INDEX `nationalID` ON `Nurse`(`nationalID`);

-- CreateIndex
CREATE UNIQUE INDEX `UserMail` ON `Nurse`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `UserPhone` ON `Nurse`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `nationalID` ON `Paitent`(`nationalID`);

-- CreateIndex
CREATE UNIQUE INDEX `UserMail` ON `Paitent`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `UserPhone` ON `Paitent`(`phone`);

-- AddForeignKey
ALTER TABLE `Paitent` ADD CONSTRAINT `Paitent_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
