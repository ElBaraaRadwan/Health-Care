-- DropForeignKey
ALTER TABLE `nurse` DROP FOREIGN KEY `Nurse_depID_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_nurseID_fkey`;

-- CreateIndex
CREATE INDEX `Nurse_depID_idx` ON `Nurse`(`depID`);

-- CreateIndex
CREATE INDEX `Patient_nurseID_idx` ON `Patient`(`nurseID`);
