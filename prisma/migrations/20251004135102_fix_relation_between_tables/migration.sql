/*
  Warnings:

  - You are about to drop the column `genreId` on the `movies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."movies" DROP CONSTRAINT "movies_genreId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "genreId";
