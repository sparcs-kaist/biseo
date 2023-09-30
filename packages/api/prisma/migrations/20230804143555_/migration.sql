/*
  Warnings:

  - You are about to drop the column `subtitle` on the `agenda` table. All the data in the column will be lost.
  - Added the required column `resolution` to the `agenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agenda` DROP COLUMN `subtitle`,
    ADD COLUMN `resolution` VARCHAR(191) NOT NULL;
