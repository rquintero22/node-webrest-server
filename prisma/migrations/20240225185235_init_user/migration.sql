/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" VARCHAR[] DEFAULT ARRAY['USER_ROLE']::VARCHAR[],
ALTER COLUMN "img" DROP NOT NULL;
