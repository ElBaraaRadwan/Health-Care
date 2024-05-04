-- CreateTable
CREATE TABLE `Paitent` (
    `id` VARCHAR(191) NOT NULL,
    `nurseID` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Paitent_nurseID_key`(`nurseID`),
    UNIQUE INDEX `Paitent_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nurse` (
    `id` VARCHAR(191) NOT NULL,
    `depID` INTEGER NULL,
    `userID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Nurse_depID_key`(`depID`),
    UNIQUE INDEX `Nurse_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nationalID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `name` VARCHAR(191) NULL,
    `type` ENUM('ADMIN', 'NURSE', 'PAITENT') NOT NULL DEFAULT 'PAITENT',

    UNIQUE INDEX `nationalID`(`nationalID`),
    UNIQUE INDEX `UserMail`(`email`),
    UNIQUE INDEX `UserPhone`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paitent` ADD CONSTRAINT `Paitent_nurseID_fkey` FOREIGN KEY (`nurseID`) REFERENCES `Nurse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paitent` ADD CONSTRAINT `Paitent_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nurse` ADD CONSTRAINT `Nurse_depID_fkey` FOREIGN KEY (`depID`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nurse` ADD CONSTRAINT `Nurse_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
