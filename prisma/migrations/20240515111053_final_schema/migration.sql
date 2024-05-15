/*
  Warnings:

  - You are about to drop the column `type` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `headdept` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nurse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `type`,
    ADD COLUMN `departmentId` INTEGER NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NULL,
    ADD COLUMN `role` ENUM('patient', 'nurse', 'headdept') NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `passwordHash` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `headdept`;

-- DropTable
DROP TABLE `nurse`;

-- DropTable
DROP TABLE `patient`;

-- CreateTable
CREATE TABLE `Program` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `potentialProblems` VARCHAR(191) NOT NULL,
    `preventionAndTherapies` VARCHAR(191) NOT NULL,
    `diagnosticTestsAndMonitoring` VARCHAR(191) NOT NULL,
    `duration` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Program_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Allergy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sideEffects` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Allergy_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `programId` INTEGER NULL,

    UNIQUE INDEX `Medication_name_key`(`name`),
    INDEX `Medication_programId_idx`(`programId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_patientPrograms` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_patientPrograms_AB_unique`(`A`, `B`),
    INDEX `_patientPrograms_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_nursePrograms` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_nursePrograms_AB_unique`(`A`, `B`),
    INDEX `_nursePrograms_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AllergyToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AllergyToUser_AB_unique`(`A`, `B`),
    INDEX `_AllergyToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Department_headDeptID_idx` ON `Department`(`headDeptID`);

-- CreateIndex
CREATE INDEX `User_departmentId_idx` ON `User`(`departmentId`);

-- RenameIndex
ALTER TABLE `department` RENAME INDEX `DepartmentName` TO `Department_name_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `UserMail` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `UserPhone` TO `User_phone_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `nationalID` TO `User_nationalID_key`;
