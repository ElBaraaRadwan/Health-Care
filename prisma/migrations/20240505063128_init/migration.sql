-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DepartmentName`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nurse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `depID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nationalID` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `nationalID`(`nationalID`),
    UNIQUE INDEX `UserMail`(`email`),
    UNIQUE INDEX `UserPhone`(`phone`),
    INDEX `Nurse_depID_idx`(`depID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nurseID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nationalID` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `nationalID`(`nationalID`),
    UNIQUE INDEX `UserMail`(`email`),
    UNIQUE INDEX `UserPhone`(`phone`),
    INDEX `Patient_nurseID_idx`(`nurseID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
