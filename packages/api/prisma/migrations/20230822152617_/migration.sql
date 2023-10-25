/*
  Warnings:

  - The primary key for the `user_tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_tag` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `user_tag` table. All the data in the column will be lost.
  - Added the required column `tag_id` to the `user_tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_tag` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `type`,
    ADD COLUMN `tag_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`, `tag_id`);

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_tag` ADD CONSTRAINT `user_tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
