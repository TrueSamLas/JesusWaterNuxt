/*
  Warnings:

  - You are about to alter the column `date` on the `News` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_News" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" BIGINT NOT NULL
);
INSERT INTO "new_News" ("date", "id", "image", "text", "title") SELECT "date", "id", "image", "text", "title" FROM "News";
DROP TABLE "News";
ALTER TABLE "new_News" RENAME TO "News";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
