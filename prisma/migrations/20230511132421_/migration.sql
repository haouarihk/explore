/*
  Warnings:

  - You are about to drop the `_like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_like" DROP CONSTRAINT "_like_A_fkey";

-- DropForeignKey
ALTER TABLE "_like" DROP CONSTRAINT "_like_B_fkey";

-- DropTable
DROP TABLE "_like";

-- CreateTable
CREATE TABLE "_likeTweet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_likeComment" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likeTweet_AB_unique" ON "_likeTweet"("A", "B");

-- CreateIndex
CREATE INDEX "_likeTweet_B_index" ON "_likeTweet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likeComment_AB_unique" ON "_likeComment"("A", "B");

-- CreateIndex
CREATE INDEX "_likeComment_B_index" ON "_likeComment"("B");

-- AddForeignKey
ALTER TABLE "_likeTweet" ADD CONSTRAINT "_likeTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeTweet" ADD CONSTRAINT "_likeTweet_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeComment" ADD CONSTRAINT "_likeComment_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeComment" ADD CONSTRAINT "_likeComment_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
