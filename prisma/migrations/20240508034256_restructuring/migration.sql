/*
  Warnings:

  - The primary key for the `nurse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `nationalID` on the `nurse` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `nurse` table. All the data in the column will be lost.
  - The primary key for the `patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `nationalID` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[headDeptID]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `Nurse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `UserMail` ON `nurse`;

-- DropIndex
DROP INDEX `UserPhone` ON `nurse`;

-- DropIndex
DROP INDEX `nationalID` ON `nurse`;

-- DropIndex
DROP INDEX `UserMail` ON `patient`;

-- DropIndex
DROP INDEX `UserPhone` ON `patient`;

-- DropIndex
DROP INDEX `nationalID` ON `patient`;

-- AlterTable
ALTER TABLE `department` ADD COLUMN `headDeptID` INTEGER NULL;

-- AlterTable
ALTER TABLE `nurse` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `nationalID`,
    DROP COLUMN `phone`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userID`);

-- AlterTable
ALTER TABLE `patient` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `nationalID`,
    DROP COLUMN `phone`,
    ADD COLUMN `userID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userID`);

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Patient', 'Nurse', 'headDept') NOT NULL DEFAULT 'Patient',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nationalID` BIGINT NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` BIGINT NULL,
    `name` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NULL,

    UNIQUE INDEX `nationalID`(`nationalID`),
    UNIQUE INDEX `UserMail`(`email`),
    UNIQUE INDEX `UserPhone`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `headDept` (
    `userID` INTEGER NOT NULL,
    `depID` INTEGER NOT NULL,

    UNIQUE INDEX `headDept_userID_key`(`userID`),
    UNIQUE INDEX `headDept_depID_key`(`depID`),
    INDEX `headDept_depID_idx`(`depID`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Department_headDeptID_key` ON `Department`(`headDeptID`);

-- CreateIndex
CREATE UNIQUE INDEX `Nurse_userID_key` ON `Nurse`(`userID`);

-- CreateIndex
CREATE UNIQUE INDEX `Patient_userID_key` ON `Patient`(`userID`);
