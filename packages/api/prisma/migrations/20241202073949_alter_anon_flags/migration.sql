/*
  Warnings:

  - You are about to drop the column `is_anon` on the `chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chat` DROP COLUMN `is_anon`,
    MODIFY `type` ENUM('message', 'notice', 'anonymous', 'adminnotice') NOT NULL;
