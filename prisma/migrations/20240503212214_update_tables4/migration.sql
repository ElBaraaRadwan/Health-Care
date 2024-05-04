/*
  Warnings:

  - The primary key for the `nurse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `nationalID` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `nurse` table. All the data in the column will be lost.
  - The primary key for the `paitent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `paitent` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `paitent` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `paitent` table. All the data in the column will be lost.
  - You are about to drop the column `nationalID` on the `paitent` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `paitent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `paitent` table. All the data in the column will be lost.
  - Added the required column `nurseId` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paitentId` to the `Paitent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `paitent` DROP FOREIGN KEY `Paitent_nurseID_fkey`;

-- DropIndex
DROP INDEX `UserMail` ON `nurse`;

-- DropIndex
DROP INDEX `UserPhone` ON `nurse`;

-- DropIndex
DROP INDEX `nationalID` ON `nurse`;

-- DropIndex
DROP INDEX `UserMail` ON `paitent`;

-- DropIndex
DROP INDEX `UserPhone` ON `paitent`;

-- DropIndex
DROP INDEX `nationalID` ON `paitent`;

-- AlterTable
ALTER TABLE `nurse` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `nationalID`,
    DROP COLUMN `phone`,
    DROP COLUMN `type`,
    ADD COLUMN `nurseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`nurseId`);

-- AlterTable
ALTER TABLE `paitent` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `nationalID`,
    DROP COLUMN `phone`,
    DROP COLUMN `type`,
    ADD COLUMN `paitentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`paitentId`);

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nationalID` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `name` VARCHAR(191) NULL,
    `type` ENUM('NURSE', 'PAITENT') NOT NULL,

    UNIQUE INDEX `nationalID`(`nationalID`),
    UNIQUE INDEX `UserMail`(`email`),
    UNIQUE INDEX `UserPhone`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paitent` ADD CONSTRAINT `Paitent_paitentId_fkey` FOREIGN KEY (`paitentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paitent` ADD CONSTRAINT `Paitent_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`nurseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nurse` ADD CONSTRAINT `Nurse_nurseId_fkey` FOREIGN KEY (`nurseId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
