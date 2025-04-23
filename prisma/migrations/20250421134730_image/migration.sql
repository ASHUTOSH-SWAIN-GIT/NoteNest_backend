/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - The required column `Noteid` was added to the `Note` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Downloads" DROP CONSTRAINT "Downloads_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_noteId_fkey";

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_noteId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_noteId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "id",
ADD COLUMN     "Noteid" TEXT NOT NULL,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("Noteid");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "ProfilePic" TEXT;

-- CreateTable
CREATE TABLE "Image" (
    "ImageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("ImageId")
);

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("Noteid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("Noteid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("Noteid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downloads" ADD CONSTRAINT "Downloads_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("Noteid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;
