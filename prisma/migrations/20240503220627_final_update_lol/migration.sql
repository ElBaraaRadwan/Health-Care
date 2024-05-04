-- DropForeignKey
ALTER TABLE `paitent` DROP FOREIGN KEY `Paitent_nurseID_fkey`;

-- AlterTable
ALTER TABLE `paitent` MODIFY `nurseID` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Paitent` ADD CONSTRAINT `Paitent_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
