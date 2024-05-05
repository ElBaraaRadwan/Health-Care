/*
  Warnings:

  - The primary key for the `nurse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `nurse` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `nurseID` on the `patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_nurseID_fkey`;

-- AlterTable
ALTER TABLE `nurse` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `patient` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `nurseID` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
