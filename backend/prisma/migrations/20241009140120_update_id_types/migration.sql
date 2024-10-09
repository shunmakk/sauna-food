/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SaunaFacility` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SaunaMeal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_saunaMealId_fkey";

-- DropForeignKey
ALTER TABLE "SaunaMeal" DROP CONSTRAINT "SaunaMeal_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "_ReviewToTag" DROP CONSTRAINT "_ReviewToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReviewToTag" DROP CONSTRAINT "_ReviewToTag_B_fkey";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "saunaMealId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Review_id_seq";

-- AlterTable
ALTER TABLE "SaunaFacility" DROP CONSTRAINT "SaunaFacility_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SaunaFacility_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SaunaFacility_id_seq";

-- AlterTable
ALTER TABLE "SaunaMeal" DROP CONSTRAINT "SaunaMeal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "facilityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SaunaMeal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SaunaMeal_id_seq";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- AlterTable
ALTER TABLE "_ReviewToTag" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "SaunaMeal" ADD CONSTRAINT "SaunaMeal_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "SaunaFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_saunaMealId_fkey" FOREIGN KEY ("saunaMealId") REFERENCES "SaunaMeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewToTag" ADD CONSTRAINT "_ReviewToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewToTag" ADD CONSTRAINT "_ReviewToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
