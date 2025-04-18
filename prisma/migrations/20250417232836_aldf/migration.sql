/*
  Warnings:

  - You are about to drop the column `NoteId` on the `Downloads` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Downloads` table. All the data in the column will be lost.
  - You are about to drop the column `NoteId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `NoteId` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `NoteId` on the `wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `wishlist` table. All the data in the column will be lost.
  - The `id` column on the `wishlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[noteId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noteId` to the `Downloads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Downloads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteId` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteId` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Downloads" DROP CONSTRAINT "Downloads_NoteId_fkey";

-- DropForeignKey
ALTER TABLE "Downloads" DROP CONSTRAINT "Downloads_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_NoteId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_UserId_fkey";

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_NoteId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_NoteId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_UserId_fkey";

-- DropIndex
DROP INDEX "Rating_NoteId_key";

-- DropIndex
DROP INDEX "Rating_UserId_key";

-- DropIndex
DROP INDEX "wishlist_id_key";

-- AlterTable
ALTER TABLE "Downloads" DROP COLUMN "NoteId",
DROP COLUMN "UserId",
ADD COLUMN     "noteId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Downloads_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "NoteId",
DROP COLUMN "UserId",
ADD COLUMN     "noteId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE purchase_id_seq;
ALTER TABLE "purchase" DROP COLUMN "NoteId",
ADD COLUMN     "noteId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('purchase_id_seq'),
ADD CONSTRAINT "purchase_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE purchase_id_seq OWNED BY "purchase"."id";

-- DropIndex
DROP INDEX "purchase_id_key";

-- AlterTable
ALTER TABLE "wishlist" DROP COLUMN "NoteId",
DROP COLUMN "UserId",
ADD COLUMN     "noteId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_noteId_key" ON "Rating"("noteId");

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downloads" ADD CONSTRAINT "Downloads_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downloads" ADD CONSTRAINT "Downloads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
