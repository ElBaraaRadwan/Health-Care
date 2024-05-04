/*
  Warnings:

  - You are about to drop the `paitent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `paitent` DROP FOREIGN KEY `Paitent_nurseID_fkey`;

-- DropTable
DROP TABLE `paitent`;

-- CreateTable
CREATE TABLE `Patient` (
    `id` VARCHAR(191) NOT NULL,
    `nurseID` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nationalID` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `Patient_nurseID_key`(`nurseID`),
    UNIQUE INDEX `nationalID`(`nationalID`),
    UNIQUE INDEX `UserMail`(`email`),
    UNIQUE INDEX `UserPhone`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
