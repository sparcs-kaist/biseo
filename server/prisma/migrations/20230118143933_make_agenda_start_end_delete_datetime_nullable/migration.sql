-- AlterTable
ALTER TABLE `agenda` MODIFY `start_at` DATETIME(3) NULL,
    MODIFY `end_at` DATETIME(3) NULL,
    MODIFY `deleted_at` DATETIME(3) NULL;
