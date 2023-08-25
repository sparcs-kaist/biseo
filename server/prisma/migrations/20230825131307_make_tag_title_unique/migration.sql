/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tag_title_key` ON `tag`(`title`);
