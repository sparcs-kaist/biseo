/*
  Warnings:

  - You are about to drop the column `isNamed` on the `agenda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `agenda` DROP COLUMN `isNamed`;

-- CreateTable
CREATE TABLE `agenda_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agenda_id` INTEGER NOT NULL,
    `named` BOOLEAN NOT NULL DEFAULT false,
    `private` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `agenda_type_agenda_id_key`(`agenda_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agenda_type` ADD CONSTRAINT `agenda_type_agenda_id_fkey` FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
