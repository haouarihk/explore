/*
  Warnings:

  - Made the column `tweetId` on table `StorageItem` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StorageItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tweetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "data" BLOB NOT NULL,
    CONSTRAINT "StorageItem_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StorageItem" ("data", "id", "mimeType", "name", "size", "tweetId", "type") SELECT "data", "id", "mimeType", "name", "size", "tweetId", "type" FROM "StorageItem";
DROP TABLE "StorageItem";
ALTER TABLE "new_StorageItem" RENAME TO "StorageItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
