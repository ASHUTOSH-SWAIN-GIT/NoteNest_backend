/*
  Warnings:

  - You are about to drop the column `createdById` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_createdById_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "createdById";
