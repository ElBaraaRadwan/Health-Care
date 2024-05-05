/*
  Warnings:

  - The primary key for the `nurse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `patient` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_nurseID_fkey`;

-- AlterTable
ALTER TABLE `nurse` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `patient` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `nurseID` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
