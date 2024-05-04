/*
  Warnings:

  - The primary key for the `nurse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `nurse` table. All the data in the column will be lost.
  - The primary key for the `paitent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `paitent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `paitent` DROP FOREIGN KEY `Paitent_nurseID_fkey`;

-- AlterTable
ALTER TABLE `nurse` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- AlterTable
ALTER TABLE `paitent` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- AddForeignKey
ALTER TABLE `Paitent` ADD CONSTRAINT `Paitent_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
