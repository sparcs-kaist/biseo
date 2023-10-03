/*
  Warnings:

  - The values [Message,Alarm] on the enum `chat_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `chat`
    MODIFY `type` ENUM ('message', 'notice') NOT NULL;
