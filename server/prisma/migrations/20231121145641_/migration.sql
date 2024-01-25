/*
  Warnings:

  - You are about to drop the `agenda_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `agenda_type` DROP FOREIGN KEY `agenda_type_agenda_id_fkey`;

-- AlterTable
ALTER TABLE `agenda` ADD COLUMN `isNamed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `agenda_type`;
