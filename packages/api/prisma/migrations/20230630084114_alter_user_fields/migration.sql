/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_nickname_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
DROP
COLUMN `nickname`,
    ADD COLUMN `displayName` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `is_admin` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user` (`username`);
